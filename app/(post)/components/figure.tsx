
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
      before:bg-gray-100
      before:dark:bg-[#111]
      before:w-screen
      before:h-[100%]
      before:content-[""]
      before:top-[0]
      before:left-1/2
      before:-translate-x-1/2
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
