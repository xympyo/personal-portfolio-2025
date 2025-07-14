import React, { useState, useEffect } from "react";
import upload_icon from "../../assets/upload_icon.png";
import { motion } from "framer-motion"; // <-- Import motion here!

// API configuration
const API_URL = "http://127.0.0.1:5000/api/analyze";
// "https://portfolio-vn-detection-mfpsy.ondigitalocean.app/api/analyze";
const API_KEY = import.meta.env.VITE_API_KEY;

const Hero_Text = ({ isProcessing, setIsProcessing, setIsComplete }) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Define variants for the container and its children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each child's animation
        delayChildren: 0.2, // Initial delay for the first child
      },
    },
  };

  // Define variants for individual child items
  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Start invisible and slightly below
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    }, // Animate to visible and original position
  };

  // Test API connection on component mount
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        console.log("Testing API connection...");

        // Try with no-cors mode first
        try {
          const response = await fetch(
            "http://127.0.0.1:5000",
            // "https://portfolio-vn-detection-mfpsy.ondigitalocean.app/",
            {
              method: "GET",
              mode: "no-cors", // This will allow the request to go through, but we won't get the response
            }
          );

          console.log("API test response (no-cors):", response);

          // Since we're using no-cors, we can't read the response, but we can check if the request was sent
          if (response.type === "opaque") {
            console.log("API is accessible (opaque response)");

            // Try the /api/test endpoint with API key
            try {
              console.log("Testing /api/test endpoint...");
              const testResponse = await fetch(
                "http://127.0.0.1:5000",
                // "https://portfolio-vn-detection-mfpsy.ondigitalocean.app/api/test",
                {
                  method: "GET",
                  headers: {
                    "x-api-key": API_KEY,
                  },
                }
              );

              if (testResponse.ok) {
                const testData = await testResponse.json();
                console.log("API test endpoint response:", testData);
              } else {
                console.error("API test endpoint failed:", testResponse.status);
              }
            } catch (testErr) {
              console.error("API test endpoint error:", testErr);
            }
          } else {
            console.log("API is accessible (normal response)");
          }
        } catch (noCorsErr) {
          console.error("No-cors request failed:", noCorsErr);

          // Try with CORS proxy
          console.log("Trying with CORS proxy...");
          const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Note: This proxy is public and may have rate limits
          const targetUrl =
            // "https://portfolio-vn-detection-mfpsy.ondigitalocean.app/";
            "http://127.0.0.1:5000";
          try {
            const proxyResponse = await fetch(proxyUrl + targetUrl, {
              method: "GET",
              headers: {
                Origin: "https://moshedyn.vercel.app",
              },
            });

            if (proxyResponse.ok) {
              const data = await proxyResponse.json();
              console.log("Proxy API test response:", data);
            } else {
              console.error("Proxy API test failed:", proxyResponse.status);
            }
          } catch (proxyErr) {
            console.error("Proxy request failed:", proxyErr);
          }
        }
      } catch (err) {
        console.error("API test failed:", err);
      }
    };

    testApiConnection();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("audio/")) {
      setError("Please upload an audio file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size too large. Please upload a file smaller than 10MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Set processing state to true
      setIsProcessing(true);
      setError(null);

      console.log("Processing audio file...");
      console.log("File details:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      // Send the file to the Flask backend
      console.log("Sending request to:", API_URL);
      console.log("With API key:", API_KEY);

      // Try direct connection first
      try {
        console.log("Attempting direct connection...");
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "x-api-key": API_KEY,
          },
          body: formData,
        });

        console.log("Response status:", response.status);
        console.log(
          "Response headers:",
          Object.fromEntries([...response.headers])
        );

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Unknown error" }));
          console.error("Error response:", errorData);
          throw new Error(
            errorData.error || `Server error: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("API response data:", data);

        setResult(data);

        // Set complete state to true
        setIsComplete(true);

        // After a delay, reset the complete state to allow for new uploads
        setTimeout(() => {
          setIsComplete(false);
        }, 5000);
      } catch (directError) {
        console.error("Direct connection failed:", directError);

        // If direct connection fails, try with CORS proxy
        console.log("Trying with CORS proxy...");
        const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Use with caution, public proxy
        const targetUrl = API_URL;

        const proxyResponse = await fetch(proxyUrl + targetUrl, {
          method: "POST",
          headers: {
            "x-api-key": API_KEY,
            Origin: "https://moshedyn.vercel.app", // Ensure this matches your actual deployed origin
          },
          body: formData,
        });

        console.log("Proxy response status:", proxyResponse.status);
        console.log(
          "Proxy response headers:",
          Object.fromEntries([...proxyResponse.headers])
        );

        if (!proxyResponse.ok) {
          const errorData = await proxyResponse
            .json()
            .catch(() => ({ error: "Unknown error" }));
          console.error("Proxy error response:", errorData);
          throw new Error(
            errorData.error || `Server error: ${proxyResponse.status}`
          );
        }

        const data = await proxyResponse.json();
        console.log("Proxy API response data:", data);

        setResult(data);

        // Set complete state to true
        setIsComplete(true);

        // After a delay, reset the complete state to allow for new uploads
        setTimeout(() => {
          setIsComplete(false);
        }, 5000);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError(
        `Error: ${
          err.message ||
          "Failed to process audio. This might be due to CORS restrictions. Please check the console for more details."
        }`
      );
      setIsComplete(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    // Main container for animation, applying container variants
    <motion.div
      className="flex justify-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }} // Re-trigger when 50% in view
    >
      <div className="flex flex-col items-center mt-12 sm:mt-24 mx-auto px-4 overflow-y-hidden">
        {/* First section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <h1 className="text-secondary text-lg md:text-2xl overflow-y-hidden font-medium text-center">
            "Can I even play this Voice Note in front of my mom?"
          </h1>
          <p className="text-secondary text-sm md:text-base font-light text-left mt-2 md:mt-4">
            - Moshe, after hearing 8 harmful words,
            <br />2 mentioning cigarettes, in front of his mom.
          </p>
        </motion.div>

        {/* Second section */}
        <motion.div variants={itemVariants} className="flex-col justify-center">
          <p className="text-secondary text-md md:text-lg font-normal text-center mt-2 md:mt-4">
            Submit your Voice Note below,
            <br />
            and we will summarize it, and tell you if it is you can play it in
            front of anyone.
          </p>
          <p className="text-secondary text-sm md:text-base font-normal text-left mt-4">
            The voice note should be in Indonesia language (Bahasa).
          </p>
        </motion.div>

        {/* Upload form section */}
        <motion.div variants={itemVariants} className="mt-12 max-w-md">
          <form action="">
            <label htmlFor="inputForm" className="">
              <div className="border border-secondary p-3 rounded-xl flex align-middle justify-center cursor-pointer transition-colors">
                <img src={upload_icon} alt="Upload Icon" className="w-5 h-5" />
                <p className="ms-2 text-secondary font-light text-base">
                  {isProcessing ? "Processing..." : "Drag your voice note here"}
                </p>
              </div>
            </label>
            <input
              className="invisible"
              id="inputForm"
              name="inputForm"
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              disabled={isProcessing}
            />
          </form>
        </motion.div>

        {/* Error message (will animate if present) */}
        {error && (
          <motion.div
            variants={itemVariants}
            className="mt-4 text-red-500 text-base md:text-sm font-light text-center"
          >
            Something happens! : {error}
          </motion.div>
        )}

        {/* Optional: Output (will animate if present) */}
        {result && (
          <motion.div
            variants={itemVariants}
            className="mt-4 text-secondary text-base md:text-sm font-light text-center"
          >
            <p>
              Intinya <span>{result?.prediction}</span>
            </p>
            <p>
              Konteks:{" "}
              <span
                className={
                  result?.prediction?.toLowerCase() === "negative"
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {result?.summary}
              </span>
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Hero_Text;
