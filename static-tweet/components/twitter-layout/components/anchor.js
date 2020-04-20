const PROTOCOL = /^(https?:|)\/\//;

const beautifyHref = href => {
  const text = href.replace(PROTOCOL, '');
  const i = text.indexOf('/');

  if (i === -1) return text;
  // Remove trailing slash
  if (i === text.length - 1) {
    return text.substring(0, i);
  }

  const hostname = text.substring(0, i);
  const pathname = text.substring(i);

  // Hide large paths similarly to how twitter does it
  return pathname.length > 20 ? `${hostname}${pathname.substring(0, 15)}...` : text;
};

export const A = p => (
  <a
    href={p.href}
    target="_blank"
    rel="noopener noreferrer"
    title={p.title || p.href}
    className={p.className}
  >
    {p.children[0] === p.href ? beautifyHref(p.href) : p.children}
    <style jsx>{`
      a {
        color: var(--link-color);
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    `}</style>
  </a>
);
