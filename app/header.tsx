import Link from "next/link";

const navItems = {
  "/": {
    name: "home",
  },
  "https://linkedin.com/in/rmashate": {
    name: "linkedin",
  },
  "https://github.com/rmashate": {
    name: "github",
  },
  "/about": {
    name: "about",
  },
};

export default function Header() {
  return (
    <header className="mb-16 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isExternal = path.startsWith('http');
              
              if (isExternal) {
                return (
                  <a
                    key={path}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
                  >
                    {name}
                  </a>
                );
              }
              
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}