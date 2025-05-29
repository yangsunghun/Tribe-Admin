import LogoImage from "@/assets/images/logo.svg";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white">
      <div className="mx-auto flex h-16 w-[96vw] items-center justify-between">
        <h1>
          <Link href="/">
            <Image src={LogoImage} alt="Tribe" className="inline-block max-w-[80px]" />
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
