"use client";

import { Canvas } from "@react-three/fiber";
import TileGrid from "./TileGrid";
import { LandingpageHeroSectionProps } from "./LandingpageHeroSection.types";
import ContentBox from "../ContentBox/ContentBox";
import { motion, Variants } from 'framer-motion';

const LandingpageHeroSection = ({ hero }: LandingpageHeroSectionProps) => {
  const { heroTitle, heroText, heroImage, heroCtaPrimary, heroCtaSecondary } = hero;

  // slideIn function with delay built-in
  const slideIn = (
    direction: string,
    type: string,
    delay: number,
    duration: number
  ): Variants => ({
    hidden: {
      y: direction === 'down' ? '-100%' : direction === 'up' ? '100%' : 0,
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay, // This is your delay parameter (seconds)
        duration: duration,
        ease: "easeOut"
      },
    },
  });

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#fff" }}>

      {/* 3D BACKGROUND */}
      <Canvas
        style={{ position: "absolute", inset: 0 }}
        camera={{ position: [0, 0, 10], fov: 32 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#474064"]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[-4, 8, 6]} intensity={1.4} />
        <pointLight position={[0, -6, 4]} intensity={0.3} color="#f0ede8" />
        <TileGrid />
      </Canvas>

      {/* HTML CONTENT CONTAINER USING YOUR SLIDEIN FUNCTION */}
      {/* Added initial="hidden" and animate="show" so Framer Motion honors the delay */}
      <motion.div
        className="absolute inset-0 z-20 flex justify-center items-center px-4 pointer-events-none"
        variants={slideIn('down', 'tween', 3.5, 1.2)} // 3.5 seconds delay passed dynamically here
        initial="hidden"
        animate="show"
      >
        <ContentBox
          variant="light"
          heroTitle={heroTitle}
          heroText={heroText}
          heroImage={heroImage}
          heroCtaPrimary={heroCtaPrimary}
          heroCtaSecondary={heroCtaSecondary}
        />
      </motion.div>
    </section>
  );
}

export default LandingpageHeroSection;