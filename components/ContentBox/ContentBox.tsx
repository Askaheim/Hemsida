import React from "react";
import Button from "@/components/Button/Button";


const ContentBox = ({ heroTitle, heroText, heroCtaPrimary, heroCtaSecondary, isVisible }: { heroTitle?: string; heroText?: string; heroCtaPrimary?: string; heroCtaSecondary?: string; isVisible: boolean }) => {

    return (
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 pointer-events-none">

            {/* Card layout with frosted glass backdrop and transition animations */}
            <div className={`
          max-w-2xl w-full p-8 md:p-12
          bg-[#493a3a]/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl
          transition-all duration-1000 ease-out transform
          ${isVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-20 opacity-0"
                }
        `}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                    {heroTitle || "Skapa något helt unikt"}
                </h1>

                <p className="text-base md:text-lg text-stone-200 mb-8 max-w-xl mx-auto leading-relaxed">
                    {heroText || "Här är en beskrivande text som förklarar ditt grymma värdeerbjudande till besökaren."}
                </p>

                {/* CTA buttons container restores mouse interactions */}
                <div className="flex flex-wrap gap-4 justify-center pointer-events-auto">
                    <button className="px-7 py-3 text-base font-semibold bg-white text-[#493a3a] rounded-lg shadow-md hover:bg-stone-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                        {heroCtaPrimary || "Ta reda på mer"}
                    </button>

                    <button className="px-7 py-3 text-base font-semibold bg-transparent text-white border-2 border-white/40 rounded-lg hover:border-white hover:bg-white/5 active:scale-[0.98] transition-all duration-200">
                        {heroCtaSecondary || "Boka möte"}
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ContentBox;