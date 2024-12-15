import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import { Environment } from "@react-three/drei";
import "./styles.css"; // Custom styles for overlay

function App() {
  const [isSiteLoaded, setIsSiteLoaded] = useState(false);

  useEffect(() => {
    // Wait for a short delay to ensure smooth loading
    const handleLoad = () => {
      setTimeout(() => {
        setIsSiteLoaded(true);
      }, 500); // Add slight delay for smooth transition
    };

    // Listen for when all resources are loaded
    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      {/* Fullscreen loading overlay */}
      {!isSiteLoaded && (
        <div className="loading-overlay">
          <div className="stars"></div>
          <div className="content">
            <h1>Loading the Universe</h1>
            <p>Almost there...</p>
          </div>
        </div>
      )}

      {/* Main content */}
      <UI />
      <Loader />
      <Canvas
        shadows
        camera={{
          position: [-0.5, 1, window.innerWidth > 800 ? 4 : 9],
          fov: 45,
        }}
      >
        <Environment files="/hdri/outer2.hdr" background />
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;
