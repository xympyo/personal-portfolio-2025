import React, { useState } from "react";
import upload_icon from "../../assets/upload_icon.png";

// API configuration
const API_URL =
  "https://portfolio-vn-detection-mfpsy.ondigitalocean.app/api/analyze";
const API_KEY = "A}{ctxYq{1+NYa-YaU@I"; // Replace with your actual API key

const Hero_Text = ({ isProcessing, setIsProcessing, setIsComplete }) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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

      // Send the file to the Flask backend
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
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
    } catch (err) {
      console.error("Upload failed:", err);
      setError(`Error: ${err.message || "Failed to process audio"}`);
      setIsComplete(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center mt-24 mx-auto px-4">
        <div className="flex flex-col items-center">
          <h1 className="text-secondary text-small md:text-large font-medium text-center overflow-y-hidden h-full w-full">
            "Voice Note should have NSFW System."
          </h1>
          <p className="text-secondary text-xs md:text-small font-light text-center mt-4 h-full w-full overflow-y-hidden">
            - Moshe, after hearing 8 harmful words,
            <br />2 mentioning cigarettes, in front of his mom.
          </p>
        </div>
        <div className="flex justify-center">
          <p className="text-secondary text-sm md:text-small font-normal text-center mt-4 overflow-y-hidden">
            Submit your Voice Note below,
            <br />
            and we will summarize it, and tell you if it is Safe For Work (SFW.)
          </p>
        </div>
        <div className="mt-12 w-full max-w-md">
          <form action="">
            <label htmlFor="inputForm" className="w-full">
              <div className="border border-secondary p-3 rounded-xl flex align-middle justify-center cursor-pointer transition-colors">
                <img src={upload_icon} alt="Upload Icon" className="w-5 h-5" />
                <p className="ms-2 text-secondary font-light text-small">
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
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 text-red-500 text-xs md:text-small font-light text-center w-full">
            {error}
          </div>
        )}

        {/* Optional: Output */}
        {result && (
          <div className="mt-4 text-secondary text-xs md:text-small font-light text-center w-full">
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-60">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero_Text;
