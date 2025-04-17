import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const Hero_3D_Section = ({ isProcessing, isComplete }) => {
  const refContainer = useRef(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const mixerRef = useRef(null);
  const sphereRef = useRef(null);
  const [error, setError] = useState(null);
  const animationsRef = useRef([]);
  const actionRef = useRef(null);
  const colorMaskRef = useRef(null);
  const momentumTimerRef = useRef(null);
  const [animationPhase, setAnimationPhase] = useState("idle"); // idle, momentum, active, drained

  useEffect(() => {
    try {
      // === THREE.JS CODE START ===
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(
        window.innerWidth <= 768 ? 28 : 20,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 12;
      const renderer = new THREE.WebGLRenderer({ alpha: true });

      // Set initial size - make it larger for better visibility
      const containerWidth =
        refContainer.current?.clientWidth || window.innerWidth;
      const containerHeight =
        refContainer.current?.clientHeight || window.innerHeight;
      renderer.setSize(containerWidth, containerHeight);

      if (!refContainer.current) {
        console.error("Container ref is not available");
        return;
      }

      refContainer.current.appendChild(renderer.domElement);

      const loader = new GLTFLoader();
      loader.load(
        "/sphere.glb",
        function (gltf) {
          try {
            console.log("3D model loaded successfully");
            sphereRef.current = gltf.scene;
            scene.add(sphereRef.current);

            // Store animations for later use
            animationsRef.current = gltf.animations;
            console.log(
              `Found ${gltf.animations.length} animations:`,
              gltf.animations
            );

            // Create mixer
            mixerRef.current = new THREE.AnimationMixer(sphereRef.current);

            // Create color mask effect
            const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
            const maskMaterial = new THREE.ShaderMaterial({
              uniforms: {
                color: { value: new THREE.Color(0x00ff00) },
                opacity: { value: 0.0 },
                time: { value: 0.0 },
              },
              vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                void main() {
                  vUv = uv;
                  vNormal = normal;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
              `,
              fragmentShader: `
                uniform vec3 color;
                uniform float opacity;
                uniform float time;
                varying vec2 vUv;
                varying vec3 vNormal;
                void main() {
                  float pulse = sin(time * 2.0) * 0.5 + 0.5;
                  float glow = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                  vec3 finalColor = color * (1.0 + pulse * 0.3);
                  gl_FragColor = vec4(finalColor, opacity * glow);
                }
              `,
              transparent: true,
              side: THREE.BackSide,
            });

            const maskMesh = new THREE.Mesh(sphereGeometry, maskMaterial);
            maskMesh.scale.set(1.1, 1.1, 1.1); // Slightly larger than the sphere
            sphereRef.current.add(maskMesh);
            colorMaskRef.current = maskMesh;

            // Check if animations exist
            if (gltf.animations && gltf.animations.length > 0) {
              console.log(`Found ${gltf.animations.length} animations`);

              // Don't play animation by default - wait for isProcessing to be true
              // const action = mixerRef.current.clipAction(gltf.animations[0]);
              // action.play();
              // console.log("Playing animation:", gltf.animations[0].name);
            } else {
              console.warn("No animations found in the model");
            }
          } catch (err) {
            console.error("Error setting up 3D model:", err);
            setError("Error setting up 3D model");
          }
        },
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        function (error) {
          console.error("Error loading model:", error);
          setError("Error loading 3D model");
        }
      );

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.125);
      scene.add(ambientLight);

      const topLight = new THREE.DirectionalLight(0xffffff, 1);
      topLight.position.set(100, 500, 0);

      // Animation clock for shader effects
      const clock = new THREE.Clock();

      const reRender3D = () => {
        requestAnimationFrame(reRender3D);
        if (sphereRef.current) {
          // Always rotate the sphere, regardless of animation state
          sphereRef.current.rotation.y += 0.01 * animationSpeed;
          if (mixerRef.current) {
            mixerRef.current.update(0.02 * animationSpeed);
          }

          // Update color mask effect
          if (colorMaskRef.current) {
            const material = colorMaskRef.current.material;
            material.uniforms.time.value = clock.getElapsedTime();

            // Update opacity based on animation phase
            if (animationPhase === "idle") {
              material.uniforms.opacity.value = THREE.MathUtils.lerp(
                material.uniforms.opacity.value,
                0.0,
                0.05
              );
            } else if (animationPhase === "momentum") {
              material.uniforms.opacity.value = THREE.MathUtils.lerp(
                material.uniforms.opacity.value,
                0.3,
                0.1
              );
              material.uniforms.color.value.set(0xff0000); // Red during momentum
            } else if (animationPhase === "active") {
              material.uniforms.opacity.value = THREE.MathUtils.lerp(
                material.uniforms.opacity.value,
                0.7,
                0.1
              );
              material.uniforms.color.value.set(0x00ff00); // Green during active
            } else if (animationPhase === "drained") {
              material.uniforms.opacity.value = THREE.MathUtils.lerp(
                material.uniforms.opacity.value,
                0.2,
                0.05
              );
              material.uniforms.color.value.set(0x0000ff); // Blue when drained
            }
          }
        }
        renderer.render(scene, camera);
      };

      reRender3D();

      // Handle window resize
      const handleResize = () => {
        if (!refContainer.current) return;

        const width = refContainer.current.clientWidth;
        const height = refContainer.current.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      };

      window.addEventListener("resize", handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener("resize", handleResize);
        if (refContainer.current && renderer.domElement) {
          refContainer.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        if (momentumTimerRef.current) {
          clearTimeout(momentumTimerRef.current);
        }
      };
    } catch (err) {
      console.error("Error in 3D setup:", err);
      setError("Error setting up 3D scene");
    }
  }, []);

  // Control animation based on processing state
  useEffect(() => {
    try {
      if (!mixerRef.current || !animationsRef.current.length) {
        console.log("Animation system not ready yet");
        return;
      }

      console.log("Animation state changed:", { isProcessing, isComplete });

      if (isProcessing) {
        // Start with momentum phase (counter-clockwise)
        console.log("Starting momentum phase");
        setAnimationPhase("momentum");
        setAnimationSpeed(-0.5); // Counter-clockwise rotation

        // Clear any existing timer
        if (momentumTimerRef.current) {
          clearTimeout(momentumTimerRef.current);
        }

        // After a short delay, switch to active phase
        momentumTimerRef.current = setTimeout(() => {
          console.log("Switching to active phase");
          setAnimationPhase("active");
          setAnimationSpeed(1); // Normal clockwise rotation

          if (actionRef.current) {
            actionRef.current.stop();
          }

          const action = mixerRef.current.clipAction(animationsRef.current[0]);
          action.play();
          actionRef.current = action;
        }, 800); // 800ms for momentum phase
      } else if (isComplete) {
        // Power drained phase
        console.log("Entering power drained phase");
        setAnimationPhase("drained");
        setAnimationSpeed(0.1); // Very slow rotation

        if (actionRef.current) {
          actionRef.current.stop();
        }
      } else {
        // Return to idle
        console.log("Returning to idle state");
        setAnimationPhase("idle");
        setAnimationSpeed(1);

        if (actionRef.current) {
          actionRef.current.stop();
          actionRef.current = null;
        }
      }
    } catch (err) {
      console.error("Error controlling animation:", err);
    }
  }, [isProcessing, isComplete]);

  return (
    <div className="absolute inset-0 w-full h-full z-[-1]">
      <div ref={refContainer} className="w-full h-full"></div>
      {error && (
        <div className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default Hero_3D_Section;
