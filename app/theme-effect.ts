export const themeEffect = function () {
  // `null` preference implies system (auto)
  const pref = localStorage.getItem("theme");

  if (null === pref) {
    document.documentElement.classList.add("theme-system");
  } else {
    document.documentElement.classList.remove("theme-system");
  }

  if (
    pref === "dark" ||
    (!pref && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    document.documentElement.dataset.theme = "dark";
    return "dark";
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.dataset.theme = "light";
    return "light";
  }
};
