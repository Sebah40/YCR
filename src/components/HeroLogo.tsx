import Image from "next/image";

export default function HeroLogo() {
  return (
    <div className="flex justify-center pt-2 pb-1">
      <Image
        src="/images/Yankee-Chi-Logo-transparent.png"
        alt="Yankee Chihuahua Rescue logo"
        width={212}
        height={171}
        priority
        className="h-auto w-36 sm:w-44"
      />
    </div>
  );
}
