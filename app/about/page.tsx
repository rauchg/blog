import Image from "next/image";

export default function About() {
  return (
    <article className="text-gray-800 dark:text-gray-300">
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">About</h1>

      <a href="https://twitter.com/rauchg" target="_blank">
        <Image
          src="/images/rauchg-3d4cecf.jpg"
          alt="Guillermo Rauch"
          className="rounded-full bg-gray-100 block my-5 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
          width={160}
          height={160}
          loading="eager"
        />
      </a>

      <p className="my-2">
        I&rsquo;m a software engineer and CEO of Vercel. I&rsquo;m originally
        from Lanus, Provincia de Buenos Aires, Argentina. I owe much of my
        career to the Web and Open Source.
      </p>

      <p className="my-2">
        I spent my teenage years advocating and teaching people how to use and
        sysadmin Linux and later developed a passion for JavaScript and Web
        development.
      </p>

      <p className="my-2">
        After joining the{" "}
        <a
          href="https://en.wikipedia.org/wiki/MooTools"
          target="_blank"
          className="post-link"
        >
          MooTools
        </a>{" "}
        core team, I got my first full-time job as a frontend engineer at 18
        years old and relocated to San Francisco, CA.
      </p>

      <p className="my-2">
        I started my first company Cloudup in SF which was{" "}
        <a
          href="https://techcrunch.com/2013/09/25/automattic-acquires-file-sharing-service-cloudup-to-build-faster-media-library-and-enable-co-editing/"
          target="_blank"
          className="post-link"
        >
          later acquired by Automattic
        </a>
        , the company behind WordPress, to power their editing and site building
        technology.
      </p>

      <p className="my-2">
        After being involved in creating numerous influential open source
        projects like{" "}
        <a href="https://socket.io" target="_blank" className="post-link">
          Socket.IO
        </a>{" "}
        and{" "}
        <a href="https://mongoosejs.com" target="_blank" className="post-link">
          Mongoose
        </a>
        , I saw the opportunity in creating tooling and cloud infrastructure to
        make the Web faster, with a focus on developer experience (DX).
      </p>

      <p className="my-2">
        <a href="https://nextjs.org" target="_blank" className="post-link">
          Next.js
        </a>{" "}
        and{" "}
        <a href="https://vercel.com" target="_blank" className="post-link">
          Vercel
        </a>{" "}
        were born. Our platform now helps power the online presence of companies
        like Washington Post, Porsche, Under Armour and Nintendo.
      </p>

      <h2 className="group font-bold text-xl my-8 relative">
        <span id="tech" className="absolute -top-[20px]" />
        <span className="relative">
          <a
            href="#tech"
            className="invisible group-hover:visible font-normal absolute w-7 -ml-7 text-center text-gray-400 dark:text-gray-500"
          >
            #
          </a>{" "}
          Technical contributions
        </span>
      </h2>

      <ul className="my-5 list-inside list-none">
        <li className="my-2 relative pl-4 before:text-gray-400 before:content-['–'] before:mr-2 before:absolute before:-ml-4">
          I contributed to{" "}
          <a
            href="https://en.wikipedia.org/wiki/MooTools"
            target="_blank"
            className="post-link"
          >
            MooTools
          </a>{" "}
          as part of their core team and led the development of the MooTools
          Forge package repository.
        </li>

        <li className="my-2 relative pl-4 before:text-gray-400 before:content-['–'] before:mr-2 before:absolute before:-ml-4">
          Authored one of the first books on Node.js (
          <a
            href="https://www.amazon.com/Smashing-Node-js-JavaScript-Guillermo-Rauch/dp/1119962595"
            className="post-link"
            target="_blank"
          >
            &ldquo;Smashing Node.js: JavaScript Everywhere&rdquo;
          </a>
          ), after identifying the potential for JS to run on both server and
          client.
        </li>

        <li className="my-2 relative pl-4 before:text-gray-400 before:content-['–'] before:mr-2 before:absolute before:-ml-4">
          My previous startup{" "}
          <a href="https://learnboost.com/" target="_blank">
            LearnBoost
          </a>{" "}
          was one of the earliest adopters of Node.js in production. We made
          critical contributions to projects in the ecosystem like{" "}
          <a
            href="https://expressjs.com/"
            target="_blank"
            className="post-link"
          >
            Express.js
          </a>
          ,{" "}
          <a
            href="https://github.com/senchalabs/connect"
            target="_blank"
            className="post-link"
          >
            Connect
          </a>
          ,{" "}
          <a
            href="https://github.com/dscape/jade"
            target="_blank"
            className="post-link"
          >
            Jade
          </a>
          ,{" "}
          <a
            href="https://stylus-lang.com/"
            target="_blank"
            className="post-link"
          >
            Stylus
          </a>
          , and many others.
        </li>

        <li className="my-2 relative pl-4 before:text-gray-400 before:content-['–'] before:mr-2 before:absolute before:-ml-4">
          Authored{" "}
          <a
            className="post-link"
            href="https://mongoosejs.com/"
            target="_blank"
          >
            Mongoose
          </a>
          , which remains the most popular way of accessing MongoDB data in the
          JavaScript ecosystem.
        </li>

        <li className="my-2 relative pl-4 before:text-gray-400 before:content-['–'] before:mr-2 before:absolute before:-ml-4">
          Authored{" "}
          <a className="post-link" href="https://socket.io" target="_blank">
            Socket.IO
          </a>
          , a popular library for real-time communication. Its underlying{" "}
          <a
            className="post-link"
            href="https://github.com/socketio/engine.io"
            target="_blank"
          >
            engine
          </a>{" "}
          powers Notion&rsquo;s realtime sync and the first Coinbase trading
          product.
        </li>

        <li className="my-2 relative pl-4 before:text-gray-400 before:content-['–'] before:mr-2 before:absolute before:-ml-4">
          Designed and co-authored{" "}
          <a href="https://nextjs.org/" target="_blank" className="post-link">
            Next.js
          </a>
          , the most popular React framework. I later introduced it at the{" "}
          <a
            className="post-link"
            href="https://www.youtube.com/watch?v=MxFfUs6sYnw"
            target="_blank"
          >
            ViennaJS meetup
          </a>{" "}
          and{" "}
          <a
            className="post-link"
            href="https://www.youtube.com/watch?v=evaMpdSiZKk"
            target="_blank"
          >
            React Conf
          </a>
          .
        </li>

        <li className="my-2 relative pl-4 before:text-gray-400 before:content-['–'] before:mr-2 before:absolute before:-ml-4">
          I collaborated with{" "}
          <a className="post-link" href="https://shud.in/" target="_blank">
            Shu Ding
          </a>{" "}
          on the design and conception of{" "}
          <a
            className="post-link"
            href="https://swr.vercel.app/"
            target="_blank"
          >
            SWR
          </a>
          .
        </li>

        <li className="my-2 relative pl-4 before:text-gray-400 before:content-['–'] before:mr-2 before:absolute before:-ml-4">
          Authored a popular filesharing multi-platform application called{" "}
          <a
            className="post-link"
            href="https://techcrunch.com/2013/06/21/cloudup-is-a-fast-dead-simple-way-to-share-and-view-files-on-any-platform-without-the-folders/"
            target="_blank"
          >
            Cloudup
          </a>
          , building on{" "}
          <a className="post-link" href="https://github.com/Automattic/mydb">
            realtime infrastructure for MongoDB
          </a>{" "}
          I authored inspired by Firebase.
        </li>

        <li className="my-2 relative pl-4 before:text-gray-400 before:content-['–'] before:mr-2 before:absolute before:-ml-4">
          Conceived and co-authored a turn-based, multi-player virtual machine
          running a copy of Windows XP{" "}
          <a
            className="post-link"
            href="https://www.dailydot.com/debug/windows-xp-virtual-machine/"
            target="_blank"
          >
            that went viral
          </a>
          , inspired by{" "}
          <a
            href="https://en.wikipedia.org/wiki/Twitch_Plays_Pok%C3%A9mon"
            target="_blank"
            className="post-link"
          >
            Twitch plays Pokemon
          </a>
          .
        </li>

        <li className="my-2 relative pl-4 before:text-gray-400 before:content-['–'] before:mr-2 before:absolute before:-ml-4">
          Authored several other popular, smaller utilities that have
          accumulated billions of downloads, like{" "}
          <a
            href="https://github.com/vercel/ms"
            target="_blank"
            className="post-link"
          >
            ms
          </a>
          ,{" "}
          <a
            href="https://github.com/rauchg/spot"
            target="_blank"
            className="post-link"
          >
            wifi-password
          </a>
          ,{" "}
          <a
            href="https://github.com/rauchg/wifi-password"
            target="_blank"
            className="post-link"
          >
            spot
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/rauchg/slackin"
            target="_blank"
            className="post-link"
          >
            slackin
          </a>
          .
        </li>
      </ul>
    </article>
  );
}
