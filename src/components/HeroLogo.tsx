import Image from "next/image";

export default function HeroLogo() {
  return (
    <Image
      src="/images/Yankee-Chi-Logo-transparent.png"
      alt="Yankee Chihuahua Rescue logo"
      width={212}
      height={171}
      priority
      className="h-auto w-36 shrink-0 sm:w-44 lg:w-48"
    />
  );
}
