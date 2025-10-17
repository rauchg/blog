import { Logo } from "./logo";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex mb-5 md:mb-10 items-center">
      <Logo />

      <nav className="text-xs grow justify-end items-center flex">
        <Link
          href="/about"
          className="group p-2"
        >
	  <span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex">
		  About
	  </span>
        </Link>
        <a
          href="https://x.com/rauchg"
          target="_blank"
          className="group inline-flex items-center p-2 rounded-sm transition-[background-color] whitespace-nowrap -mr-2"
        >
	  <span className="group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 rounded-xl py-0.5 px-1.5 inline-flex items-center gap-1">
	    <TweetIcon style={{ marginRight: 4 }} />
	    <span>Follow me</span>
	  </span>
        </a>
      </nav>
    </header>
  );
}

function TweetIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" className="inline-flex fill-current" width={12} height={12}><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
  );
}
