// BUG: Page-wide horizontal overflow on the portfolio blog.
// Cause: Tailwind utility before:w-[10000%] creates a :before pseudo-element
// that is 10000% wide, forcing an x-scroll.
// The generated CSS from the report:
//
// .before\:w-\[10000\%\]::before {
//   content: var(--tw-content);
//   width: 10000%;
// }
//
// Please make sure to fix this.
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
      before:w-[10000%]
      before:h-[100%]
      before:content-[""]
      before:top-[0]
      before:left-[-1000px]
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
