export const getBlogLink = slug => {
  return `${slug.startsWith("/") ? "" : "/"}${slug}`;
};

export const getDateStr = date => {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric"
  });
};

export const normalizeSlug = slug => {
  if (typeof slug !== 'string') return slug

  let startingSlash = slug.startsWith('/')
  let endingSlash = slug.endsWith('/')

  if (startingSlash) {
    slug = slug.substr(1)
  }
  if (endingSlash) {
    slug = slug.substr(0, slug.length - 1)
  }
  return (startingSlash || endingSlash) ? normalizeSlug(slug) : slug
}

const collectText = (el, acc = []) => {
  if (el) {
    if (typeof el === "string") acc.push(el);
    if (Array.isArray(el)) el.map(item => collectText(item, acc));
    if (typeof el === "object") collectText(el.props && el.props.children, acc);
  }
  return acc.join("").trim();
};

export const getHeadingId = children =>
  collectText(children)
    .toLowerCase()
    .replace(/\s/g, "-")
    .replace(/[?!:]/g, "");
