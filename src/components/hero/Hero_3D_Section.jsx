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
  const animationTimerRef = useRef(null);
  const [animationPhase, setAnimationPhase] = useState("idle"); // idle, processing, complete
  const [predictionResult, setPredictionResult] = useState(null); // null, positive, negative
  const innerSphereRef = useRef(null);
  const outerSphereRef = useRef(null);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

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

      // Create inner glowing sphere
      const innerGeometry = new THREE.SphereGeometry(0.8, 32, 32);
      const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff, // Cyan blue
        transparent: true,
        opacity: 0.8,
      });
      const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
      innerSphereRef.current = innerSphere;
      scene.add(innerSphere);

      // Create outer metallic sphere
      const outerGeometry = new THREE.SphereGeometry(1, 32, 32);
      const outerMaterial = new THREE.MeshStandardMaterial({
        color: 0xc0c0c0, // Silver
        metalness: 0.9,
        roughness: 0.2,
      });
      const outerSphere = new THREE.Mesh(outerGeometry, outerMaterial);
      outerSphereRef.current = outerSphere;
      scene.add(outerSphere);

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

            // Check if animations exist
            if (gltf.animations && gltf.animations.length > 0) {
              console.log(`Found ${gltf.animations.length} animations`);

              // Start the default animation loop
              startDefaultAnimationLoop();
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

      const reRender3D = () => {
        requestAnimationFrame(reRender3D);

        // Update rotation based on animation phase
        if (animationPhase === "processing") {
          // Chaotic rotation during processing
          setRotationX(rotationX + (Math.random() - 0.5) * 0.1);
          setRotationY(rotationY + (Math.random() - 0.5) * 0.1);
        } else if (animationPhase === "complete") {
          // Gradually return to default position
          setRotationX(rotationX * 0.95);
          setRotationY(rotationY * 0.95);
        }

        // Apply rotations to both spheres
        if (innerSphereRef.current) {
          innerSphereRef.current.rotation.x = rotationX;
          innerSphereRef.current.rotation.y = rotationY;
        }

        if (outerSphereRef.current) {
          outerSphereRef.current.rotation.x = rotationX;
          outerSphereRef.current.rotation.y = rotationY;
        }

        if (sphereRef.current) {
          sphereRef.current.rotation.x = rotationX;
          sphereRef.current.rotation.y = rotationY;

          if (mixerRef.current) {
            mixerRef.current.update(0.02 * animationSpeed);
          }
        }

        // Update material effects based on animation phase
        updateMaterialEffects();

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
        if (animationTimerRef.current) {
          clearTimeout(animationTimerRef.current);
        }
      };
    } catch (err) {
      console.error("Error in 3D setup:", err);
      setError("Error setting up 3D scene");
    }
  }, []);

  // Function to start the default animation loop
  const startDefaultAnimationLoop = () => {
    if (!mixerRef.current || !animationsRef.current.length) return;

    // Clear any existing timer
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    // Play the animation
    if (actionRef.current) {
      actionRef.current.stop();
    }

    const action = mixerRef.current.clipAction(animationsRef.current[0]);
    action.play();
    actionRef.current = action;

    // Set a timer to stop the animation after a delay
    animationTimerRef.current = setTimeout(() => {
      if (actionRef.current) {
        actionRef.current.stop();
      }

      // Set a timer to restart the animation after a delay
      animationTimerRef.current = setTimeout(() => {
        startDefaultAnimationLoop();
      }, 1000); // 1 second delay before restarting
    }, 2000); // 2 seconds of animation before stopping
  };

  // Function to update material effects based on animation phase
  const updateMaterialEffects = () => {
    try {
      if (!innerSphereRef.current || !outerSphereRef.current) return;

      const innerMaterial = innerSphereRef.current.material;
      const outerMaterial = outerSphereRef.current.material;

      if (!innerMaterial || !outerMaterial) return;

      if (animationPhase === "idle") {
        // Default state - silver with cyan inner glow
        outerMaterial.color.set(0xc0c0c0);
        innerMaterial.color.set(0x00ffff);
        innerMaterial.opacity = 0.8;
      } else if (animationPhase === "processing") {
        // Processing state - brighter with increased glow
        outerMaterial.color.set(0xd0d0d0);
        innerMaterial.color.set(0x00ffff);
        innerMaterial.opacity = 1.0;
      } else if (animationPhase === "complete") {
        // Complete state - color based on prediction result
        outerMaterial.color.set(0xc0c0c0);

        if (predictionResult === "positive") {
          innerMaterial.color.set(0x00ff00);
          innerMaterial.opacity = 1.0;
        } else if (predictionResult === "negative") {
          innerMaterial.color.set(0xff0000);
          innerMaterial.opacity = 1.0;
        } else {
          innerMaterial.color.set(0x00ffff);
          innerMaterial.opacity = 0.8;
        }
      }
    } catch (err) {
      console.error("Error updating material effects:", err);
    }
  };

  // Control animation based on processing state
  useEffect(() => {
    try {
      if (!mixerRef.current || !animationsRef.current.length) {
        console.log("Animation system not ready yet");
        return;
      }

      console.log("Animation state changed:", { isProcessing, isComplete });

      if (isProcessing) {
        // Processing state - chaotic rotation
        console.log("Entering processing state");
        setAnimationPhase("processing");
        setAnimationSpeed(1);

        // Stop the default animation loop
        if (animationTimerRef.current) {
          clearTimeout(animationTimerRef.current);
        }

        if (actionRef.current) {
          actionRef.current.stop();
        }

        // Play the animation at normal speed
        const action = mixerRef.current.clipAction(animationsRef.current[0]);
        action.play();
        actionRef.current = action;
      } else if (isComplete) {
        // Complete state - return to default position
        console.log("Entering complete state");
        setAnimationPhase("complete");
        setAnimationSpeed(1);

        // Stop the current animation
        if (actionRef.current) {
          actionRef.current.stop();
        }

        // Start the default animation loop
        startDefaultAnimationLoop();
      } else {
        // Idle state - default animation loop
        console.log("Returning to idle state");
        setAnimationPhase("idle");
        setAnimationSpeed(1);
        setPredictionResult(null);

        // Start the default animation loop
        startDefaultAnimationLoop();
      }
    } catch (err) {
      console.error("Error controlling animation:", err);
    }
  }, [isProcessing, isComplete]);

  // Update prediction result when API response is received
  useEffect(() => {
    if (isComplete && sphereRef.current) {
      // This is where you would check the API response
      // For now, we'll simulate a random result
      const result = Math.random() > 0.5 ? "positive" : "negative";
      setPredictionResult(result);
      console.log("Prediction result:", result);
    }
  }, [isComplete]);

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
