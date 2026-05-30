import Image from "next/image";

export default function BrandBand() {
  return (
    <div className="bg-cream py-6">
      <div className="mx-auto flex max-w-7xl justify-center px-6">
        <Image
          src="/images/Yankee-Chi-Logo-transparent.png"
          alt="Yankee Chihuahua Rescue logo"
          width={212}
          height={171}
          priority
          className="h-auto w-44 sm:w-52"
        />
      </div>
    </div>
  );
}
