"use client";

import { cn } from "@/utils/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface SliderProps {
    cardData: { order: number; content: React.ReactNode }[];
    className?: string;
}

const Slider = ({ cardData, className }: SliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const sortedCards = [...cardData].sort((a, b) => a.order - b.order);
    const total = sortedCards.length;

    const goTo = (direction: "left" | "right") => {
        setCurrentIndex((prev) =>
            direction === "left" ? (prev - 1 + total) % total : (prev + 1) % total
        );
    };

    return (
        <div
            className={cn(
                "relative mb-8 w-full flex flex-col items-center justify-center min-h-[400px]",
                className
            )}
        >
            {/* Arrow Buttons */}
            <button
                onClick={() => goTo("left")}
                className="bg-primary-accent hover:bg-bronze-1 absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full p-2 shadow-md cursor-pointer"
            >
                <ChevronLeft color="white" />
            </button>
            <button
                onClick={() => goTo("right")}
                className="bg-primary-accent hover:bg-bronze-1 absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full p-2 shadow-md cursor-pointer"
            >
                <ChevronRight color="white" />
            </button>

            {/* Fading Content */}
            <div className="w-full flex justify-center items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={sortedCards[currentIndex].order}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full max-w-[800px] flex justify-center"
                    >
                        {sortedCards[currentIndex].content}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Slider