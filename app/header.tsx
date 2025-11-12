import { Logo } from "./logo";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex mb-5 md:mb-10 items-center">
      <Logo />

      <nav className="text-xs grow justify-end items-center flex gap-1">
        <Link
          href="/about"
          className="group p-2"
        >
          <span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex">
            About
          </span>
        </Link>
        <a
          href="https://linkedin.com/in/rmashate"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-2"
        >
          <span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex">
            LinkedIn
          </span>
        </a>
        <a
          href="https://github.com/rmashate"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-2"
        >
          <span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex">
            GitHub
          </span>
        </a>
      </nav>
    </header>
  );
}

export default Header;
