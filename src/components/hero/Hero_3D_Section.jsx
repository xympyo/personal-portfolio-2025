import React, { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const Hero_3D_Section = ({ isProcessing, isComplete }) => {
  const refContainer = useRef(null);
  const [animationSpeed, setAnimationSpeed] = useState(0.5);
  const [xSpeed, setXSpeed] = useState(0);
  const [ySpeed, setYSpeed] = useState(0.1);
  const mixerRef = useRef(null);
  const sphereRef = useRef(null);
  const [error, setError] = useState(null);
  const animationsRef = useRef([]);
  const actionRef = useRef(null);
  const processingStartTimeRef = useRef(null);
  const lastRotationTimeRef = useRef(Date.now());
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  const reRender3D = useCallback(() => {
    requestAnimationFrame(reRender3D);
    if (
      sphereRef.current &&
      sceneRef.current &&
      cameraRef.current &&
      rendererRef.current
    ) {
      const currentTime = Date.now();

      if (isProcessing && processingStartTimeRef.current) {
        const processingElapsedTime =
          currentTime - processingStartTimeRef.current;
        if (processingElapsedTime < 500) {
          // First 0.5 seconds of processing
          // Reverse rotation
          sphereRef.current.rotation.y = ySpeed;
        } else {
          // Normal rotation after 0.5 seconds
          sphereRef.current.rotation.y = ySpeed;
        }
      } else {
        // Normal rotation in all other cases
        sphereRef.current.rotation.y = ySpeed;
        sphereRef.current.rotation.x = xSpeed;
      }

      lastRotationTimeRef.current = currentTime;

      if (mixerRef.current) {
        mixerRef.current.update(0.02);
      }
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  }, [isProcessing, xSpeed, ySpeed, animationSpeed]);

  useEffect(() => {
    // Handle animation speeds based on isProcessing and isComplete
    if (isProcessing) {
      setAnimationSpeed(1.5);
      setXSpeed(0.75);
      setYSpeed(0.75);
    } else if (isComplete) {
      setAnimationSpeed(0.3);
      setXSpeed(0);
      setYSpeed(0.1);
    } else {
      setAnimationSpeed(0.5);
      setXSpeed(0);
      setYSpeed(0.1);
    }
  }, [isProcessing, isComplete]);

  useEffect(() => {
    try {
      // === THREE.JS CODE START ===
      var scene = new THREE.Scene();
      sceneRef.current = scene;
      var camera = new THREE.PerspectiveCamera(
        window.innerWidth <= 768 ? 28 : 20,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current = camera;
      camera.position.z = 12;
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      rendererRef.current = renderer;

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
      loader.load("/sphere.glb", function (gltf) {
        try {
          sphereRef.current = gltf.scene;
          scene.add(sphereRef.current);

          // Store animations for later use
          animationsRef.current = gltf.animations;

          // Create mixer
          mixerRef.current = new THREE.AnimationMixer(sphereRef.current);

          // Check if animations exist
          if (gltf.animations && gltf.animations.length > 0) {
            // Start default animation at 0.5 speed
            const defaultAction = mixerRef.current.clipAction(
              gltf.animations[0]
            );
            defaultAction.setEffectiveTimeScale(animationSpeed);
            defaultAction.play();
            actionRef.current = defaultAction;
          }
        } catch (err) {
          console.error("Error setting up 3D model:", err);
          setError("Error setting up 3D model");
        }
      });

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.125);
      scene.add(ambientLight);

      const topLight = new THREE.DirectionalLight(0xffffff, 1);
      topLight.position.set(100, 500, 0);

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

      if (isProcessing) {
        // Start animation at normal speed
        setAnimationSpeed(0.5);
        setXSpeed(0.5);
        setYSpeed(0.5);

        processingStartTimeRef.current = Date.now();
        lastRotationTimeRef.current = Date.now();

        const action = mixerRef.current.clipAction(animationsRef.current[0]);
        action.setEffectiveTimeScale(animationSpeed);
        if (actionRef.current) {
          actionRef.current.stop();
        }

        action.play();
        actionRef.current = action;
      } else if (isComplete) {
        // Slow down animation
        setAnimationSpeed(0.3);
        setXSpeed(0);
        setYSpeed(0.1);

        const action = mixerRef.current.clipAction(animationsRef.current[0]);
        action.setEffectiveTimeScale(animationSpeed);
        if (actionRef.current) {
          actionRef.current.stop();
        }

        action.play();
        actionRef.current = action;
      } else {
        setAnimationSpeed(0.75);
        setXSpeed(0);
        setYSpeed(0.5);

        const action = mixerRef.current.clipAction(animationsRef.current[0]);
        action.setEffectiveTimeScale(animationSpeed);
        if (actionRef.current) {
          actionRef.current.stop();
        }

        action.play();
        actionRef.current = action;
      }
    } catch (err) {
      console.error("Error controlling animation:", err);
    }
  }, [isProcessing, isComplete]);

  // Add a debug effect to monitor animation speed changes
  useEffect(() => {
    console.log("Animation speed state changed to:", animationSpeed);
  }, [animationSpeed]);

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
