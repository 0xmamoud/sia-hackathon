import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <header className="container font-inter font-medium flex justify-center items-center p-4 max-md:p-2">
            {/* Logo centré */}
            <Link href="/">
                <Image
                    src="/image/logo_gide.png"
                    alt="Logo"
                    width={200}
                    height={200}
                />
            </Link>
        </header>
    );
}