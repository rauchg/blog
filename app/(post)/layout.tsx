import { getViews } from "../get-views";
import { Meta } from "./meta";

export const revalidate = 1;

export default async function Layout({ children }) {
  const views = await getViews();

  return (
    <article className="text-gray-800 dark:text-gray-300">
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">
        Making the Web. Faster.
      </h1>

      <Meta views={views} />

      {children}
    </article>
  );
}
