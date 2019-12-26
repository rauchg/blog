import Post from "../../components/layouts/post";
import ZEIT from "../../components/zeit";
import Header from "../../components/post/header";
import P from "../../components/post/paragraph";
import { H2, H3 } from "../../components/post/heading";
import Code from "../../components/post/code";
import Snippet from "../../components/post/snippet";
import UL, { LI } from "../../components/post/bullets-list";
import { Ref, FootNotes, Note } from "../../components/post/footnotes";
import Figure, { Image, Video } from "../../components/post/figure";
import Quote from "../../components/post/quote";
import Link from "next/link";
import YouTube from "../../components/post/youtube";
import withViews from "../../lib/with-views";

export default withViews(({ views }) => (
  <Post>
    <Header title="2016 in Review" date="January 6, 2017" views={views} />

    <P>
      What follows is a brief summary of my year organized by different
      categories.
    </P>

    <P>
      This classification is certainly arbitrary, but it gives me a model that I
      can use every year to look back and reflect on what's changed.
    </P>

    <H2 id="zeit">
      <ZEIT />
    </H2>
    <P>
      In November 2015 I started a new company called{" "}
      <a href="https://zeit.co/" target="_blank">
        <ZEIT />
      </a>
      , with my friends
      <Ref id="1" /> and brilliant engineers{" "}
      <a href="https://twitter.com/tonykovanen" target="_blank">
        Tony Kovanen
      </a>{" "}
      and{" "}
      <a href="https://twitter.com/nkzawa" target="_blank">
        Naoyuki Kanezawa.
      </a>
    </P>

    <P>
      It aims to make deployment and hosting of applications in the cloud
      simple, instant and global.
    </P>

    <P>
      Our mission is to empower the individual. At home or inside companies and
      teams. Go directly to production without barriers.
    </P>

    <H3 id="now">Now</H3>
    <P>
      Back in April we{" "}
      <a href="https://zeit.co/blog/why-now" target="_blank">
        announced
      </a>{" "}
      our flagship product:{" "}
      <a href="https://zeit.co/now" target="_blank">
        now
      </a>
      . Once you <a href="https://zeit.co/download">install</a> it, you can
      deploy any project to the cloud with <em>just one command</em>:{" "}
      <b>
        <Code>now</Code>
      </b>
      .
    </P>

    <P>
      We take the <Code>package.json</Code>, <Code>Dockerfile</Code>, or static
      files, build them in the cloud and serve them securely and scalably under
      HTTP/2.
    </P>

    <P>
      Each deployment is <b>immutable</b> and has its own unique URL. They look
      like this: <Code>https://rauchg-blog-hhafwnefgw.now.sh/</Code>. This model
      has a lot of benefits that are not immediately obvious.
    </P>

    <P>
      One is that the same system gives you development, staging and production
      all in one. You can deploy to build, test and iterate during development.
      You can <em>stage</em> by simply sharing these links to your co-workers or
      clients, before you make them live.
    </P>

    <P>
      To go to production, you just <em>alias</em> them. With one command,
      obviously: <Code>now alias rauchg-blog-hhafwnefgw.now.sh rauchg.com</Code>{" "}
      is what I ran for you to be reading these words now. Zero-downtime.
    </P>

    <P>Some milestones we've reached:</P>
    <UL>
      <LI>
        <b>2 billion+</b> requests served
      </LI>
      <LI>
        Users have deployed over <b>40,000</b> times
      </LI>
      <LI>Usage nearly doubled in the past two months alone</LI>
      <LI>
        Being used in government, health care, non-profits, tourism, education
        (hacking schools, hackathons, and IVY league classrooms), many Fortune
        500 companies and even parents teaching their kids how to code :)
      </LI>
      <LI>
        Grew the{" "}
        <a href="https://zeit.co/about#team" target="_blank">
          team
        </a>{" "}
        to 8 amazing individuals
      </LI>
    </UL>

    <H3 id="world">World</H3>

    <P>
      Dealing with SSL certificates, domains and DNS records is a very tedious
      process.
    </P>

    <P>
      It's tedious for the individual but it's also tedious for teams. I've been
      in too many companies where you depend on a specific{" "}
      <em>person or team</em> to manage this stuff.
    </P>

    <P>
      Processes like that kill productivity and create invisible barriers for
      product engineers. Worse yet, after a while you just get used to it.
    </P>

    <P>
      To solve this problem, we launched{" "}
      <a href="https://zeit.co/world" target="_blank">
        <b>
          <ZEIT /> World
        </b>
      </a>
      , a free global DNS solution.
    </P>

    <P>
      When you use the <Code>alias</Code> command above with a new domain, we
      check if it's using our nameservers. If it is, we configure the records
      automatically.
    </P>

    <P>
      Like I said above, we want to make cloud deployment <b>global</b>. A cloud
      where you choose regions is not living up to its name.
    </P>

    <H3 id="hyper">Hyper</H3>

    <P>
      I believe the command-line (CLI) to be a perfect combination of elegance
      and productivity.
    </P>

    <P>
      Why elegant? Most CLI programs adhere to the{" "}
      <a target="_blank" href="https://en.wikipedia.org/wiki/Unix_philosophy">
        Unix Philosophy
      </a>
      . Unlike most apps and websites, it's hard for these programs to bloat.
      They tend to do one thing well. They compose. They are easy to replace.
    </P>

    <P>
      Why productive? Because{" "}
      <a href="http://graydon2.dreamwidth.org/193447.html" target="_blank">
        text is king
      </a>
      . Text is low-bandwidth. Text is fast to input. Text is searchable. If you
      use{" "}
      <a
        href="http://forthedeveloper.com/2008/terminal-sweetness-reverse-i-search/"
        target="_blank"
      >
        <Code>ctrl+r</Code>
      </a>
      , you know what I'm talking about.
    </P>

    <P>
      <a href="https://hyper.is" target="_blank">
        Hyper
      </a>{" "}
      is the{" "}
      <a href="https://atom.io" target="_blank">
        Atom
      </a>{" "}
      of terminals. Written with and extensible with web technologies. Open
      Source.
    </P>

    <Figure
      href="https://hyper.is"
      desc="Showing off Hyper's simple UI, config and plugin installation"
    >
      <Image src="https://cdn.zeit.co/hyper/hyperapp.gif" />
    </Figure>

    <P>
      Since it's built on Electron, we're able to render URLs as sandboxed{" "}
      <Code>&lt;webview&gt;</Code> tags. For some people, this could develop
      into an interesting{" "}
      <a href="https://zeit.co/blog/the-hyper-plan" target="_blank">
        standalone computing environment
      </a>
    </P>

    <Figure
      desc="Side-by-side terminal and web browser with hot code reloading"
      href="https//hyper.is"
    >
      <Video src="https://video.twimg.com/tweet_video/CxvaQGQXcAUTxCV.mp4" />
    </Figure>

    <P>Some milestones we've reached:</P>
    <UL>
      <LI>
        <b>300,000+</b> downloads, <b>13,000+</b> stars on{" "}
        <a href="https://github.com/zeit/hyper">GitHub</a>
      </LI>
      <LI>
        <b>300+</b>{" "}
        <a href="https://github.com/bnb/awesome-hyper" target="_blank">
          plugins
        </a>{" "}
        and{" "}
        <a href="https://hyperthemes.matthi.coffee/" target="_blank">
          themes
        </a>
      </LI>
      <LI>
        People are exploring new CLI dimensions with plugins like{" "}
        <a
          href="https://twitter.com/HyperThemes/status/813397627588972544"
          target="_blank"
        >
          HTML rendering
        </a>
        ,{" "}
        <a
          href="https://twitter.com/mathisonian/status/765275585102876672"
          target="_blank"
        >
          charts
        </a>
        ,{" "}
        <a
          href="https://twitter.com/rauchg/status/813920434081001472"
          target="_blank"
        >
          status lines
        </a>{" "}
        and many others.
      </LI>
      <LI>
        Launched it on{" "}
        <a
          href="https://twitter.com/nolanlawson/status/808412183121887233"
          target="_blank"
        >
          Windows
        </a>{" "}
        and{" "}
        <a
          href="https://twitter.com/fdidron/status/815143883751362560"
          target="_blank"
        >
          Linux
        </a>
        , following our success on{" "}
        <a
          href="https://twitter.com/rauchg/status/807368146977857536"
          target="_blank"
        >
          macOS
        </a>
      </LI>
      <LI>
        Already faster than <em>native</em> terminals across{" "}
        <a
          href="https://twitter.com/rauchg/status/758125063002427392"
          target="_blank"
        >
          some
        </a>{" "}
        <a
          href="https://twitter.com/rauchg/status/808353136926593024"
          target="_blank"
        >
          benchmarks
        </a>
        . Working on improving them all.
      </LI>
    </UL>

    <H3 id="next">Next.js</H3>

    <P>
      <a href="https://github.com/zeit/next.js" target="_blank">
        Next.js
      </a>{" "}
      is a minimalist framework for server-rendered (universal) React
      applications.
    </P>

    <P>
      It brings back some of the good ideas that came with writing PHP sites: no
      setup, start with the filesystem, automatic routing, you get pre-rendered
      HTML in the first hop instead of a blank page.
    </P>

    <P>
      You start by writing a <Code>./pages/index.js</Code> that exports a
      function (stateless component) or a <Code>class</Code> that inherits from{" "}
      <Code>React.Component</Code>:
    </P>

    <Snippet>{`export default () => (
  <div>
    Welcome to <b>Next.js</b>!
  </div>
)
`}</Snippet>

    <P>
      And then just type in <Code>next</Code> and head to{" "}
      <Code>http://localhost/</Code>.
    </P>

    <P>
      A few years ago I wrote about{" "}
      <Link href="/2014/7-principles-of-rich-web-applications">
        <a>7 principles</a>
      </Link>{" "}
      that made for great UX in the web. This tool enables those.
    </P>

    <P>
      Each <em>"page"</em> is a webpack entry-point. Each section of your
      application thus becomes its own <em>bundle</em> of code based on its{" "}
      <Code>import</Code> statements. No need to ship several megabytes of JS
      code with each page anymore.
    </P>

    <P>
      React's declarative nature allows us to pre-fetch{" "}
      <Code>&lt;Link&gt;</Code> tags in the background in a{" "}
      <Code>ServiceWorker</Code>, which is why this blog or{" "}
      <a href="https://zeit.co" target="_blank">
        zeit.co
      </a>{" "}
      feel so snappy!
    </P>

    <P>
      Next.js is therefore a <b>generalization</b> of the <em>site vs app</em>{" "}
      paradigms.
    </P>

    <P>
      Websites tend to <em>pre-render markup</em> and download code{" "}
      <em>lazily</em>. Apps tend to download <em>everything</em> in advance, and
      therefore tend to feel faster afterwards.
    </P>

    <P>Now we're showing you can do both.</P>

    <H2 id="ideas">Ideas</H2>
    <P>
      What follows is a series of ideas that had a profound impact on me. Some
      are fairly new and exciting. Some are very old, but I have only recently
      assimilated their wisdom.
    </P>

    <H3 id="earth-is-a-brain">The Earth is a Brain</H3>

    <P>
      Many of us have already marveled at Tesla's tremendous foresight when he
      accurately described the iPhone{" "}
      <a href="http://www.tfcbooks.com/tesla/1926-01-30.htm" target="_blank">
        in an interview
      </a>{" "}
      nearly <b>90 years ago</b>:
    </P>

    <Quote>
      Not only this, but through television and telephony we shall see and hear
      one another as perfectly as though we were face to face, despite
      intervening distances of thousands of miles; and{" "}
      <b>
        the instruments through which we shall be able to do his will be
        amazingly simple compared with our present telephone. A man will be able
        to carry one in his vest pocket
      </b>
      .
    </Quote>

    <P>
      But there's more. Inside that paper I found a wonderful analogy that I've
      kept coming back to when thinking about modern human societies:
    </P>

    <Quote>
      When wireless is perfectly applied the whole earth will be converted into
      a huge brain, which in fact it is, all things being particles of a real
      and rhythmic whole
    </Quote>

    <P>
      The effectiveness of this mega-brain is a function of the ability of the
      "individual sub-brains", or neurons, to communicate.
    </P>

    <P>
      Astonishing evidence of this is given to us by{" "}
      <a href="https://en.wikipedia.org/wiki/Terence_Tao" target="_blank">
        Terence Tao
      </a>
      , Fields Medal winner, in the particular way he found the proof to the{" "}
      <a
        href="https://en.wikipedia.org/wiki/Sign_sequence#Erd.C5.91s_discrepancy_problem"
        target="_blank"
      >
        Erdős discrepancy problem
      </a>{" "}
      in{" "}
      <a
        href="http://www.nature.com/news/maths-whizz-solves-a-master-s-riddle-1.18441"
        target="_blank"
      >
        late 2015
      </a>
      :
    </P>

    <Quote>
      Tao had been working on a different problem early in September, when{" "}
      <b>a timely comment on his blog</b> suggested that the problem might be
      related to the Erdős conjecture. “At first, I thought the connection was
      only superficial,” says Tao. But he quickly realized that combining the
      commenter's fresh insight with previous results could lead to a solution.
      He submitted his paper less than two weeks later and included an
      acknowledgement thanking the commenter, Uwe Stroinski, a maths instructor
      in Reutlingen, Germany.
    </Quote>

    <P>
      And just like that, a comment on a blog by a stranger leads to the
      solution to a long-standing problem in number theory. The whole is
      decidedly greater than the sum of its parts.
    </P>

    <P>
      From this perspective, the role and importance of any given individual is
      clearly diminished. Nothing but a cog in a giant unpredictable machine,
      which Nick Szabo appropriately dubs a{" "}
      <a
        href="http://unenumerated.blogspot.com/2006/11/wet-code-and-dry.html"
        target="_blank"
      >
        rolling singularity
      </a>
      :
    </P>

    <Quote>
      Computers and humans will continue to co-evolve with computers making the
      faster progress but falling far short of apocalyptic predictions of
      "Singularity,"{" "}
      <b>
        except to the extent that much of civilization is already a rolling
        singularity. For example people can't generally predict what's going to
        happen next in markets or which new startups will succeed in the long
        run
      </b>
      .
    </Quote>

    <P>
      Finally, if we accept this analogy, we can't underestimate the impact that
      fast, free, UI-less (imagine global unlimited LTE) and unrestricted
      internet will have in our world. Exciting times are ahead of us.
    </P>

    <H3 id="bitcoin-is-a-battery">Bitcoin is a Battery</H3>

    <P>
      One of the obvious objections to Bitcoin has been that the consensus
      mechanism based on proof-of-work (PoW) is <b>wasteful</b>.
    </P>

    <P>
      Critics typically point out that the whole ordeal is{" "}
      <em>hashes to ashes</em>, that the electricity consumption is equivalent
      to the total of a small country, and so on.
    </P>

    <P>
      If one works the constraint into the system (as Satoshi did) of having{" "}
      <em>no trusted third-party</em>, it follows that the system must be backed
      by a <em>universally verifiable</em> reality.
    </P>

    <P>
      That's what the anchoring to physical energy expenditure provides, in the
      form of electricity used for solving{" "}
      <a
        href="https://en.wikipedia.org/wiki/Hashcash"
        target="_blank"
        target="_blank"
      >
        Hashcash
      </a>{" "}
      puzzles.
    </P>

    <P>
      Furthermore, this consensus mechanism is remarkably <em>simple</em>. You
      can be in complete isolation from the rest of the world, even in a{" "}
      <a
        href="https://gist.github.com/oleganza/8cc921e48f396515c6d6"
        target="_blank"
      >
        bunker
      </a>
      , and follow very basic rules and efficient verifications to arrive to the
      universal view of the database.
    </P>

    <P>
      The cost of running Bitcoin is the exact cost of running a system that
      puts all its trust in a network without privileged nodes.
    </P>

    <P>
      Investing in the security of the network until now required subscribing to
      this philosophy, to a large extent. But another incentive that I hadn't
      previously contemplated was elucidated by a fascinating interview to
      Chandler Guo, a Chinese miner.
    </P>

    <P>
      If you produce surplus electricity, then{" "}
      <b>Bitcoin mining is your battery</b>:
    </P>

    <Figure desc="Changler Guo describes the Bitcoin Battery (2:55)">
      <YouTube videoId="MAd2f4n6wx8" />
    </Figure>

    <P>
      Adam Back, inventor of HashCash, has suggested in an interesting{" "}
      <a
        href="https://bitcointalk.org/index.php?topic=911339.msg10007339#msg10007339"
        target="_blank"
      >
        thought experiment
      </a>{" "}
      that one can think of Bitcoin as an{" "}
      <b>universal element that represents proof-of-joules spent</b>.
    </P>

    <P>
      The combination of the above ideas might bring to fruition the vision held
      by the likes of Henry Ford and Thomas Edison of the <b>energy dollar</b>:
    </P>

    <Figure
      desc={
        <span>
          New York Times story from{" "}
          <a
            href="http://query.nytimes.com/gst/abstract.html?res=9F04E1D71E30EE3ABC4851DFB4668389639EDE&legacy=true"
            target="_blank"
          >
            February 20, 1922
          </a>{" "}
          (
          <a
            href="http://query.nytimes.com/mem/archive-free/pdf?res=9F04E1D71E30EE3ABC4851DFB4668389639EDE"
            target="_blank"
          >
            PDF
          </a>
          )
        </span>
      }
    >
      <Image width={300} src="https://cldup.com/ePCBk5ZmYM.png" />
    </Figure>

    <H3 id="accessibility">Accessibility is the Mother of Invention</H3>

    <P>
      A completely new perspective on the role of accessibility in technology
      was opened to me by this TED talk by IBM Fellow Chieko Asakawa:
    </P>

    <Figure desc="How New Technology Helps Blind People Explore the World">
      <YouTube videoId="f-mQIWnO3Ag" />
    </Figure>

    <P>Some interesting facts she mentions:</P>

    <UL>
      <LI>
        Braille went digital many years before consumers had digital books on
        their tablets.
      </LI>
      <LI>
        The telephone was invented while building a device for the
        hearing-impaired.
      </LI>
      <LI>Keyboards were developed early on for people with disabilities.</LI>
      <LI>
        The blind community were some of the earliest adopters of internet
        discussion forums.
      </LI>
    </UL>

    <P>
      The argument is very convincing. The demo of the app she's working on
      seems taken straight out of a{" "}
      <a href="http://www.imdb.com/title/tt1798709/" target="_blank">
        sci-fi movie
      </a>
      .
    </P>

    <P>No excuses anymore for disregarding accessibility!</P>

    <H3 id="truth">Just a Shadow of the Truth</H3>

    <Quote>
      The Tao that can be told is not the eternal Tao;
      <br />
      The name that can be named is not the eternal name
    </Quote>

    <P>
      I'm philosophically inclined to think that we should take joy in the
      unknown, in the relativity of it all, in our ability to access{" "}
      <b>nothing but a shadow of the truth</b>, as Terence McKenna puts it:
    </P>

    <Quote>
      It's amazing to me, I mean, if you were to meet a termite who stated that
      his or her goal in life was the perfect modeling of the cosmos. You would
      think it was quite a funny undertaking, and yet how different are we that
      we should presume more than a shadow of the truth?
    </Quote>

    <P>
      <b>True enough</b> is as true as can be gotten.
    </P>

    <Quote by="Rupert Sheldrake">
      The beginning of wisdom, I believe, is our ability to accept an inherent
      messiness in our explanation of what's going on. Nowhere is it written
      that human minds should be able to give a full accounting of creation in
      all dimensions and on all levels.{" "}
      <b>
        Ludwig Wittgenstein had the idea that philosophy should be what he
        called "true enough." I think that's a great idea. True enough is as
        true as can be gotten
      </b>
      . The imagination is chaos. New forms are fetched out of it. The creative
      act is to let down the net of human imagination into the ocean of chaos on
      which we are suspended and then to attempt to bring out of it ideas.
    </Quote>

    <H3 id="evolution-hacks-reality">Evolution Hacks Reality</H3>

    <P>
      I came across a fascinating new take on the idea of consciousness and the
      evolutionary origin of perception by means of natural selection by Donald
      Hoffman:
    </P>

    <Figure desc="Do we see reality as it is?">
      <YouTube videoId="oYp5XuGYqqY" />
    </Figure>

    <P>
      The central idea is that our reality is basically a set of{" "}
      <em>evolutionary hacks</em> that confered a fitness advantage to our
      ancestors.
    </P>

    <P>
      An amusing example is given of an Australian Beetle attempts to mate with
      a beer bottle because it satisfied its primitive heuristics. It had to be
      brown, translucent and large. Oops.
    </P>

    <Figure desc='"I could have sworn it was a beetle"'>
      <Image src="https://cldup.com/i2q5apnEho.jpg" />
    </Figure>

    <P>
      Notice that I used the word <em>hack</em> to describe these adaptations to
      the environment. I actually took that from the presentation itself.
    </P>

    <P>
      Despite Hoffman's specialty being the cognitive sciences, the explanation
      is peppered with symbols found in the computer science lingo.
    </P>

    <P>
      I find this collision between seemingly disparate worlds to be entirely{" "}
      <em>uncoincidental</em> and just as fascinating.
    </P>

    <P>
      Confusing perception with reality, he says, is like thinking that the
      reality of a computer is the icons and buttons on the screen, instead of
      the code and machinery behind it.
    </P>

    <P>
      From this lens, even the study of physics, while useful, might not get us
      closer to understanding reality. Inspecting a button on a screen and
      finding pixels doesn't tell us much about how the GPU and CPU work. And
      the same would be true for confirming the existence of the{" "}
      <a href="https://en.wikipedia.org/wiki/Higgs_boson" target="_blank">
        Higgs boson
      </a>
      , with regards to its underlying machinery.
    </P>

    <P>
      What we normally call reality is just the <b>interface to reality</b> that
      evolution has given us.
    </P>

    <P>
      The takeaway: don't mistake the UI for the reality of the{" "}
      <a
        href="http://www.simulation-argument.com/simulation.html"
        target="_blank"
      >
        computer behind it
      </a>
      .
    </P>

    <H3 id="">Turing Paper vs Quantum Paper</H3>

    <P>
      A quantum computer is <em>just</em> an endless series of symbols written
      in different universes that interfere with one another. A beautiful
      description by{" "}
      <a href="https://en.wikipedia.org/wiki/David_Deutsch" target="_blank">
        David Deutsch
      </a>
      :
    </P>

    <Quote by="David Deutsch">
      Turing hoped that his abstracted-paper-tape model was so simple, so
      transparent and well defined, that it would not depend on any assumptions
      about physics that could conceivably be falsified, and therefore that it
      could become the basis of an abstract theory of computation that was
      independent of the underlying physics. ‘He thought,’ as Feynman once put
      it, ‘that he understood paper.’ But he was mistaken. Real,
      quantum-mechanical paper is wildly different from the abstract stuff that
      the Turing machine uses. The Turing machine is entirely classical, and
      does not allow for the possibility the paper might have different symbols
      written on it in different universes, and that those might interfere with
      one another
    </Quote>

    <H2 id="works">Essays, Interviews, Presentations</H2>

    <H3 id="essays">Essays</H3>

    <P>
      The only essay I wrote this year is called{" "}
      <Link href="/2016/addressable-errors">
        <a>Addressable Errors</a>
      </Link>
      .
    </P>

    <P>
      Inspired by React's excellent warnings, I decided that every time I write
      an error out to a terminal or console, I'll attach a URL to it.
    </P>

    <P>
      Instead of having our users Google error messages or codes, we can point
      them to a resource we can update over time and others can comment on!
    </P>

    <H3 id="interviews">Interviews</H3>

    <UL>
      <LI>
        <a
          href="https://betweenthewires.org/between-the-wires-guillermo-rauch-2819177beedc"
          target="_blank"
        >
          An interview about my work and background
        </a>{" "}
        by Between the Wires
      </LI>
      <LI>
        <a
          href="https://devchat.tv/js-jabber/217-jsj-the-now-project-with-guillermo-rauch"
          target="_blank"
        >
          The Now Project on JS Jabber
        </a>{" "}
        about the motivations for starting <ZEIT /> and Now.
      </LI>
      <LI>
        <a
          href="https://www.acast.com/nodeup/106-1-1-w-guillermo-rauch"
          target="_blank"
        >
          1-on-1 with Guillermo Rauch on NodeUP
        </a>{" "}
        on the Node.js ecosystem, cloud, how it's evolved since its early days.
      </LI>
      <LI>
        <a href="https://changelog.com/podcast/213" target="_blank">
          The Changelog episode
        </a>{" "}
        on <ZEIT />, Hyper and Now.
      </LI>
    </UL>

    <H3 id="presentations">Presentations</H3>

    <P>
      I gave a presentation on Now and Next.js at Nodevember in Nashville,
      Tennesse:
    </P>

    <Figure desc="Now & Next">
      <YouTube videoId="__b6k2pR3Tg" />
    </Figure>

    <P>I introduced Next.js in Vienna</P>

    <Figure desc="What's Next?">
      <YouTube videoId="Bc71SEmucBQ" />
    </Figure>

    <P>And a few other talks </P>

    <UL>
      <LI>
        <a href="https://youtu.be/l9WBh4XFQRg?t=1h14m38s" target="_blank">
          Infinite Deployment with Now
        </a>{" "}
        at col4.0 in Bogotá, Colombia (Spanish)
      </LI>
      <LI>
        <a href="https://youtube.com/watch?v=pLRqfn-warM" target="_blank">
          Programming the JavaScript Future
        </a>{" "}
        at JSConf.uy
      </LI>
      <LI>Electron TechTalk on Hyper at Slack HQ in San Francisco</LI>
      <LI>
        <a href="https://www.youtube.com/watch?v=lYt2_N31bGM" target="_blank">
          Introducing Next.js
        </a>{" "}
        at ReactiveConf
      </LI>
    </UL>

    <H2 id="fun-projects">Fun Projects</H2>

    <H3 id="thoughtcomplete">Thoughtcomplete</H3>

    <Figure
      href="https://thoughtcomplete.now.sh/"
      desc={
        <span>
          <a href="https://thoughtcomplete.now.sh" target="_blank">
            Thoughtcomplete
          </a>
          : autocomplete for your thoughts
        </span>
      }
    >
      <Image src="https://cloud.githubusercontent.com/assets/13041/19394398/ad54abfc-91fe-11e6-9c99-777694f8f7df.gif" />
    </Figure>

    <P>
      In the{" "}
      <a
        href="http://hyperdiscordia.crywalt.com/library_of_babel.html"
        target="_blank"
      >
        Library of Babel
      </a>
      , Borges draws a beautiful comparison between the vastness of the Universe
      and an imaginary Library.
    </P>

    <P>
      Inside it you can find every book that could possibly be conceived,
      including a book that indexes all the others. An{" "}
      <a href="https://en.wikipedia.org/wiki/Georg_Cantor" target="_blank">
        infinity of infinities
      </a>
      , so to speak.
    </P>

    <Quote>
      From these two incontrovertible premises he deduced that the Library is
      total and that its shelves register all the possible combinations of{" "}
      <b>
        the twenty-odd orthographical symbols (a number which, though extremely
        vast, is not infinite)
      </b>
      : Everything: the minutely detailed history of the future, the archangels'
      autobiographies, the faithful catalogues of the Library, thousands and
      thousands of false catalogues, the demonstration of the fallacy of those
      catalogues, the demonstration of the fallacy of the true catalogue, the
      Gnostic gospel of Basilides, the commentary on that gospel, the commentary
      on the commentary on that gospel, the true story of your death, the
      translation of every book in all languages, the interpolations of every
      book in all books.
    </Quote>

    <P>
      Does it ring a bell? There are about <Code>2 * 10^46</Code>{" "}
      <a href="https://what-if.xkcd.com/34/" target="_blank">
        meaningfully different English tweets
      </a>
      , which is a lot, but I still see people making remarkably similar
      observations or even puns (many of which I suspect are "borrowed") on a
      daily basis.
    </P>

    <P>
      This observation led me to the creation of{" "}
      <a href="https://thoughtcomplete.now.sh/" target="_blank">
        <b>thoughtcomplete</b>
      </a>
      , autocompletion for your thoughts based on querying the{" "}
      <a href="https://dev.twitter.com/rest/public" target="_blank">
        Twitter API
      </a>
      .
    </P>

    <P>
      Needless to say, the suggestions it makes can be pretty amusing. I promise
      it will take you to places you didn't think you'd go to. Twitter's{" "}
      <a
        href="https://dev.twitter.com/rest/public/rate-limiting"
        target="_blank"
      >
        rate-limiting
      </a>{" "}
      permitting.
    </P>

    <P>
      In the realm of programming languages, it{" "}
      <a
        href="https://twitter.com/rauchg/status/778679671936262144"
        target="_blank"
      >
        occured to me
      </a>{" "}
      that JavaScript's library,{" "}
      <a href="https://npmjs.com" target="_blank">
        npm
      </a>
      , gets the closest:
    </P>

    <Figure desc="Need a module to compare versions? How about all the possible ones?">
      <Image src="https://cldup.com/mVLV4CAcnm.jpg" />
    </Figure>

    <H3 id="avatars">Beautiful Default Avatars</H3>

    <P>
      I created a hashing scheme for our customers' unique IDs that yields
      beautiful gradients, demonstrated here by typing in my emails:
    </P>

    <Figure desc="Makes it easy to tell multiple accounts apart!">
      <Video src="https://video.twimg.com/tweet_video/C0vRamkVEAAr3Dl.mp4" />
    </Figure>

    <P>
      The technique involves hashing the UID, obtaining a number and calculating
      its <Code>mod 360</Code> (which is the highest value for the HUE in the{" "}
      <a href="https://en.wikipedia.org/wiki/HSL_and_HSV" target="_blank">
        HSL
      </a>{" "}
      color space).
    </P>

    <P>
      Since HSL is a cylindrical geometry, we just <em>evenly spin</em> it to
      find harmonic colors.
    </P>

    <H2 id="bad-ideas">Things that Seemed like Bad Ideas</H2>

    <P>
      Here are some things I had initial negative reactions to (that I can
      recall
      <Ref id="2" />) but I was completely wrong about…
    </P>

    <H3 id="bad-ideas-reactions">Reactions</H3>

    <P>
      As seen in{" "}
      <a
        href="http://www.theverge.com/2015/7/9/8916347/slack-emoji-reactions"
        target="_blank"
      >
        Slack
      </a>
      , later on{" "}
      <a
        href="https://www.wired.com/2016/02/facebook-reactions-totally-redesigned-like-button/"
        target="_blank"
      >
        Facebook
      </a>{" "}
      and finally{" "}
      <a
        href="https://github.com/blog/2119-add-reactions-to-pull-requests-issues-and-comments"
        target="_blank"
      >
        GitHub
      </a>
      .
    </P>

    <P>
      I though they'd be an annoying gimmick (specially for work), but they
      turned out to be quite the opposite.
    </P>
    <P>
      Emojis are one of the best tools for conveying nuance and emotion over
      this medium. Reactions allow for them to flow more naturally and are shown
      inline without creating clutter.
    </P>

    <P>
      They create <em>an opportunity to supply more information</em> to the
      channel. Without reactions, you might stay quiet and not share how you
      feel.
    </P>

    <H3 id="bad-ideas-coding-style">Universal Code Styles</H3>

    <P>
      With, for example,{" "}
      <a href="https://github.com/feross/standard" target="_blank">
        standard
      </a>{" "}
      for JavaScript.
    </P>

    <P>
      Yes, I don't use semicolons anymore. I'm very glad to not spend any time
      at all coordinating or even debating code styling decisions!
    </P>

    <P>
      I look forward to applying this mindset to every language my teams and I
      develop with.
    </P>

    <FootNotes>
      <Note id="1">
        If there's a way to{" "}
        <a href="https://en.wikipedia.org/wiki/Hedge_(finance)" target="_blank">
          <em>hedge</em>
        </a>{" "}
        the risky personal investment of launching a startup company, it surely
        must be to do it with people you love and respect.
      </Note>

      <Note id="2">
        I think this section is particularly useful to analyze our own biases.
        I'll try to more diligently assemble it during 2017.
      </Note>
    </FootNotes>
  </Post>
));
