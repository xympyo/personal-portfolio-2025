# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.19.3

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

# IMPORTANT: Do NOT set USER root here. Alpine images often run as root by default
# or handle user privileges differently. Explicitly setting USER root can
# sometimes cause issues with user ID resolution if not handled carefully.
# We will explicitly use 'root' for specific commands if needed.


################################################################################
# Create a stage for installing production dependencies.
FROM base as deps

# Ensure we're operating as root for npm install and chmod, just in case.
# Alpine's default user for 'root' is typically the actual root user.
# If you get 'permission denied' here, remove this line or keep it.
USER root

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# IMPORTANT: Apply chmod here, immediately after npm install in the deps stage.
# This ensures node_modules has correct permissions *before* being copied.
RUN chmod -R 777 /usr/src/app/node_modules


################################################################################
# Create a stage for building the application.
FROM deps as build 
# This stage inherits node_modules from 'deps'

# User remains 'root' from the 'deps' stage for this section, which is generally fine for build operations.

# Download additional development dependencies before building.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci # This will install dev dependencies into /usr/src/app/node_modules as well

# Apply chmod again, just in case the `npm ci` (dev dependencies) changed permissions.
RUN chmod -R 777 /usr/src/app/node_modules

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN npm run build # This will also write to the /usr/src/app/build directory


################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final 
# Start from base again to keep final image small

# Use production node environment by default.
ENV NODE_ENV development # <--- Changed to 'development' for your dev setup

# Switch to the non-root user (node) for running the application.
USER node

# Copy package.json so that package manager commands can be used (though less critical for dev server).
COPY package.json .

# Copy the production dependencies (with their permissions already set by chmod in 'deps' stage)
# and the built application from the build stage into the image.
# These will be copied to /usr/src/app/node_modules and /usr/src/app/.
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/. ./. 
# This copies your source code and vite.config.js etc.

# We shouldn't need chmod here IF the previous steps worked correctly and the volume
# mount isn't causing re-permissioning issues.
# If you still get EACCES after this, try adding USER root; RUN chmod again here.
# But ideally, it should be fixed earlier.
# If you still get issues with .vite-temp, consider adding a RUN mkdir -p /usr/src/app/node_modules/.vite-temp && chmod -R 777 /usr/src/app/node_modules/.vite-temp

# Expose the port that the application listens on.
EXPOSE 5173

# Run the application.
CMD ["npm","run", "dev"]