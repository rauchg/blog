import Post from "../../components/layouts/post";
import Quote from "../../components/post/quote";
import P from "../../components/post/paragraph";
import Tweet from "../../components/post/tweet";
import Header from "../../components/post/header";
import Code from "../../components/post/code";
import Snippet from "../../components/post/snippet";
import { H2 } from "../../components/post/heading";
import Figure, { Image } from "../../components/post/figure";
import { Ref, FootNotes, Note } from "../../components/post/footnotes";
import UL, { LI } from "../../components/post/bullets-list";
import withViews from "../../lib/with-views";
import YouTube from "../../components/post/youtube";
import Head from "next/head";

export default withViews(({ views }) => (
  <Post>
    <Header title="2019 in Review" date="January 2, 2020" views={views} />
    <Head>
      <meta property="og:title" content="2019 in Review" />
      <meta property="og:site_name" content="Guillermo Rauch's blog" />
      <meta
        property="og:description"
        content="The evolution of our company, our open-source work, interesting news and lessons in product design and engineering in 2019."
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rauchg" />
      <meta
        property="og:image"
        content="https://user-images.githubusercontent.com/13041/71661903-92614e80-2d47-11ea-9e97-ceee5ad8c720.png"
      />
    </Head>

    <P>
      <em>
        This post is a quick summary of the evolution of{" "}
        <a href="https://zeit.co" target="_blank">
          our company
        </a>
        , our <a href="https://nextjs.org">open-source work</a>, interesting
        news and lessons in product design and engineering throughout 2019.
      </em>
    </P>

    <H2 id="static-is-the-new-dynamic">Static is the new Dynamic</H2>
    <P>
      Throughout 2019 we have continued to see the growth of the{" "}
      <em>JAMstack</em>. The idea is quite simple: Any website or app you{" "}
      <a href="https://nextjs.org">build</a> and{" "}
      <a href="https://zeit.co">deploy</a> will use the stack of client-side{" "}
      <i>J</i>
      avaScript, <i>A</i>PIs, and <i>M</i>arkup.
    </P>
    <P>
      By now, client-side JavaScript (like React and Vue) and APIs (like REST
      and GraphQL) are quite mainstream, but my favorite part is the assumption
      that your markup will be <b>static</b>.
    </P>
    <P>First: Why Static?</P>
    <UL>
      <LI>
        Static is <b>globally fast</b>. When you deploy, we can <em>hoist</em>{" "}
        all your static assets to a global CDN network. By removing the server
        from the equation, we can also maximize availability by reducing and
        even altogether eliminating cache misses.
      </LI>

      <LI>
        Static is <b>consistently fast</b>. It gives you "O(1){" "}
        <a
          href="https://en.wikipedia.org/wiki/Time_to_first_byte"
          target="_blank"
        >
          TTFB
        </a>
        ", which is a fancy way of saying you get stable and predictable latency
        to the first byte of the screen. Always, because no code, servers,
        sockets, or databases are involved.
      </LI>

      <LI>
        Static is <b>always online</b>. This should{" "}
        <a
          href="https://twitter.com/rauchg/status/1210294503216578560"
          target="_blank"
        >
          not be surprising
        </a>
        , but servers frequently go down and{" "}
        <a
          href="https://kccncna19.sched.com/event/Uads/the-gotchas-of-zero-downtime-traffic-w-kubernetes-leigh-capili-weaveworks"
          target="_blank"
        >
          involve complex rollout schemes
        </a>
        <Ref id="1" />, while static files are trivially cacheable and simple to
        serve. The odds of you getting paged during the holidays because a
        "static asset can't be served from a CDN" are basically zero.
      </LI>
    </UL>
    <P>
      Second: Really, Static? I have <em>dynamic</em> needs.
    </P>
    <P>
      Servers are not going away, but they are <em>moving around and hiding</em>
      .
    </P>
    <UL>
      <LI>
        <b>Static Site Generation (SSG)</b> can be thought of moving around the
        servers and taking them away from the hot path. Instead of putting a
        server in between the user's request and the response, we compute the
        response ahead of time.
        <br />
        <br />
        This subtle shift pays back handsomely. One, anything that could go
        wrong, goes wrong at build time, maximizing <b>availability</b>. Two, we
        compute once and re-use, minimizing <b>database or API load</b>. Three,
        the resulting static HTML is <b>fast</b>.
      </LI>

      <LI>
        <b>
          Client-side <em>J</em>S and <em>A</em>PIs
        </b>{" "}
        that get executed later, once the static markup and code is downloaded
        and executed, allow for effectively infinite dynamism.
        <br />
        <br />
        Pre-computing all pages is not always possible
        <Ref id="2" />, nor desirable. For example, when dealing with data that
        is <em>not</em> shared between all users and we wouldn't want to cache
        at the edge
        <Ref id="3" />.
      </LI>
    </UL>
    <H2 id="next-the-next-frontier">Next.js, the next frontier</H2>
    <P>
      Next.js has continued to grow in adoption and now powers the likes of
      Hulu, Tencent News, Twitch, AT&amp;T, Auth0 and the{" "}
      <a href="http://nextjs.org/showcase" target="_blank">
        list goes on
      </a>
      .
    </P>
    <P>
      Thanks to its simplicity, it's a compelling all-in-one solution for the
      full straddle of JAMstack: from a static landing page, to very large
      websites, to fully dynamic applications.
    </P>
    <P>
      The "secret sauce" continues to be its simple <Code>pages/</Code> system
      inspired by <Code>cgi-bin</Code> and throwing <Code>.php</Code> files in a
      FTP webroot.
    </P>
    <P>
      A page is <em>just</em> a React component. The simplest Next.js app is{" "}
      <Code>pages/index.js</Code> which will serve the route <Code>/</Code>:
    </P>
    <Snippet>{`export default () => <div>Hello World</div>`}</Snippet>
    <P>But here's what happened in 2019:</P>
    <UL>
      <LI>
        Pages can be defined like this: <Code>pages/r/[subreddit].js</Code>,
        which will allow you to define dynamic path segments with no
        configuration or custom servers.
      </LI>

      <LI>
        If a given page is static and has no{" "}
        <a
          href="https://nextjs.org/blog/next-9#automatic-static-optimization"
          target="_blank"
        >
          server-side data props
        </a>
        , <Code>next build</Code> will output just "boring" static{" "}
        <Code>.html</Code> 😄
      </LI>

      <LI>
        If you define{" "}
        <a href="https://github.com/zeit/next.js/issues/9524" target="_blank">
          static data props
        </a>
        , we can fetch data at build time for a certain page, but crucially also
        "explode" dynamic path segments into many discrete pages.
      </LI>

      <LI>
        If you create <Code>pages/api/myApi.js</Code>, you are basically
        defining a{" "}
        <a href="https://nextjs.org/blog/next-9#api-routes" target="_blank">
          serverless function
        </a>{" "}
        that can return anything you want, which will most likely be a JSON API.
      </LI>
    </UL>
    <P>
      In short, Next.js is now a comprehensive, hybrid framework, supporting the
      full spectrum of JAMstack with a <em>per-page granularity</em>.
    </P>
    <table>
      <thead>
        <tr>
          <th>Role</th>
          <th>Provided by</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>J</td>
          <td>
            Client-side JS injected via React Hooks (state, event listeners,
            effects)
          </td>
        </tr>

        <tr>
          <td>A</td>
          <td>
            API pages inside the <Code>pages/api</Code> directory.
          </td>
        </tr>

        <tr>
          <td>M</td>
          <td>
            Pages with no data dependencies (like the simple example above) or
            pages with static data deps that trigger build-time static site
            generation.
          </td>
        </tr>
      </tbody>
    </table>
    <P>
      Furthermore, Next.js has been <em>uncompromising</em> in its commitment to
      backwards-compatibility. Servers (SSR) are still fully supported and no
      apps have been harmed as part of this evolution.
    </P>
    <H2 id="deploying-jamstack">Deploying the JAMstack</H2>
    <P>
      We think there's enormous value in empowering teams to instantly build and
      deploy JAMstack websites, with no servers or infra to manage or configure.
    </P>
    <P>
      True to our style, deploying any static site (like just a{" "}
      <Code>index.html</Code>) or more complex and full-featured frameworks like
      Next.js, Gatsby, Gridsome, … begins with just:
    </P>
    <Snippet
      caption={
        <>
          Use <code>npm i -g now</code> to install
        </>
      }
    >
      {`$  now`} {"\n"}✅ Preview:{" "}
      {
        <a
          style={{ color: "#fff" }}
          href="https://blog-p2pe8jedz.now.sh"
          target="_blank"
        >
          https://blog-p2pe8jedz.now.sh
        </a>
      }
    </Snippet>
    <P>
      The <a href="https://zeit.co">ZEIT Now</a> platform gives you a
      comprehensive workflow with built-in CI/CD and global CDN, that are
      carefully optimized for production-grade dynamic sites.
    </P>
    <P>
      A salient feature is the transition we are seeing{" "}
      <b>
        away from code <em>review</em>
      </b>{" "}
      into{" "}
      <b>
        deployment <em>preview</em>
      </b>
      .
    </P>
    <P>
      Code review is undeniably important (specially{" "}
      <a
        href="https://google.github.io/eng-practices/review/reviewer/speed.html"
        target="_blank"
      >
        speedy code review
      </a>
      ), but nothing beats teams collaborating by sharing URLs to the{" "}
      <em>actual</em> sites that are being worked on and experiencing them
      directly.
    </P>
    <P>
      By setting up a{" "}
      <a href="https://zeit.co/github" target="_blank">
        Git integration
      </a>
      , every single <Code>git push</Code> gets its own live deployment URL.
      Thanks to the simplifications granted by the model, deployments are orders
      of magnitude faster to build, deploy and serve than when using servers or
      containers, which only adds to the great team-wide collaboration
      experience.
    </P>

    <Figure
      width={1491}
      height={465}
      desc="Every push and branch gets its own deploy URL"
    >
      <Image src="https://user-images.githubusercontent.com/13041/71661231-7bb9f800-2d45-11ea-8aab-e030bcd16012.png" />
    </Figure>

    <H2 id="testing-the-jamstack">The Deploy URL, the Center of Gravity</H2>
    <P>
      An interesting consequence of being able to deploy so fast and so
      frequently is that it completely changes{" "}
      <b>testing and quality assurance</b>.
    </P>
    <P>
      Every URL like{" "}
      <Code>
        <a href="https://blog-p2pe8jedz.now.sh" target="_blank">
          https://blog-p2pe8jedz.now.sh
        </a>
      </Code>
      , a preview deployment of this blog as I was writing this post, is a{" "}
      <b>real, production-like environment</b> just like the{" "}
      <Code>rauchg.com</Code> one.
    </P>
    <P>
      This means that instead of running tests that make all kinds of
      assumptions about the environment (like mocking it), we can instead test
      the <em>real thing</em>. As real as it gets.
    </P>
    <Tweet
      id="1166443719148466177"
      caption={
        <>
          A new spin on{" "}
          <a
            href="https://twitter.com/rauchg/status/807626710350839808?lang=en"
            target="_blank"
          >
            an old classic
          </a>
        </>
      }
    />
    <P>
      The most natural form of "e2e testing" is experiencing the end result
      itself by visiting the URL. Sharing it with customers, co-workers and your
      manager.
    </P>
    <P>
      But in 2019, we also witnessed the incredible power of delegating
      automated testing against this URL to other services.
    </P>

    <Figure
      width={1274}
      height={1256}
      desc="The URL as the center of the app-building universe"
    >
      <Image src="https://user-images.githubusercontent.com/13041/71646947-a3c63e80-2ce6-11ea-957c-c8f0f15ff176.png" />
    </Figure>

    <P>
      When you install our{" "}
      <a href="https://zeit.co/github" target="_blank">
        GitHub app
      </a>
      , we don't just register a "Check" like other CI providers in the pull
      request. We also say:{" "}
      <em>
        this is a <b>deployment</b>, here is the URL
      </em>
      .
    </P>
    <P>
      In <em>parallel</em>, a series of assurance checks can then be run against
      that prod-ready URL. This includes, but is not limited to:
    </P>
    <UL>
      <LI>
        <b>Browser Testing</b>, simulating user journeys and real interactions
      </LI>
      <LI>
        <b>Screenshot Testing</b>, to automatically prevent visual regressions
      </LI>
      <LI>
        <b>HTTP Assertion Testing</b>, requesting APIs or pages and verifying
        the outputs
      </LI>
      <LI>
        <b>Manual QA</b>, with designated reviewers who approve the PR.
      </LI>
    </UL>

    <Figure
      width={1162}
      height={876}
      desc="Checks are automatically run against the deploy URL"
    >
      <Image src="https://user-images.githubusercontent.com/13041/71647154-46cc8780-2cea-11ea-8fe6-b9380c0c918b.png" />
    </Figure>

    <H2 id="flaky-tests-flaky-ux">Flaky Tests mean Flaky UX</H2>
    <P>
      When it comes to testing, I've found myself referencing this insight quite
      frequently:
    </P>
    <Tweet id="1158730494311198720" />
    <P>
      As developers, we might sometimes be too quick to place the blame on tools
      (or the{" "}
      <a
        href="https://en.wikipedia.org/wiki/Aether_(classical_element)"
        target="_blank"
      >
        aether
      </a>
      ) and just press the restart button.
    </P>
    <P>
      But the truly important question to ask is: what if it had been one of
      your customers, instead of an automated test? Would they not have had a{" "}
      <em>flaky</em> experience? Would it be ok to tell them to press F5 and try
      again?
    </P>
    <H2 id="serverless-upgrades-itself">
      Serverless means infrastructure that upgrades itself
    </H2>
    <P>
      Serverless is an exciting trend that has resisted a universal definition.
      Asking what serverless <em>really</em> means probably got you 5 different
      answers in 2018, and 10 different answers in 2019.
    </P>
    <P>
      However, a defining characteristic that I've become a fan of is that
      serverless means your <b>infrastructure upgrades itself</b>.
    </P>
    <Tweet id="1095927783421706240" />
    <P>
      This includes everything from upgrading the operating system, to patching
      the system's OpenSSL, to bumping the version of the Node.js function
      runtime.
    </P>
    <P>
      This wonderful effect is particularly pronounced for databases. It's one
      thing to upgrade the infrastructure of <em>stateless</em> code execution,
      but dealing with data is a whole new challenge that I'm glad we no longer
      have to deal with
      <Ref id="4" />.
    </P>
    <Tweet id="1195443929828577280" />
    <H2 id="hyrums-law">Hyrum's Law</H2>
    <P>
      I recently learned about{" "}
      <a href="https://www.hyrumslaw.com/" target="_blank">
        Hyrum's Law
      </a>
      , which states:
    </P>
    <Quote>
      With a sufficient number of users of an API, it does not matter what you
      promise in the contract: all observable behaviors of your system will be
      depended on by somebody.
    </Quote>
    <P>
      Which obviously has a <em>relevant xkcd</em> as prior art:
    </P>
    <Figure width={278} height={386} desc="There is always an xkcd for that">
      <Image src="https://imgs.xkcd.com/comics/workflow.png" />
    </Figure>
    <H2 id="microservices-complex-unavailable">
      Microservices increase complexity and reduce availability
    </H2>
    <P>
      Microservices allow you to break down a service's dependencies into
      independently deployable units.
    </P>
    <P>
      The problem? The assurances that were previously statically guaranteed by
      the compiler or runtime for a given piece of software are now gone. What
      was before a unit becomes a distributed system.
    </P>
    <Tweet id="1150939681153929216" />
    <P>
      Not only are microservices harder to <em>manage</em> than, say, a static
      blob of code together with its dependencies inside a function or
      container, but odds are they are also <b>less available</b>.
    </P>
    <P>
      This should already be obvious from at least one angle: introducing an{" "}
      <em>additional</em> network hop can only make things worse.
    </P>
    <P>
      Kevin Mahoney has provided a new{" "}
      <a href="http://kevinmahoney.co.uk/articles/microservices-and-availability/">
        neat mathematical illustration
      </a>{" "}
      of the availability problem of inter-connecting services:
    </P>
    <Quote>
      Take the example where service C depends on services A and B[…]
      <br />
      <br />
      If A has an availability of 0.8 (80%) and B 0.95 (95%), C will have a best
      case of 0.8 (80%), an average case of 0.8 × 0.95 = 0.76 (76%), and a worst
      case of 1 - ((1 - 0.8) + (1 - 0.95)) = 0.75 (75%)
    </Quote>
    <P>
      Making your serverless functions "monolithic" offers a compelling solution
      to this problem. Statically bind the dependencies of each function (
      <a href="https://nextjs.org/blog/next-9#api-routes">Next.js API routes</a>{" "}
      and the Go compiler do this) and avoid introducing unneeded service hops
      of your own.
    </P>
    <H2 id="native-means-platform-fidelity">
      Native means Platform Fidelity, not Native Code
    </H2>
    <P>
      The word "native" has always bothered me. No one can seem to agree on a
      definition, but we all agree that "native apps" are always optimal.
    </P>
    <P>
      Many people are quick to write off attempting to write a desktop app or
      mobile app in JavaScript on the basis that it's <em>not native</em>.
      Sometimes the word is used to indicate that JS can't compile down to an
      executable binary that's native to the platform.
    </P>
    <P>
      I propose the following alternative definition of native:{" "}
      <b>
        an app that behaves to the quality standards of the platform it's
        deployed to
      </b>
      .
    </P>
    <P>
      This explains why Electron has been so successful in re-purporsing the web
      stack to the Desktop platform.{" "}
      <a
        href="https://www.zdnet.com/article/slacks-desktop-client-gets-major-performance-improvements-after-codebase-rewrite/"
        target="_blank"
      >
        A well engineered Electron app
      </a>{" "}
      will give you "native" platform fidelity, regardless of programming
      language.
    </P>
    <P>
      To achieve platform fidelity, it's obvious one must have access to the
      platform APIs. This makes <b>mobile web "apps"</b> a <em>non-starter</em>{" "}
      in achieving the coveted "native" status, especially on iOS Safari.
    </P>
    <P>
      {" "}
      It has nothing to do with performance or JS and HTML, and everything to do
      with being altogether unable to deliver on the standards of what a{" "}
      <em>real</em> app can do on the platform
      <Ref id="5" />.
    </P>
    <Tweet
      id="1199843171431256066"
      caption="Native performance with JS + native code"
    />
    <P>
      This means it's only a matter of time before React Native (and{" "}
      <a href="https://github.com/Tencent/Hippy" target="_blank">
        similar technologies
      </a>
      ) replicate the success that Electron has had on desktop.
    </P>
    <P>
      A React Native app can achieve full platform fidelity (it can exhibit
      great performance with{" "}
      <a
        href="https://blog.discordapp.com/how-discord-achieves-native-ios-performance-with-react-native-390c84dcd502"
        target="_blank"
      >
        solid engineering
      </a>{" "}
      while being unconstrained in API capabilities). Crucially, like Electron,
      it offers a cohesive development experience, a universal programming
      language, a shared module and component system, seamless updates and
      faster deployments, with both <s>macOS</s> iOS and{" "}
      <s>
        <a
          href="https://www.theverge.com/2019/6/24/18715202/microsoft-bill-gates-android-biggest-mistake-interview"
          target="_blank"
        >
          Windows
        </a>
      </s>{" "}
      Android support to boot.
    </P>
    <Tweet
      id="1105876480930734086"
      caption="While SwiftUI is certainly exciting, RN, like Electron, has a tremendous economic advantage"
    />
    <H2 id="settings-are-for-successful-products">
      Settings are for successful products
    </H2>
    <P>
      Great products usually start with a dead simple onboarding journey that
      minimizes or entirely eliminates options.
    </P>
    <Tweet id="1172978856883417088" />
    <P>
      From a startup evolution or product management perspective, another way of
      considering this wisdom is: absolutely resist adding options until{" "}
      <b>substantial evidence of success without them</b> exists.
    </P>
    <H2 id="game-engineering-inspiration">
      Game engineering continues to show the way
    </H2>
    <P>
      When React was{" "}
      <a href="http://codewinds.com/podcast/004.html" target="_blank">
        being introduced
      </a>
      , it was interesting to hear that the inspiration wasn't previous
      libraries like jQuery, but rather an altogether different system:
    </P>
    <Quote>
      React gets some of its inspiration from how game engines achieve awesome
      performance in their rendering pipeline
    </Quote>
    <P>
      What striked me about this wonderful talk about how{" "}
      <a href="https://www.youtube.com/watch?v=KDhKyIZd3O8" target="_blank">
        Marvel's Spiderman
      </a>{" "}
      was created is how much more we can learn.
    </P>
    <Figure
      width={1206}
      height={678}
      desc="Insomniac Games' Elan Ruskin on Spider Man's various technical accomplishments"
    >
      <YouTube videoId="KDhKyIZd3O8" />
    </Figure>
    <P>
      The most striking part of it is the careful planning around the
      well-understood limits of the platform that lead to a great user
      experience.
    </P>
    <P>
      Today, at large, this kind of rigor is absent from web engineering
      practice, even though the boundaries exist and are well documented.
    </P>
    <Tweet
      id="935857414435495937"
      caption="Developers understand these figures. How about our tools and platforms?"
    />
    <P>
      So far, we have mostly been <em>suggested</em> limits. Examples include:
      warnings in webpack's colorful output for oversized bundles, scoring
      systems like WebPageTest and Lighthouse, and the constant reminder and
      enticement that more speed means more success for your business (in the
      form of better Google rankings and the{" "}
      <a
        href="https://www.gigaspaces.com/blog/amazon-found-every-100ms-of-latency-cost-them-1-in-sales/"
        target="_blank"
      >
        Amazon 100ms rule
      </a>
      ).
    </P>
    <P>
      AMP, although controversial, is a <em>systematic</em>, rather than{" "}
      <em>suggested</em> answer to the performance problem. It's very hard,
      maybe impossible, to create a slow AMP experience, due to the smart
      constraints and built-in well-optimized components
      <Ref id="6" />.
    </P>
    <P>
      Along the same lines, I'm optimistic about the introduction of{" "}
      <a
        href="https://www.infoq.com/news/2019/02/chrome-never-slow-mode/"
        target="_blank"
      >
        <b>Never-Slow Mode</b>
      </a>
      , which is a more general solution than AMP, with a shared focus on
      performance. Like{" "}
      <a href="https://nextjs.org/blog/next-8-1#amp-in-nextjs" target="_blank">
        AMP on Next.js
      </a>
      , I reckon it will be a <em>mode</em> many will be interested in adopting.
    </P>
    <H2 id="notion-is-fancy">
      Notion: the <em>fanciest</em> datastructure
    </H2>
    <P>
      When{" "}
      <a
        href="https://www.joelonsoftware.com/2012/01/06/how-trello-is-different/"
        target="_blank"
      >
        announcing Trello
      </a>
      , Joel Spolsky famously conjectured:
    </P>
    <Quote>
      <b>
        The great horizontal killer applications are actually just fancy data
        structures.
      </b>
      <br />
      <br />
      Spreadsheets are not just tools for doing “what-if” analysis. They provide
      a specific data structure: a table. Most Excel users never enter a
      formula. They use Excel when they need a table. The gridlines are the most
      important feature of Excel, not recalc.
    </Quote>
    <P>
      In 2019, I fell in love with{" "}
      <a href="https://www.notion.so/" target="_blank">
        Notion
      </a>
      , which you can think of an all-in-one company/personal wiki + full MS
      Office-like suite.
    </P>
    <P>
      That you could have <em>one tool</em> to solve such a wide array of
      problems sounds impossible, let alone for a small startup. But the secret
      to its success lies in its elegant, flexible and <b>user-transparent</b>{" "}
      datastructure.
    </P>
    <P>
      Notion's datastructure could be explained as: a mutable, realtime graph of
      documents structured as a list of known blocks.
    </P>
    <P>
      All apps are backed by datastructures, but the critical ingredient seems
      to be the ability to perform{" "}
      <a
        href="https://www.nngroup.com/articles/direct-manipulation/"
        target="_blank"
      >
        direct manipulation
      </a>{" "}
      on them, which requires that the{" "}
      <b>topology is completely transparent and obvious to the end user</b>.
    </P>
    <Figure
      width={1419}
      height={808}
      desc="The Notion UI. Every UI element is mutable and hyperlinkable"
    >
      <Image src="https://user-images.githubusercontent.com/13041/71637284-d0228200-2c36-11ea-8042-a26d9c3c4954.png" />
    </Figure>
    <P>
      On the left hand side, Notion's sidebar puts you in direct contact with
      the graph the documents are organized as. You are free to arrange pages
      into trees and sub-trees of your choosing. On the right hand side, the
      different block types are trivial to create, edit, re-arrange and most
      importantly: <b>combine</b>.
    </P>
    <P>
      In the old world, a table is not thought of as a <em>block</em>, but a
      document that you boot Excel or Google Spreadsheets to visualize. Instead,
      combining headings, paragraphs, tables, databases, lists, etc to your
      liking inside any document, which you link to and open with the same
      realtime collaborative app, strikes me as a revolution whose time has
      finally come.
    </P>
    <H2 id="inputs-should-look-like-inputs">
      Breaking: inputs should look like inputs
    </H2>
    <P>
      This one should not come as much of a shocker, but{" "}
      <a
        href="https://twitter.com/paulg/status/1209874543713640448"
        target="_blank"
      >
        alas
      </a>
      .
    </P>
    <Tweet id="1191438907696656384" caption={<>But Google does it!</>} />
    <P>
      It{" "}
      <a href="https://twitter.com/mrcoreysimons/status/1191547435513864192?s=21">
        only took
      </a>{" "}
      600 participants, 2 designers, 1 researcher to confirm:{" "}
      <b>inputs should look like inputs</b>.
    </P>
    <Figure
      width={1252}
      height={882}
      desc="Some revenue-centric folks have known the ideal input design forever"
    >
      <Image src="https://user-images.githubusercontent.com/13041/71637360-488a4280-2c39-11ea-906a-24f9d8b9a7aa.png" />
    </Figure>
    <H2 id="shared-cdns-caches-are-busted">
      Shared CDNs have their caches busted
    </H2>
    <P>
      A remarkable change to anyone who was hoping we could "share React" or
      "share jQuery" by an ad-hoc agreement of a common CDN and URL inside a{" "}
      <Code>&lt;script&gt;</Code> tag.
    </P>
    <P>
      The whole idea has{" "}
      <a
        href="https://www.jefftk.com/p/shared-cache-is-going-away"
        target="_blank"
      >
        been busted
      </a>
      .
    </P>

    <H2 id="all-code-is-wrong">All Code is Wrong</H2>

    <P>
      Another year, another great opportunity to remember that most of your code
      is likely wrong. We got to hear this from the famed creator of Fornite:
    </P>

    <Tweet
      id="1190383627340783618"
      caption="Writing great, correct, fast and reliable code is very hard. Assume it's all wrong."
    />

    <P>
      As a reminder,{" "}
      <b>
        <a
          target="_blank"
          href="https://twitter.com/garybernhardt/status/1007699924866093056"
        >
          if it's not fast and reliable, then it is wrong
        </a>
      </b>
      . When things are not fast, it's like an implicit confirmation that they
      are wrong. Deeply wrong:
    </P>

    <Quote
      by={
        <>
          Craig Mod on{" "}
          <a href="https://craigmod.com/essays/fast_software/" target="_blank">
            Fast software, the Best software
          </a>
        </>
      }
    >
      […] The slowness is like an off smell. I don’t trust the application as
      much as I would if it didn’t slow down on such a small text file. 5,000
      words is nothing. Faith is tested: It makes me wonder how good the sync
      capabilities are. It makes me wonder if the application will lose data.
      <br />
      <br />
      Speed and reliability are often intuited hand-in-hand. Speed can be a good
      proxy for general engineering quality
    </Quote>

    <H2 id="get-busy-demoing">Get busy demoing</H2>

    <P>
      I continue to marvel at the incredible product-improving and
      life-improving power of giving demos frequently. Giving frequent demos was
      an essential part of creating the iPhone:
    </P>

    <Tweet
      id="1163871715153199104"
      caption={
        <>
          Don't be afraid to <s>fail</s> demo.
        </>
      }
    />

    <H2 id="nocode-lowcode-merge">
      NoCode and LowCode are real, and they are on a collision course
    </H2>

    <P>
      It's easy to dismiss the hype around NoCode and LowCode as just hype, but
      I think there's a lot to it.
    </P>

    <P>
      For one: the less code you write, the easier to maintain, and{" "}
      <a href="#testing-the-jamstack">the less likely</a> that{" "}
      <a href="#all-code-is-wrong">it will be wrong</a>. Next.js is a clear
      example of this. Our data-fetching
      <Ref id="7" /> library{" "}
      <a href="https://swr.now.sh/" target="_blank">
        SWR
      </a>{" "}
      is another.{" "}
      <a href="https://zeit.co/blog/zero-config" target="_blank">
        Zero-config deployments
      </a>
      , another.
    </P>

    <Tweet id="1191828261501853696" />

    <P>
      I suspect 2020 and the years to come will see LowCode solutions (like
      React, Vue,{" "}
      <a href="https://svelte.dev/" target="_blank">
        Svelte
      </a>
      …) continue to gain traction by making it simple and{" "}
      <a
        href="https://twitter.com/mweststrate/status/1055532227939966976?lang=en"
        target="_blank"
      >
        succinct
      </a>{" "}
      to share UI and behavior (e.g.: as UI <em>components</em> or{" "}
      <em>
        <a href="https://reactjs.org/docs/hooks-intro.html" target="_blank">
          hooks
        </a>
      </em>
      ).
    </P>

    <P>
      We will also{" "}
      <a href="https://divjoy.com/" target="_blank">
        see
      </a>{" "}
      the{" "}
      <a href="https://www.framer.com/development" target="_blank">
        rise
      </a>{" "}
      of{" "}
      <a href="https://blocks-ui.com/" target="_blank">
        visual
      </a>{" "}
      <a href="https://builderx.io/" target="_blank">
        tools
      </a>{" "}
      to{" "}
      <a href="https://codesandbox.io/" target="_blank">
        bring
      </a>{" "}
      <a href="https://shift.studio/" target="_blank">
        those
      </a>{" "}
      <a href="https://www.modulz.app/" target="_blank">
        primitives
      </a>{" "}
      <a href="https://tinacms.org/" target="_blank">
        together
      </a>{" "}
      more{" "}
      <a href="https://teleporthq.io/" target="_blank">
        efficiently
      </a>
      , including the capability to bring reusable components from either a
      canonical component system or a global shared library.
    </P>

    <H2 id="hw-merges-with-sw">More Hardware that merges with our Software</H2>

    <P>
      After ARM gave us a{" "}
      <a
        href="https://twitter.com/gparker/status/1047246359261106176"
        target="_blank"
      >
        JS-optimized instruction
      </a>
      , Samsung is{" "}
      <a
        href="https://www.anandtech.com/show/14839/samsung-announces-standardscompliant-keyvalue-ssd-prototype"
        target="_blank"
      >
        giving us key-value optimized SSDs
      </a>
      .
    </P>

    <H2 id="roll-everything-like-code">
      Everything is code. Roll everything like code
    </H2>

    <P>
      Applying a configuration change? Review it, roll it gradually and most
      importantly: mistrust it, just like{" "}
      <a href="#all-code-is-wrong">you mistrust code</a>.
    </P>

    <Tweet id="1146230484541722624" />

    <H2 id="wasm-fast">Webassembly is faster than you thought</H2>

    <P>
      For a while I've been excited about the <b>universal</b> potential of
      webassembly. It turns out it's even better than I anticipated: when
      disabling sandboxing, webassembly can{" "}
      <a href="https://innative.dev/news/introducing-innative/">
        match 95% the speed of native code
      </a>
    </P>

    <Quote>
      WebAssembly isn’t just a way to run C++ in a web browser, it’s a chance to
      reinvent how we write programs, and build a radical new foundation for
      software development
    </Quote>

    <H2 id="quic-is-fast">QUIC (HTTP/3) is faster than you thought</H2>

    <P>
      Uber{" "}
      <a href="https://eng.uber.com/employing-quic-protocol/" target="_blank">
        deployed QUIC at scale
      </a>
      , obtaining remarkable results.
    </P>

    <Quote>
      The results from this experiment showed that QUIC consistently and very
      significantly outperformed TCP in terms of latency when downloading the
      HTTPS responses on the devices. Specifically, we witnessed a 50 percent
      reduction in latencies across the board, from the 50th percentile to 99th
      percentile.
    </Quote>

    <Figure
      width={971}
      height={342}
      desc="Percentage improvements in tail-end latencies (95th and 99th percentile)"
    >
      <Image src="https://user-images.githubusercontent.com/13041/71637892-31068600-2c48-11ea-8810-461f9295228f.png" />
    </Figure>

    <H2 id="stablecoins-not-bitcoin">
      We are interested in stablecoins not bitcoin…
    </H2>

    <P>
      … seems to be the new "we like{" "}
      <a
        target="_blank"
        href="https://www.coindesk.com/love-blockchain-just-bitcoin"
      >
        blockchain not bitcoin
      </a>
      ".
    </P>

    <P>
      The president of the European Central Bank said the word "stablecoin" in
      2019. That was a twist I wasn't expecting.
    </P>

    <Tweet id="1205225680453210112" />

    <H2 id="zoom-works-better">Zoom just works better</H2>

    <P>
      <a
        href="https://www.businessinsider.com/zoom-files-to-go-public-2019-3"
        target="_blank"
      >
        Zoom went public
      </a>
      . Its differentiator? <b>It works better</b>.
    </P>

    <Tweet id="1109207974994735104" />

    <H2 id="google-oss-pratices">
      Google's engineering practices go open-source
    </H2>

    <P>
      Google's engineering practices were{" "}
      <a target="_blank" href="https://github.com/google/eng-practices">
        open-sourced on GitHub
      </a>
      . My favorite part? The emphasis on{" "}
      <a
        href="https://google.github.io/eng-practices/review/reviewer/speed.html"
        target="_blank"
      >
        speedy code-review
      </a>
      :
    </P>

    <Quote>
      <b>
        At Google, we optimize for the speed at which a team of developers can
        produce a product together
      </b>
      , as opposed to optimizing for the speed at which an individual developer
      can write code. The speed of individual development is important, it’s
      just not as important as the velocity of the entire team.
    </Quote>

    <P>
      Further, Google's cryptography practices were "open-sourced" in a tweet:
    </P>

    <Tweet id="1112377964942028805" />

    <H2 id="aws-reliability-patterns">
      AWS shares how they build ultra-reliable services
    </H2>

    <P>
      AWS architect Colm MacCárthaigh shares 10 patterns for controlling the
      cloud and ensuring its reliability:
    </P>

    <Tweet
      id="1071084058841559041"
      caption="If you don't fancy watching the video, read the tweet storm"
    />

    <style jsx>{`
      table {
        border-collapse: collapse;
      }

      table td,
      table th {
        border: 1px solid #ededed;
        padding: 10px;
        font-size: 14px;
      }

      table td:first-child {
        text-align: center;
        font-weight: bold;
      }

      table th {
        text-align: left;
        font-size: 12px;
        text-transform: uppercase;
      }
    `}</style>
    <FootNotes>
      <Note id="1">
        Servers can be so hard to roll out without downtime that a keynote at
        this year's KubeCon starts with the glaring admission:{" "}
        <b>"Noticing your customers receive 503's every now-and-then?"</b>. By
        not needing to rotate pods, shut down containers, handle signals, wait
        for grace periods, configure and execute liveliness probes… static is
        also <b>faster and safer to roll</b>.
      </Note>

      <Note id="2">
        When the set of pages to pre-compute is too large and would make build
        times prohibitive, it's still probably a good idea to pre-compute your
        most critical public pages, and do the rest <em>asynchronously</em>.
      </Note>

      <Note id="3">
        Crucially, websites and apps that serve the same static markup and code
        to all users have a drastically simpler security model, which means…
        static is also <b>more secure</b>.
      </Note>

      <Note id="4">
        Our infrastructure makes use of CosmosDB, a serverless database by
        Microsoft Azure with remarkably (consistent) low-latency and effectively
        infinite horizontal scalability.
      </Note>

      <Note id="5">
        Perhaps the most fundamental way in which a mobile web app on iOS Safari
        cannot ever be "native" like an app is in the way the viewport size is
        dynamic and shifts as you scroll to reveal different toolbars.
      </Note>

      <Note id="6">
        Speaking of <a href="#native-means-platform-fidelity">native</a>, I
        intuit that, rather than native code generation, native mobile apps owe
        their generally better performance to the a rich standard library of
        well-optimized UI components. Go, when compared to Node.js+npm, has
        similarly demonstrated the success of a great stdlib for common,
        performance-critical needs.
      </Note>

      <Note id="7">
        What you do in{" "}
        <a href="https://swr.now.sh/#basic-data-loading" target="_blank">
          one line of SWR
        </a>
        , you tend to do in a few dozen lines of Redux.
      </Note>
    </FootNotes>
  </Post>
));
