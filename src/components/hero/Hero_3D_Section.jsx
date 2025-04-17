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

      const reRender3D = () => {
        requestAnimationFrame(reRender3D);
        if (sphereRef.current) {
          // Always rotate the sphere, regardless of animation state
          sphereRef.current.rotation.y += 0.01 * animationSpeed;
          const action = mixerRef.current.clipAction(animationsRef.current[0]);
          action.setEffectiveTimeScale(0.5);
          action.play();
          if (mixerRef.current) {
            mixerRef.current.update(0.02 * animationSpeed);
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
        // Start animation at normal speed
        console.log("Starting animation at normal speed");

        const action = mixerRef.current.clipAction(animationsRef.current[0]);
        setAnimationSpeed(1);

        if (actionRef.current) {
          actionRef.current.stop();
        }

        action.setEffectiveTimeScale(1);
        action.play();
        actionRef.current = action;
      } else if (isComplete) {
        // Slow down animation
        console.log("Slowing down animation");
        setAnimationSpeed(0.3);
      } else {
        // Stop animation but keep rotating
        console.log("Stopping animation, keeping rotation");
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
