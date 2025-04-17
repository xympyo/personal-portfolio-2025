import React, { useState, useEffect } from "react";
import Hero_3D_Section from "./hero/Hero_3D_Section";
import Hero_Text from "./hero/Hero_Text";

// Simple error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded-lg">
          <h2 className="text-lg font-bold">Something went wrong</h2>
          <p className="text-sm">
            {this.state.error?.message || "Unknown error"}
          </p>
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const Hero_Section = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Log component lifecycle for debugging
  useEffect(() => {
    console.log("Hero_Section mounted");
    return () => console.log("Hero_Section unmounted");
  }, []);

  return (
    <ErrorBoundary>
      <div className="relative">
        <Hero_3D_Section isProcessing={isProcessing} isComplete={isComplete} />
        <Hero_Text
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          setIsComplete={setIsComplete}
        />
      </div>
    </ErrorBoundary>
  );
};

export default Hero_Section;
