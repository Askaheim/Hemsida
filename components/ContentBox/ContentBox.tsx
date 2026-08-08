import { ContentBoxProps } from "./ContentBox.types";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { cn } from "@/utils/utils";
import Typography from "@/components/Typography/Typography";

const ContentBox = ({
    heroTitle,
    heroText,
    heroCtaPrimary,
    heroCtaSecondary,
    heroImage,
    variant = 'light'
}: ContentBoxProps) => {

    const title = heroTitle;

    return (
        <div className="max-w-2xl w-full p-8 md:p-12 bg-[#493a3a]/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl">

            <div className="flex justify-center">
                {heroImage ? (
                    <Image src={heroImage.url} alt={title ?? "Askaheim logotype"} width={300} height={300} />
                ) : (
                    variant === 'dark' ? (
                        <Image src="/logotypes/logotype_BIG_TEXT_WHITE.png" alt="White Logo" width={300} height={300} />
                    ) : (
                        <Image src="/logotypes/logotype_BIG_TEXT.png" alt="dark logo" width={300} height={300} />
                    )
                )}
            </div>

            {/* Only render text paragraphs if rich text content and text value actually exist */}
            {heroText?.json?.content?.map((item, index: number) => {
                const textValue = item.content?.[0]?.value;
                if (!textValue) return null;

                return (
                    <Typography
                        key={index}
                        variant="p"
                        size="md"
                        weight="500"
                        className={cn(
                            "text-base md:text-lg text-text-primary-light mb-8 mt-4 max-w-xl mx-auto leading-relaxed text-center",
                            { 'text-text-primary-dark': variant === 'dark' }
                        )}
                    >
                        {textValue}
                    </Typography>
                );
            })}

            {/* Only render buttons if CTAs exist */}
            <div className="flex flex-wrap gap-4 justify-center pointer-events-auto">
                {heroCtaPrimary && (
                    <Button variant="primary" size="md" className="px-7 py-3 text-base font-semibold bg-bronze-1 text-text-primary-light rounded-lg shadow-md hover:bg-stone-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                        {heroCtaPrimary}
                    </Button>
                )}
                {heroCtaSecondary && (
                    <Button variant="secondary" size="md" className="px-7 py-3 text-base font-semibold bg-transparent text-white border-2 border-white/40 rounded-lg hover:border-white hover:bg-white/20 active:scale-[0.98] transition-all duration-200">
                        {heroCtaSecondary}
                    </Button>
                )}
            </div>

        </div>
    );
};

export default ContentBox;