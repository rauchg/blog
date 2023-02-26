import { getViews } from "../get-views";
import { Header } from "./header";

export const revalidate = 1;

export default async function Layout({ children }) {
  const views = await getViews();

  return (
    <article className="text-gray-800 dark:text-gray-300">
      <Header views={views} />

      {children}
    </article>
  );
}
