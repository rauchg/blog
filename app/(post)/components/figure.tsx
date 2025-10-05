export function Figure({ wide = false, children }) {
  return (
    <div
      className={`
    text-center
    ${
      wide
        ? `
      bg-gray-100
      dark:bg-[#111]
      relative
      overflow-hidden
      before:bg-gray-100
      before:dark:bg-[#111]
      before:w-[100vw]
      before:h-[100%]
      before:content-[""]
      before:top-[0]
      before:left-[50%]
      before:translate-x-[-50%]
      before:absolute
      before:z-[-1]
    `
        : ""
    }
  `}
    >
      {children}
    </div>
  );
}
