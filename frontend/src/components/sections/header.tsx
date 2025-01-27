import Image from "next/image";
import Link from "next/link";

export function Header() {
<<<<<<< HEAD
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
=======
  return (
    <header
      className="font-inter font-medium mt-4 flex justify-between items-center p-4 max-md:p-2 "
    >
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={50}
          height={50}
        />
      </Link>
      <nav className="max-md:hidden ">
        <ul className="flex justify-evenly items-center gap-4 ">
          {navLinks.map((link) => (
            <li key={link.href}
              className="hover:font-semibold hover:bg-background hover:scale-105
                px-2 py-1 rounded-xl transition-all duration-300 ">
              <Link href={link.href}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Button className="max-md:hidden">
        <Link href="/dashboard">
          Dashboard
        </Link>
      </Button>
      <NavBar />
    </header >
  )
}
>>>>>>> thomas
