import P from "../../components/post/paragraph";
import Head from "next/head";
import Header from "../../components/post/header";
import withViews from "../../lib/with-views";
import Link from "next/link";
import Code from "../../components/post/code";
import Snippet from "../../components/post/snippet";
import Figure from "../../components/post/figure";
import { H2 } from "../../components/post/heading";
import UL, { LI } from "../../components/post/bullets-list";
import Post from "../../components/layouts/post";

export default withViews(({ views }) => (
  <Post>
    <Header title="Static Hoisting" date="May 2, 2020" views={views} />
    <Head>
      <meta property="og:title" content="Static Hoisting" />
      <meta property="og:site_name" content="Guillermo Rauch's blog" />
      <meta
        property="og:description"
        content="From static hosting, to static hoisting"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rauchg" />
      <meta
        property="og:image"
        content="https://rauchg.com/og/static-hoisting.png"
      />
    </Head>
    <P>
      Since I published my{" "}
      <Link href="/2020/2019-in-review">
        <a>2019 in Review</a>
      </Link>
      , detailing the industry trend towards{" "}
      <Link href="/2020/2019-in-review#static-is-the-new-dynamic">
        <a>static hosting</a>
      </Link>{" "}
      and the rise of Jamstack CDNs like{" "}
      <Link href="/2020/vercel">
        <a>Vercel</a>
      </Link>
      , a question has persistently come up:{" "}
      <a
        href="https://twitter.com/mjackson/status/1234544556948877312"
        target="_blank"
      >
        how is this different from a server and a traditional CDN on top
      </a>
      ? Why not then just use servers with containers (even serverless ones)?
    </P>

    <P>
      The answer boils down to our ability to not just <b>host</b> static assets
      and cache them, but also <b>hoist</b> them.
    </P>

    <H2 id="intro-hoisting">An Intro to Hoisting</H2>

    <P>
      The word hoisting is used quite frequently in JavaScript to describe how
      the compiler{" "}
      <a
        href="https://developer.mozilla.org/en-US/docs/Glossary/Hoisting"
        target="_blank"
      >
        extracts and "moves" declarations
      </a>{" "}
      to the "top" of a scope, which makes the following code actually work:
    </P>

    <Snippet caption="Calling b() before it was defined works because the declaration was hoisted">
      {`function a () {
  return b()  `}
      <span style={{ color: "#999" }}>// this works with no errors!</span>
      {`
  function b() {
    return "hello world"
  }
}`}
    </Snippet>

    <P>
      The term is also used in{" "}
      <a
        href="http://www.cs.cmu.edu/afs/cs/academic/class/15745-s06/web/handouts/06.pdf"
        target="_blank"
      >
        compiler optimization
      </a>{" "}
      <a
        href="https://compileroptimizations.com/category/hoisting.htm"
        target="_blank"
      >
        lingo
      </a>{" "}
      to describe a class of optimization where the code is analyzed, and parts
      that look{" "}
      <b>
        "static" or invariant are moved (<em>hoisted</em>) outside of loops.
      </b>
    </P>

    <Snippet>
      {`function a (b, c) {
  let sum = []
  for (let i = 0; i < 100000; i++) {
    sum[i] = i + `}
      <b style={{ color: "yellow" }}>(b + c)</b>
      <span style={{ color: "#999" }}>{` // hoist ↗`}</span>
      {`
  }
}
a(314, 159)
`}
    </Snippet>

    <P>
      Notice that the sum <Code>b + c</Code> has nothing to do with the context
      of the loop: it's{" "}
      <a
        href="https://en.wikipedia.org/wiki/Loop-invariant_code_motion"
        target="_blank"
      >
        loop-invariant
      </a>
      . An optimizing compiler can recognize it, and hoist it automatically so
      that the computation behaves{" "}
      <em>as if you had written it outside of the loop yourself</em>.
    </P>

    <H2 id="hoist-to-the-edge">Hoisting to the Edge</H2>

    <P>
      Hoisting computation within a program is great, and odds are the compilers
      and VMs you use every day have plenty of optimizations like it.
    </P>

    <P>
      What Jamstack as a software architecture has now made possible, however,
      is to <b>hoisting the results of computation to the edge</b>, right next
      to where your visitors are.
    </P>

    <P>
      A core tenet of Jamstack has been to{" "}
      <b>pre-render (pre-compute) as much as possible</b>, which has given
      prominence to static site generation. The key idea is that computation
      that would have happened later on, in the request's timeline, has now been
      shifted to the build phase, performed once and made available for all
      users to share.
    </P>

    <div style={{ marginTop: "30px", height: "710px" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          background: "#eee",
          padding: "30px 0 35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="mobile-diagram-wrapper">
          <Diagram />
        </div>
      </div>
    </div>

    <H2 id="edge-frameworks">Edge-aware Frameworks</H2>

    <P>
      Since{" "}
      <a
        href="https://nextjs.org/blog/next-9#automatic-static-optimization"
        target="_blank"
      >
        Next.js 9
      </a>
      , the next build process has started automatically outputting the optimal
      asset on a per-page (entrypoint) basis. Futher, with{" "}
      <a
        href="https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support"
        target="_blank"
      >
        Next.js 9.3
      </a>{" "}
      the hooks for static-site generation were refined, and{" "}
      <a href="https://static-tweet.now.sh/" target="_blank">
        incremental static generation
      </a>{" "}
      was introduced for{" "}
      <a
        href="https://static-tweet.now.sh/#incremental-static-generation"
        target="_blank"
      >
        appending
      </a>{" "}
      (and soon{" "}
      <a
        href="https://github.com/zeit/next.js/discussions/11552"
        target="_blank"
      >
        updating
      </a>
      ) pages.
    </P>

    <P>
      Next.js makes hoisting the static parts of your site or app to the edge a
      breeze. Let's look at the build output of a complex site (
      <a href="https://vercel.com" target="_blank">
        vercel.com
      </a>
      ) as an example:
    </P>

    <Snippet
      smallText
      caption="The outputs of the Next.js build process vary by the data fetching strategy used by the developer"
    >{`$ next build
  Page                                                           Size     First Load JS
  ┌ ○ /                                                          215 B           191 kB
  ├ ○ /about                                                     4.53 kB         171 kB
  ├ λ /api/sso
  ├ ○ /dashboard                                                 228 B           192 kB
  ├ ○ /bitbucket                                                 11 kB           164 kB
  ├ ● /blog                                                      54.6 kB         224 kB
  ├   └ css/a73431369cd0a9ce449f.css                             960 B
  ├ ● /blog/[post]                                               3.54 kB         206 kB
  ├   ├ /blog/environment-variables-ui
  ├   ├ /blog/simpler-pricing
  ├   ├ /blog/canceling-ongoing-deployments
  └   └ [+95 more paths]
λ  (Lambda)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)`}</Snippet>

    <P>
      As you can see from the symbols (○ ● λ), which represent the output types:
    </P>

    <UL>
      <LI>
        We build the homepage statically. Our company's homepage, our "cover
        letter", gets built as <Code>index.html</Code> and pushed to the edge
        for maximum speed and reliability.
      </LI>

      <LI>
        The <Code>/api</Code> functions are exported as serverless (lambda)
        functions. These are created by placing files inside{" "}
        <Code>./pages/api</Code>{" "}
        <a
          target="_blank"
          href="https://nextjs.org/docs/api-routes/introduction"
        >
          (more)
        </a>
        .
      </LI>

      <LI>
        At build time, we create blog posts by querying an API using{" "}
        <a
          href="https://nextjs.org/blog/next-9-3#next-gen-static-site-generation-ssg-support"
          target="_blank"
        >
          Static Site Generation
        </a>{" "}
        hooks. Blog posts, like our homepage, are thus statically hoisted
        (optimized) to the edge network.
      </LI>

      <LI>
        Our{" "}
        <a href="https://vercel.com/dashboard" target="_blank">
          dashboard
        </a>
        , despite being super dynamic in nature, is a static HTML page that
        queries data securely using{" "}
        <a href="https://swr.now.sh" target="_blank">
          React Hooks
        </a>{" "}
        from the client side.
      </LI>
    </UL>

    <H2 id="conclusion">Conclusion</H2>

    <P>
      CDNs are great and have been around for a long time, and so have static
      hosts. However, for the longest time, CDNs have been treating the "origin"
      as an opaque black box.
    </P>

    <P>
      It's now possible, instead, to push content directly <b>to the network</b>{" "}
      and design frameworks that optimize for this capability. As a result, with
      optimizations like <b>static asset hoisting</b>, websites are now becoming
      faster and more reliable than ever before.{" "}
    </P>

    <P>
      To start developing a Jamstack site or app, check out{" "}
      <a href="https://nextjs.org" target="_blank">
        Next.js
      </a>{" "}
      which you can deploy to the{" "}
      <a href="https://vercel.com" target="_blank">
        Vercel
      </a>{" "}
      edge network with a couple clicks.
    </P>

    <style jsx>{`
      @media (max-width: 500px) {
        .mobile-diagram-wrapper {
          width: 641px;
          overflow-x: auto;
          padding: 0 20px;
        }
      }
    `}</style>
  </Post>
));

const DIAGRAM_FONT =
  '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace';

function Diagram(props) {
  return (
    <svg width={827} height={655} {...props}>
      <g fill="none" fillRule="evenodd">
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#000">
          <tspan x={354} y={14}>
            {"User Request"}
          </tspan>
        </text>
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#000">
          <tspan x={362} y={95}>
            {"Edge Server"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={83} y={289}>
            {"Static Hoisting"}
          </tspan>
        </text>
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#000">
          <tspan x={20} y={320}>
            {"Computation done "}
          </tspan>
          <tspan x={173.6} y={320} textDecoration="underline">
            {"ahead-of-time"}
          </tspan>
          <tspan x={20} y={338}>
            {"and always shared by all edges"}
          </tspan>
        </text>
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#000">
          <tspan x={521.1} y={320}>
            {"Computation done "}
          </tspan>
          <tspan x={674.6} y={320} textDecoration="underline">
            {"just-in-time"}
          </tspan>
          <tspan x={489.4} y={338}>
            {"and partially² shared upon cache HIT"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={568} y={289}>
            {"Proxy to a server¹"}
          </tspan>
        </text>
        <text
          transform="rotate(44 482.5 174)"
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={410} y={179}>
            {"Legacy CDN (JIT)"}
          </tspan>
        </text>
        <text
          transform="rotate(-45 338.5 169)"
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={275} y={174}>
            {"Jamstack (AOT)"}
          </tspan>
        </text>
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#6D7278">
          <tspan x={358.3} y={412}>
            {"Performance"}
          </tspan>
        </text>
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#6D7278">
          <tspan x={356.3} y={476}>
            {"Availability"}
          </tspan>
        </text>
        <text fontFamily={DIAGRAM_FONT} fontSize={15} fill="#6D7278">
          <tspan x={392.4} y={540}>
            {"Cost"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={42} y={403}>
            {"\u2713 Optimal performance"}
          </tspan>
          <tspan x={42} y={421}>
            {"\u2713 Faster cache misses"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={42} y={468}>
            {"\u2713 Always online"}
          </tspan>
          <tspan x={42} y={486}>
            {"\u2713 Automatic global failover"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={42} y={531}>
            {"\u2713 Optimally inexpensive"}
          </tspan>
          <tspan x={42} y={549}>
            {"\u2713 Zero maintenance overhead"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={535} y={468}>
            {"\u2A2F Dependent on DevOps / SRE"}
          </tspan>
          <tspan x={535} y={486}>
            {"\u2A2F Expensive HA (multi-AZ)\xB3"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={535} y={531}>
            {"\u2A2F Servers constantly running³⁴"}
          </tspan>
          <tspan x={535} y={549}>
            {"\u2A2F DevOps / Monitoring / SRE"}
          </tspan>
        </text>
        <text
          fontFamily="Menlo-Bold, Menlo"
          fontSize={15}
          fontWeight="bold"
          fill="#000"
        >
          <tspan x={535} y={403}>
            {"\u2A2F Slower cache misses"}
          </tspan>
          <tspan x={535} y={421}>
            {"\u2A2F Impacted by cold boots³"}
          </tspan>
        </text>
        <path
          d="M409 32v24h4l-4.5 9-4.5-9h4V32h1z"
          fill="#000"
          fillRule="nonzero"
        />
        <text fontFamily={DIAGRAM_FONT} fontSize={12} fill="#666">
          <tspan x={2} y={610}>
            {
              "¹ The downsides of this approach apply equally to server-rendering and operating your own static file server"
            }
          </tspan>
          <tspan x={2} y={624}>
            {
              "² Cache hits will be more rare for less-trafficked pages or sites, and will be highly region-dependent "
            }
          </tspan>
          <tspan x={2} y={638}>
            {
              "³ Cold boots can be atenuated by Lambda Provisioning, which drives costs up quite significantly"
            }
          </tspan>
          <tspan x={2} y={652}>
            {
              "⁴ Functions and serverless containers provide natural multi-az, but are subject to higher costs due to [3]"
            }
          </tspan>
        </text>
        <path
          stroke="#979797"
          strokeLinecap="square"
          d="M1.5 371.5h825m-826 68h825m-825 64h825"
        />
        <path
          d="M408.5 120.8l.4.3 118 118 2.8-2.8 3.2 9.6-9.6-3.2 2.8-2.9-118-118-.3-.3.7-.7z"
          fill="#000"
          fillRule="nonzero"
        />
        <path
          d="M408 121.3l.7.7-.3.4-116 117 2.8 2.7-9.6 3.3 3.2-9.6 2.8 2.8 116-117 .4-.3z"
          fill="#000"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
}
