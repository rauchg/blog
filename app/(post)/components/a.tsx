import Link from "next/link";

export function A({ children, className = "", href, ...props }) {
  if (href[0] === "#") {
    return (
      <a
        href={href}
        className={`border-b text-white border-red-300 transition-[border-color] hover:border-white ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  } else if (href[0] === "/") {
    // Internal link
    return (
      <Link
        href={href}
        className={`border-b text-white border-red-300 transition-[border-color] hover:border-white ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  } else {
    // External link
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`border-b text-white border-red-300 transition-[border-color] hover:border-white ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }
}
