import { ContentBoxProps } from "./ContentBox.types";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { cn } from "@/utils/utils";

const ContentBox = ({
    heroTitle,
    heroText,
    heroCtaPrimary,
    heroCtaSecondary,
    heroImage,
    variant = 'light'
}: ContentBoxProps) => {
    return (
        /* Removed absolute inset-0 from here so it doesn't conflict with Framer Motion layout boundaries */
        <div className="max-w-2xl w-full p-8 md:p-12 bg-[#493a3a]/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">

            <div className="flex justify-center">
                {variant === 'dark' ? (
                    <Image src="/logotypes/logotype_BIG_TEXT_WHITE.png" alt="White Logo" width={300} height={300} />
                ) : (
                    <Image src="/logotypes/logotype_BIG_TEXT.png" alt="dark logo" width={300} height={300} />
                )}
            </div>

            <p className={cn("text-base md:text-lg text-stone-200 mb-8 mt-4 max-w-xl mx-auto leading-relaxed text-center text-black", { 'text-white': variant === 'dark' })}>
                {heroText || "När du inte vill tumma på kvaliteten"}
            </p>

            {/* CTA buttons container restores mouse interactions */}
            <div className="flex flex-wrap gap-4 justify-center pointer-events-auto">
                <Button variant="primary" size="md" className="px-7 py-3 text-base font-semibold bg-bronze-1 text-[#493a3a] rounded-lg shadow-md hover:bg-stone-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                    {heroCtaPrimary || "Ta reda på mer"}
                </Button>

                <Button variant="secondary" size="md" className="px-7 py-3 text-base font-semibold bg-transparent text-white border-2 border-white/40 rounded-lg hover:border-white hover:bg-white/20 active:scale-[0.98] transition-all duration-200">
                    {heroCtaSecondary || "Boka möte"}
                </Button>
            </div>

        </div>
    );
};

export default ContentBox;