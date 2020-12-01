import P from "../../components/post/paragraph";
import Head from "next/head";
import Header from "../../components/post/header";
import Tweet from "../../components/post/tweet";
import Link from "next/link";
import Code from "../../components/post/code";
import Quote from "../../components/post/quote";
import Figure, { Image } from "../../components/post/figure";
import { H2 } from "../../components/post/heading";
import UL, { LI } from "../../components/post/bullets-list";
import Post from "../../components/layouts/post";
import withViews from "../../lib/with-views";
import getTweets from "../../lib/get-tweets";

export async function getStaticProps() {
  const tweets = await getTweets(Page);
  return { props: { tweets } };
}

const Page = withViews(({ tweets, views }) => (
  <Post tweets={tweets}>
    <Header title="Develop, Preview, Test" date="June 11, 2020" views={views} />
    <Head>
      <meta property="og:title" content="Develop, Preview, Test" />
      <meta property="og:site_name" content="Guillermo Rauch's blog" />
      <meta
        property="og:description"
        content="The rise of deploy previews and serverless testing infrastructure is revolutionizing the way we test web projects."
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rauchg" />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/rauchg/image/upload/v1591890273/blog/og/4C8D37F4-9C56-4251-894B-F48EF289C798_fxqt6c.png"
      />
    </Head>
    <P>
      A few years ago I tweeted a simple guideline that{" "}
      <a
        target="_blank"
        href="https://twitter.com/swyx/status/1261202288476971008"
      >
        challenged conventional wisdom
      </a>{" "}
      and became the norm for many people learning{" "}
      <a target="_blank" href="https://kentcdodds.com/blog/write-tests">
        how to test their frontends
      </a>{" "}
      effectively.
    </P>

    <Tweet id="807626710350839808" />

    <P>
      Writing tests is an <b>investment</b>, and like any other investment, it
      has to be evaluated in terms of its <b>return</b> and <b>risks</b> (e.g.:{" "}
      <a href="https://en.wikipedia.org/wiki/Opportunity_cost" target="_blank">
        opportunity costs
      </a>
      ) it incurs in.
    </P>

    <P>
      The "not too many" keys in on that. There is, after all, too much of a
      good thing when it comes to spending time writing tests instead of
      features. We can see an application of this insight also to availability
      by{" "}
      <a
        href="https://landing.google.com/sre/sre-book/chapters/embracing-risk/"
        target="_blank"
      >
        Google's popular SRE book
      </a>
      :
    </P>

    <Quote>
      You might expect Google to try to build 100% reliable services—ones that
      never fail. It turns out that past a certain point, however, increasing
      reliability is worse for a service (and its users) rather than better!
      Extreme reliability comes at a cost: maximizing stability limits how fast
      new features can be developed and how quickly products can be delivered to
      users, and dramatically increases their cost, which in turn reduces the
      numbers of features a team can afford to offer
    </Quote>

    <P>
      In this essay I want to make the case that{" "}
      <b>prioritizing end-to-end (E2E) testing</b> for the critical parts of
      your app will reduce risk and give you the best return. Further, I'll show
      how you can adopt this methodology in mere minutes.
    </P>

    <H2 id="why">Why end-to-end?</H2>

    <P>
      In addition to integration tests, I want to now make the case that modern
      deployment workflows in combination with serverless testing solutions can
      now fully revert the conventional testing pyramid:
    </P>

    <Figure
      width={1000}
      height={450}
      desc={
        <>
          Martin Fowler's conventional{" "}
          <a
            href="https://martinfowler.com/articles/practical-test-pyramid.html#TheTestPyramid"
            target="_blank"
          >
            testing pyramid
          </a>
          . What if 🐢 and 💲 went away?
        </>
      }
    >
      <Image
        src="https://res.cloudinary.com/rauchg/image/upload/c_fill,h_450,w_1000/v1590871850/blog/2020/develop-preview-test/1A0185D9-E8F1-4A55-B3D0-3C8D526CE710_zrgpuv.png"
        width={1000}
        height={450}
      />
    </Figure>

    <P>
      As it turns out,{" "}
      <a
        href="https://blog.aboutamazon.com/company-news/2016-letter-to-shareholders"
        target="_blank"
      >
        focusing on the customer first
      </a>{" "}
      is the best way to run a business, but also the best way to ascertain
      software quality.
    </P>

    <P>
      You might be using the fanciest new compiler, the newest type system, but
      won't do well if, after you ship, your site doesn't load in Chrome at all
      because you forgot to send the right HTTP headers for your{" "}
      <Code>.js</Code> files. Or you use features not compatible with Safari.
    </P>

    <P>
      Modern cloud software has a great deal of complexity that cannot be
      ascertained "in the lab", or by running artificial tests in your computer.
      We normally deploy software to dozens of operating systems, mobile
      devices, web browsers, networks of varying stability and performance… And
      the environment is always changing, as we take more and more dependencies
      on hosted services and third-party APIs.
    </P>

    <P>
      Furthermore, software quality goes beyond correctness. It's not just about
      doing "the right thing".{" "}
      <a
        href="https://twitter.com/garybernhardt/status/1007699924866093056"
        target="_blank"
      >
        Quality encapsulates reliability
      </a>{" "}
      (whether your program stays working correctly over time) and{" "}
      <a href="https://craigmod.com/essays/fast_software/" target="_blank">
        performance
      </a>{" "}
      (it must do the right thing quickly).
    </P>

    <H2 id="possible">End-to-end made possible</H2>

    <P>
      First, back when I argued for focusing on integration in 2016 and made no
      mention of end-to-end tests, we didn't yet have the deployment
      infrastructure we have today.
    </P>

    <P>
      With{" "}
      <a href="https://vercel.com/" target="_blank">
        Vercel
      </a>
      , every push to git gets deployed and given an URL. This can be done cost
      effectively by focusing on incremental computation, where the underlying
      static files and serverless functions used to power a deployment are
      mostly re-used from deploy to deploy.
    </P>

    <Figure
      desc={
        <>
          An example of a PR automatically deployed{" "}
          <a
            target="_blank"
            href="https://github.com/rauchg/blog/pull/35#issuecomment-570270061"
          >
            for this very blog
          </a>
        </>
      }
      width={1362}
      height={388}
    >
      <Image
        src="https://res.cloudinary.com/rauchg/image/upload/v1590892705/blog/2020/develop-preview-test/3B52B4B8-BE4F-4DAB-85B6-5E0EF0E0BAB8_vgpbwl.jpg"
        width={1362}
        height={388}
      />
    </Figure>

    <P>
      Just like GitHub is capable of keeping the history of your code forever,
      so can Vercel. Because deploys are{" "}
      <Link href="/2020/2019-in-review#static-is-the-new-dynamic">
        <a>stateless</a>
      </Link>
      , the resources are only used on-demand and scale infinitely with traffic.
    </P>

    <P>
      That gets rid of an obvious initial objection: that it would be difficult
      or costly to perform end-to-end tests against a live individualized
      version of your website. Instead of thinking about a single staging server
      that end-to-end tests are run against, now you can have millions of
      concurrent "staging" environments.
    </P>

    <P>
      I say "staging" in quotes because in reality, you run tests against the
      real production infrastructure, which has enormous reliability benefits.
      Not only are certain{" "}
      <a
        target="_blank"
        href="https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts/features_restricted_to_secure_contexts"
      >
        features these days only enabled when SSL is on
      </a>
      , but having every other production feature enabled, like brotli
      compression and HTTP/2, reduces your risk of outages:
    </P>

    <Tweet
      id="921185541487341568"
      caption="The risks of environment differences, as explained by Kubernetes' creator"
    />

    <P>
      Having made staging instant, prod-like and cost-effective, the remaining
      objection is that running the actual end-to-end tests would be expensive
      or slow, going by the pyramid above.
    </P>

    <P>
      However, the introduction of{" "}
      <a href="https://github.com/puppeteer/puppeteer" target="_blank">
        puppeteer
      </a>
      , Chrome's headless web browser, combined with serverless compute that can
      instantly scale to thousands of concurrent executions (see this{" "}
      <a href="https://stanford.edu/~sadjad/gg-paper.pdf" target="_blank">
        Stanford paper
      </a>{" "}
      for an example) are <b>now making E2E both fast and cheap</b>.
    </P>

    <H2 id="easy">End-to-end made easy</H2>

    <P>
      To show the <b>Develop -> Preview -> Test</b> workflow in action, I'm
      going to demonstrate how easily I can add an E2E test for{" "}
      <a href="https://github.com/rauchg/blog" target="_blank">
        my open-source blog
      </a>{" "}
      using <a href="https://vercel.com/vercel">Vercel</a> in combination with{" "}
      <a href="https://www.checklyhq.com" target="_blank">
        Checkly
      </a>{" "}
      on top of GitHub.
    </P>

    <P>
      First, I'm going to define an end-to-end test to ascertain that my blog
      always contains the string "Guillermo Rauch" in the browser title. As I'm
      writing this, it's not the case, so I expect this to fail.
    </P>

    <P>
      Checkly gives me full access to the Node and puppeteer APIs. Notice I
      don't have to write any ceremony, setup or scheduling logic. I'm "inside"
      the function that will later be invoked:
    </P>

    <Figure
      desc="The ENVIRONMENT_URL env variable will be populated with each preview deploy URL"
      width={1390}
      height={669}
    >
      <Image
        src="https://res.cloudinary.com/rauchg/image/upload/v1590895172/blog/2020/develop-preview-test/EEDBC133-7866-43A5-95CE-1712B26D2C3E_dyytkv.jpg"
        width={1390}
        height={669}
      />
    </Figure>

    <P>
      Then, I installed the{" "}
      <a
        target="_blank"
        href="https://www.checklyhq.com/docs/cicd/github/#setting-up-your-github-integration"
      >
        Checkly GitHub app
      </a>{" "}
      and under the CI/CD tab of the check, I linked it to my{" "}
      <Code>rauchg/blog</Code> repository.
    </P>

    <P>
      I created a git branch where I introduced the <Code>&lt;title&gt;</Code>{" "}
      tag for my blog, but on purpose{" "}
      <a
        href="https://github.com/rauchg/blog/pull/53/commits/b5c30eaef41944f36cf14e7d7f8be9be9953709f"
        target="_blank"
      >
        I misspelt my name
      </a>
      .
    </P>

    <P>
      As soon as I created my pull request, the check was already failing. In
      just a few seconds, I pushed, deployed, a headless browser simulating a
      visitor ran, and my error was exposed:
    </P>

    <Figure
      desc="I can also configure my testing check as mandatory and make this PR unmergeable"
      width={1479 / 2}
      height={618 / 2}
    >
      <Image
        src="https://res.cloudinary.com/rauchg/image/upload/v1590907347/blog/2020/develop-preview-test/818F8CEB-5CAA-4E72-A6E3-2EB40D3233DE_p8gw2b.jpg"
        width={1479 / 2}
        height={618 / 2}
      />
    </Figure>

    <P>
      This happened with absolutely zero additional configuration. Vercel
      supplied a URL, Checkly tested it, GitHub was notified. After pushing
      again, the check re-runs automatically:
    </P>

    <Figure
      desc="Each commit gets its own deploy preview, and its own checks"
      width={1018 / 2}
      height={267 / 2}
    >
      <Image
        src="https://res.cloudinary.com/rauchg/image/upload/v1590911564/blog/2020/develop-preview-test/F936C1A8-D003-4B2A-96AF-8F28560D039A_hwdup6.jpg"
        width={1018 / 2}
        height={267 / 2}
      />
    </Figure>

    <P>
      With my typo fixed, I'm free to merge. Merging to master will deploy my
      changes to <Code>rauchg.com</Code> automatically.
    </P>

    <Figure
      desc="After pressing the green button, we go live. With confidence."
      width={1469 / 2}
      height={439 / 2}
    >
      <Image
        src="https://res.cloudinary.com/rauchg/image/upload/v1590909584/blog/2020/develop-preview-test/EA10BD39-A066-44BE-8E37-C6C9B30C3AE3_shqh6b.jpg"
        width={1469 / 2}
        height={439 / 2}
      />
    </Figure>

    <H2 id="conclusion">Conclusion</H2>

    <P>
      Notably, Checkly allows us to configure multiple locations in the world
      that the tests get executed from, as well as{" "}
      <b>invoking our checks over time</b>.
    </P>

    <P>
      Leslie Lamport{" "}
      <a
        href="https://lamport.azurewebsites.net/pubs/distributed-system.txt"
        target="_blank"
      >
        famously said
      </a>{" "}
      that a distributed system is one where "the failure of a computer you
      didn't even know existed can render your own computer unusable".
    </P>

    <P>
      As our systems become more complex, with ever-changing platforms and
      dependencies on other cloud systems, continuously testing just like our
      users do is our best bet to tame the chaos.
    </P>
  </Post>
));

export default Page;
