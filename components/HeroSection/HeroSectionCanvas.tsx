'use client'
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import TileGrid from "@/components/LandingpageHeroSection/TileGrid";

const HerosectionCanvas = ({ setShowContent }: { setShowContent: (show: boolean) => void }) => {


  return (
    <>
      <Canvas
        style={{ position: "absolute", inset: 0 }}
        camera={{ position: [0, 0, 10], fov: 32 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#f8f6f6"]} /> {/* Sets WebGL clear color to white */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[-4, 8, 6]} intensity={1.4} />
        <pointLight position={[0, -6, 4]} intensity={0.3} color="#f0ede8" />
        <TileGrid onGridSettled={() => setShowContent(true)} />
      </Canvas>
    </>
  )
}

export default HerosectionCanvas;
