import Image from "next/image";
import { AdvantagesSection } from "../home-advantage-section-container/home-advantage-section-container";

export const HomeContainer = () => {
  return (
    <div className="flex flex-col items-center px-8">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl mt-20 gap-12">
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <span className="font-inter font-semibold text-5xl text-gray-900">
            Experimente mais liberdade no controle da sua vida financeira.
          </span>
          <span className="font-inter font-semibold text-6xl text-gray-900">
            Crie sua conta com a gente!
          </span>
        </div>

        <div className="w-1/2 lg:w-1/2 relative h-96">
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
