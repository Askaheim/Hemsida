"use client";

import { Canvas } from "@react-three/fiber";
import TileGrid from "./TileGrid";
import { LandingpageHeroSectionProps } from "./LandingpageHeroSection.types";



const LandingpageHeroSection = ({ heroTitle, heroText }: LandingpageHeroSectionProps) => {
  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#1e1c1a" }}>
      <Canvas style={{ position: "absolute", inset: 0 }} camera={{ position: [0, 0, 10], fov: 50 }} gl={{ antialias: true, alpha: false }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[-4, 8, 6]} intensity={1.4} />
        <pointLight position={[0, -6, 4]} intensity={0.3} color="#f0ede8" />
        <TileGrid />
      </Canvas>


    </section>
  );
}

export default LandingpageHeroSection;