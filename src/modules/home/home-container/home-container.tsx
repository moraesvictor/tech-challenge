import Image from "next/image";
import { AdvantagesSection } from "../home-advantage-section-container/home-advantage-section-container";

export const HomeContainer = () => {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl mt-10 sm:mt-16 lg:mt-20 gap-6 sm:gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2 flex flex-col gap-4 sm:gap-5 lg:gap-6">
          <span className="font-inter font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900">
            Experimente mais liberdade no controle da sua vida financeira.
          </span>
          <span className="font-inter font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900">
            Crie sua conta com a gente!
          </span>
        </div>

        <div className="w-full sm:w-3/4 lg:w-1/2 relative h-64 sm:h-80 lg:h-96">
          <Image
            src="/pigbank.svg"
            alt="pigbank"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <AdvantagesSection />
    </div>
  );
};
