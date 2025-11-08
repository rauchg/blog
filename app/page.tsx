import Posts from "./posts";
import Header from "./header";
import Footer from "./footer";
import "./globals.css";

export default function HomePage() {
  return (
    <div className="antialiased max-w-2xl flex flex-col md:flex-row mx-4 lg:mx-auto">
      <main className="flex-auto min-w-0 mt-12 md:mt-0 flex flex-col px-2 md:px-0">
        <Header />
        <Posts />
        <Footer />
      </main>
    </div>
  );
}