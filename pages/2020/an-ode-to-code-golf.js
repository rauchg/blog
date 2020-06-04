import P from "../../components/post/paragraph";
import Callout from "../../components/post/callout";
import Link from "next/link";
import Post from "../../components/layouts/post";
import { H2 } from "../../components/post/heading";
import Code from "../../components/post/code";
import Snippet from "../../components/post/snippet";
import Header from "../../components/post/header";
import withViews from "../../lib/with-views";
import Head from "next/head";
import UL, { LI } from "../../components/post/bullets-list";
import useIsInViewport from "use-is-in-viewport";
import Figure, { Image } from "../../components/post/figure";
import { Ref, FootNotes, Note } from "../../components/post/footnotes";
import { useCallback } from "react";

const DEMO_CODE = `_="G=[[@o=j=28H,[@-j]];j3@(25+=A8)+i*Bji&32?70:,-40-i]b=a[j]=c.cloneNode(Qob#b3@Ub.getContext('2d'DVA8,e8-x,6	(j<17+7	,ix/=2;A3_e$J*J*y,.1KDsetIntervalQ5;f=B4+A20%8-8,ia@0	+B830-f*8	,y=10;f>0&f<9E-10<yV11;-1_(y^-6EOx)^6||i%4)Ex*x+y*y<80||a$Af*50y/f,/fDa5,++j		.;G.sortreturn -e[H}DG.map==A)/-W[,=W+X][H;Vo-i*3e3;Q3@YdrawImage(a[~~L2]],-J,L3]-JD!L2]EiYbeginPath(YmoFbezierCurF()})},j=4DjQj?c#c5:4e3;z=VXW*yij|(z+1)%.5<.1E(zZ191+(U527364,x.5+i1.5*e,(59542-yZ5188+(25080*,y-(j&28]j||OU8-i%)<54-BE25,e,|[1K4K,,K,8K][~~(B48+e/3)%1H,45+B])cos(>>j*4&15)Math..StylU'hsla('+[/2+/2,Xj0,(function(b,e){/J+/4,xY	+'%',sin()*LHL1]16G.push([XZy=W))--;)601]+')'fillfor(Z12700*4+xPI*),.height=*50/f+o,ij%*#.width=$.Rect(@0,Aj/Bi/D);E&&FveTo(-H0]JK,1Lb[Oabs(Qi=Ue=Vx=WiXYa.Z*(_0<x";for(Y=0;$="_ZYXWVUQOLKJHFEDBA@$#	"[Y++];)with(_.split($))_=join(pop());eval(_)`;

function Demo() {
  let isInViewport, targetRef;

  if (typeof IntersectionObserver != "undefined") {
    [isInViewport, targetRef] = useIsInViewport({
      modTop: "500px",
      modBottom: "250px",
    });
  }

  const onIframe = useCallback(iframe => {
    if (iframe != null) {
      if (iframe.__written) return;
      const win = iframe.contentWindow;
      const doc = iframe.contentDocument;
      doc.open();
      doc.write('<!doctype html><head><meta charset="utf-8"><body>');
      const style = doc.createElement("style");
      style.textContent = `html, body { margin: 0; padding: 0; border: 0; width: 100%; height: 100%; }
         canvas { margin: auto; display: block; }`;
      doc.head.appendChild(style);
      const canvas = doc.createElement("canvas");
      doc.body.appendChild(canvas);
      // the `a` `b` `c` globals are expected by js1k demos
      win.a = canvas.getContext("2d");
      win.b = doc.body;
      win.c = canvas;
      const demo = doc.createElement("script");
      demo.textContent = DEMO_CODE;
      doc.body.appendChild(demo);

      function onResize() {
        const sw = doc.documentElement.clientWidth;
        const sh = doc.documentElement.clientHeight;
        win.scrollTo({
          left: (560 - sw) / 2,
          top: (560 - sh) / 2,
        });
      }
      onResize();
      win.addEventListener("resize", onResize);

      doc.close();
      iframe.__written = true;
    }
  });

  return (
    <div ref={targetRef}>
      {isInViewport ? (
        <iframe
          style={{ border: 0 }}
          width="100%"
          height="100%"
          ref={onIframe}
        />
      ) : null}

      <style jsx>{`
        div {
          height: 560px;
          margin: 50px 0;
        }

        @media (max-width: 600px) {
          div {
            height: 350px;
          }
        }
      `}</style>
    </div>
  );
}

export default withViews(({ views }) => (
  <Post>
    <Header title="An Ode to Code Golf" date="April 26, 2020" views={views} />
    <Head>
      <meta property="og:title" content="An Ode to Code Golf" />
      <meta property="og:site_name" content="Guillermo Rauch's blog" />
      <meta
        property="og:description"
        content="Learning to code needs to be fun… and competitive"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@rauchg" />
      <meta
        property="og:image"
        content="https://rauchg.com/og/an-ode-to-code-golf.png"
      />
    </Head>
    <P>
      Even though I don't write code these days,{" "}
      <Link href="/2020/vercel">
        <a>my job</a>
      </Link>{" "}
      involves thinking about and deeply understanding it. Code is, and will be,
      a large part of everyone's lives for the{" "}
      <Link href="/2020/2019-in-review#nocode-lowcode-merge">
        <a>foreseeable future</a>
      </Link>
      , and I'm glad I spent much of my life learning its ins{" "}
      <Link href="/2020/2019-in-review#all-code-is-wrong">
        <a>and outs</a>
      </Link>
      .
    </P>
    <P>
      Outside of work, I've now been a part of a number of podcasts or
      conversations with strangers that start with the question: how did you
      learn to code?
    </P>
    <P>
      And now, I'm slightly embarrassed to admit that I've probably given 10
      different answers to the same question.
    </P>
    <P>
      The main reason is that there wasn't a particular instant, or month, or
      year, or flow state I got in where I finally learned to code. It was more
      of a <em>discontinuous</em> process full of ups, downs, impostor syndrome,
      months of voracious learning, followed by{" "}
      <a
        href="https://twitter.com/dan_abramov/status/1233812773282422784?lang=en"
        target="_blank"
      >
        months of entertaining distractions
      </a>
      .
    </P>
    <P>
      However, looking back, there were many decisive contributing factors that
      clearly helped: exposure to open-source (Linux), being involved in online
      communities (IRC and forums) and <b>hacking competitions</b>.
    </P>
    <H2 id="izhal">Izhal: the hacker's ladder of success</H2>
    <P>
      One day, on one of the forums I frequented, someone shared an online game
      called "Izhal.com", which I became completely obsessed about. It was
      similar in spirit as another game called "Slyfx.com", which one{" "}
      <a
        target="_blank"
        href="https://forums.anandtech.com/threads/www-slyfx-com.659669/#post-2807097"
      >
        could describe
      </a>{" "}
      as a "interactive class on hacking".
    </P>
    <P>
      As I mentioned, the journey towards learning to code didn't have a
      consistent, smooth curve. Looking back, this particular game was one of
      those things I was fortunate to find along the way which seriously sped
      things up.
    </P>
    <P>
      The idea was simple: you start with a simple hacking challenge at Level 1,
      and your goal is to hack the made-up system you are given to progress onto
      the subsequent levels. There was a forum associated with it, where you
      could meet others and get hints. The level you were in was your flair, and
      there was a public leaderboard of everyone who was playing.
    </P>
    <P>
      Izhal's step 1's URL was, if I remember correctly, something like{" "}
      <Code>http://izhal.com/welcome/1.html</Code> and it said "Welcome to the
      tournament". The solution to get to level 2 involved inspecting the source
      of the page and finding a HTML comment like:
    </P>
    <Snippet>{`<!-- The next step is http://izhal.com/secret/2 -->`}</Snippet>
    <P>
      This experience was unlike any code tutorial or book I was consuming at
      the time. It was thrilling, competitive, frustrating, exhilarating. It
      went from easy (viewing the HTML source) to harder (disassembling binaries
      and writing{" "}
      <a target="_blank" href="https://en.wikipedia.org/wiki/Keygen">
        key generators
      </a>
      ).
    </P>
    <P>
      It taught me skills that are essential to problem solving, rather than
      coding itself, like reverse engineering a system and{" "}
      <a
        href="http://carlos.bueno.org/2013/09/effective-debugging.html"
        target="_blank"
      >
        unusually effective debugging
      </a>{" "}
      with very little information. And it did so very quickly.
    </P>
    <P>
      By now, these tournaments have long been wiped from the internet, and if
      you google you'll find some that have{" "}
      <a href="https://www.root-me.org/en/Challenges/" target="_blank">
        carried on the torch
      </a>
      . I would recommend beginners to play with them, and content creators to
      experiment with this model for new educational materials.
    </P>
    <H2 id="js">The power of JavaScript</H2>
    <P>
      Why did I decide to write about Izhal? Yesterday I was catching up with my
      friend{" "}
      <a href="https://twitter.com/romancortes?lang=en" target="_blank">
        Román Cortes
      </a>
      , who for many years was one of the most successful{" "}
      <a target="_blank" href="https://js1k.com/">
        JS1K
      </a>{" "}
      contestants.{" "}
    </P>
    <P>
      If you are unfamiliar, JS1K{" "}
      <a
        target="_blank"
        href="https://twitter.com/kuvos/status/1213546333707083778"
      >
        was
      </a>{" "}
      a yearly "code golf" tournament, which is a game with the goal of reducing
      the amount of code as much as possible ("golfing"). In this case, the
      constraint was to make the{" "}
      <a target="_blank" href="https://en.wikipedia.org/wiki/Demoscene">
        coolest possible <b>demo</b>
      </a>{" "}
      in 1K (or 1024 characters) of JavaScript.
    </P>
    <P>
      This article is about learning to code, and I definitely wouldn't start
      with JS1k. If you are getting started, JS1k is good for setting up the
      aspirations of what you could do one day, or to marvel at the expressive
      power of JS. Here's{" "}
      <a href="https://js1k.com/2013-spring/details/1461" target="_blank">
        Roman's runner-up entry from 2013
      </a>
      :
    </P>
    <Snippet
      smallText
      caption="Yes, this is all the code it takes to render the demo below"
      scroll={false}
    >
      {DEMO_CODE}
    </Snippet>
    <P>
      Which 7 years later works just fine in any browser and is embeddable
      inside my{" "}
      <a target="_blank" href="https://nextjs.org">
        Next.js
      </a>
      -powered{" "}
      <a
        target="_blank"
        href="https://github.com/rauchg/blog/tree/master/pages/2020/an-ode-to-code-golf.js"
      >
        blog post source
      </a>
      :
    </P>
    <Demo />
    <P>
      Since JS1k is not returning for 2020, Román shared his new hobby with me:{" "}
      <a href="https://code-golf.io" target="_blank">
        https://code-golf.io
      </a>
      , which became the inspiration for this post.
    </P>
    <H2 id="code-golf-io">Code-golf.io</H2>
    <P>
      <a href="https://code-golf.io/" target="_blank">
        Code-golf.io
      </a>{" "}
      presents challenges of all levels of difficulty, for several programming
      languages, whose solution needs to be submitted in the fewest number of
      characters.
    </P>
    <P>
      As I played around with it, the first thing that stood out to me was that
      results were being <b>remotely verified</b>. The game was sound and
      complete, and there was no easy way of cheating.
    </P>
    <P>
      Having studied different virtualization and{" "}
      <a
        href="https://vercel.com/docs/v2/serverless-functions/introduction"
        target="_blank"
      >
        secure code execution
      </a>{" "}
      techniques over the years, it picked my curiosity.
    </P>
    <P>
      As I browsed, I noticed there was a "
      <a href="https://en.wikipedia.org/wiki/Quine_(computing)" target="_blank">
        Quine
      </a>
      " challenge and I immediately gravitated towards it. If you are not
      familiar, a Quine is a computer program that prints its own source. One of
      my favorite examples is{" "}
      <a
        href="https://github.com/SlexAxton/CSSCSS/blob/gh-pages/index.html"
        target="_blank"
      >
        CSSCSS
      </a>{" "}
      by{" "}
      <a href="https://twitter.com/slexaxton?lang=en" target="_blank">
        Alex Sexton
      </a>
      , which is a CSS Quine &lt;!&gt;, available here for your
      meta-introspection pleasure:{" "}
      <a href="/csscss.html" target="_blank">
        https://rauchg.com/csscss.html
      </a>
      .
    </P>
    <P>
      Initially driven by my fascination to understand how the code sandboxing
      mechanism worked, I decided to give it a try. In other words, I wanted to
      understand how the authors of code-golf.io had ensured you couldn't do
      evil things to their system.
    </P>
    <P>
      The first question I had in my mind was: "What is this system executing?".
      Is it invoking a function? Who is invoking it? How?
    </P>
    <P>
      So I decided to throw an error, knowing that the{" "}
      <a href="https://en.wikipedia.org/wiki/Stack_trace" target="_blank">
        stack trace
      </a>{" "}
      that typically displays with them would tell me more about the
      "breadcrumb" of execution.
    </P>
    <Figure
      width={1530}
      height={614}
      desc="The challenge naturally failed because when the code runs, it doesn't print itself"
    >
      <Image src="/images/an-ode-to-code-golf/golf1.png" />
    </Figure>

    <P>
      At this point I became even more intrigued. Being familiar with Node.js,
      the stack trace was too short, so Node was ruled out.
    </P>
    <P>
      In addition to ruling out traditional JS execution environments, it gave
      me another clue: the code is being read from <Code>/tmp/code.js</Code>.
    </P>

    <P>
      I wanted to learn more about what was there, so I enumerated the{" "}
      <a
        href="https://developer.mozilla.org/en-US/docs/Glossary/Global_object"
        target="_blank"
      >
        global object
      </a>
      . I wasn't able to get <Code>console.log</Code> to work either, so I
      re-used my previous inspection mechanism: <Code>throw</Code>.
    </P>

    <Figure
      width={1522}
      height={608}
      desc="We know that throw exists and it's a valid, hacky way to print"
    >
      <Image src="/images/an-ode-to-code-golf/golf2.png" />
    </Figure>

    <P>
      To my delight: globalThis was defined, which surprisingly indicated a{" "}
      <a href="https://github.com/tc39/proposal-global" target="_blank">
        very recent JS environment
      </a>
      , and the first member I enumerated was called <Code>print</Code>. Eureka!
      That sounds really useful.
    </P>

    <P>
      At this point, I suddenly found myself again in 2002. I felt that familiar
      feeling Izhal gave me back in the day, of challenging myself to{" "}
      <a href="https://news.ycombinator.com/item?id=104802" target="_blank">
        step through the hidden obstacles
      </a>
      , to start from very little and figure things out to beat the game. It
      felt like learning to code again.
    </P>

    <H2 id="past">A blast from the past</H2>

    <Callout emoji="💡">
      Spoiler alert: I'm detailing the solution to one of the code challenges
    </Callout>

    <P>
      Equipped with <Code>print</Code>, I was able to enumerate the entire
      environment
      <Ref id="1" />.
    </P>

    <Figure
      width={1590}
      height={610}
      desc="Enumerating the global object reveals all the methods we can use"
    >
      <Image src="/images/an-ode-to-code-golf/golf3.png" />
    </Figure>

    <P>
      I noticed print was adding a newline character, which meant I probably
      needed to use <Code>write</Code> to solve this puzzle.
    </P>

    <P>
      The tricky thing about writing a Quine is that it requires that you think
      recursively. The temptation might be to say: I'll just write the source
      code as a string!
    </P>

    <Figure
      width={1606}
      height={718}
      desc="An impossible approach to get a quine"
    >
      <Image src="/images/an-ode-to-code-golf/golf4.png" />
    </Figure>

    <P>
      Notice that code-golf.io was expecting <Code>write('write()'))</Code> but
      we just gave it <Code>write()</Code>. No matter what we write in that
      string, we'll always be one layer removed from success. We'll{" "}
      <a
        href="https://knowyourmeme.com/memes/we-need-to-go-deeper"
        target="_blank"
      >
        need to go deeper
      </a>
      .
    </P>

    <P>
      If we look back at the output of our inspection, you'll see another
      familiar method: <Code>read</Code>. That sounds like it could read a file!
    </P>

    <P>
      I connected the pieces: my first clue (<Code>/tmp/code.js</Code>),{" "}
      <Code>write</Code> and <Code>read</Code>. A beautiful Quine was born:
    </P>

    <Figure width={1594} height={708} desc="An early taste of success">
      <Image src="/images/an-ode-to-code-golf/golf5.png" />
    </Figure>

    <P>
      The program executes, reads its own code, and prints it back. The awesome
      verification system of code-golf.io compared input and output, and granted
      my…
    </P>

    <P>
      😫 Completely unsatisfactory, partial, deflating, half-baked "victory".
    </P>

    <P>
      See, each code-golf challenge features a leaderboard right next to your
      input:
    </P>

    <Figure
      width={1576}
      height={472}
      desc="My enemies, but also the benchmark to inspire and show what's possible"
    >
      <Image src="/images/an-ode-to-code-golf/golf6.png" />
    </Figure>

    <P>
      My solution used <b>27</b> characters, and <em>primo</em> had somehow
      found a solution with just <b>24</b>.
    </P>

    <P>
      Once again, just like back in the day in the programming forums, I was
      driven to succeed inspired by what other had demonstrably accomplished.
    </P>

    <P>
      My initial reaction was: how could I possibly make that shorter? That's
      nuts! There's absolutely nothing non-essential about it.
    </P>

    <P>
      I abandoned the "read the filesystem" approach altogether, and went off on
      a disappointing tangent:
    </P>

    <Figure
      width={1512}
      height={708}
      desc="An alternative path with a lot more characters"
    >
      <Image src="/images/an-ode-to-code-golf/golf7.png" />
    </Figure>

    <P>
      I figured: I could define a{" "}
      <b>
        <em>function</em> that prints its own source code
      </b>
      . (In JavaScript, the source of functions is{" "}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString"
        target="_blank"
      >
        available at runtime for instrospection
      </a>
      .)
    </P>

    <P>
      Unfortunately, it used <b>30</b> characters, but I was encouraged by the
      existence of another path to a solution
      <Ref id="2" />. I fired up{" "}
      <Link href="/2020/2019-in-review#notion-is-fancy">
        <a>Notion</a>
      </Link>{" "}
      and started documenting my attempts.
    </P>

    <P>
      Because I had already tried to compress the code a lot (as you can see, it
      looks quite unintelligible) and the gap between my new approach and the
      old one was a huge 3 characters, and I needed an extra 3 to match primo's{" "}
      <b>24</b>, I abandoned this direction.
    </P>

    <P>
      I went back to my initial approach and I started playing with trying to
      compress the path:
    </P>

    <UL>
      <LI>
        Use a relative <Code>code.js</Code>
      </LI>
      <LI>
        Use <Code>/tmp/code</Code> without an extension, similar to how{" "}
        <a
          href="https://nodejs.org/api/modules.html#modules_require_id"
          target="_blank"
        >
          <Code>require</Code> works in Node.js
        </a>
      </LI>
      <LI>
        Use <Code>/tmp/code*</Code>
      </LI>
    </UL>

    <P>
      None worked. However, at that point I remembered the introspection above
      revealed an interesing <Code>os</Code> object, which I enumerated:
    </P>

    <Figure
      width={1506}
      height={614}
      desc="The members of os look very familiar"
    >
      <Image src="/images/an-ode-to-code-golf/golf8.png" />
    </Figure>

    <P>
      This looked like the corresponding{" "}
      <a
        href="http://man7.org/linux/man-pages/man2/chdir.2.html"
        target="_blank"
      >
        basic Unix syscalls
      </a>
      , so I gave <Code>chdir</Code> a try, so that I could change the directory
      I was in, and I brought back the relative approach:
    </P>

    <Figure
      width={1596}
      height={704}
      desc="Learning more about the code-golf.io filesystem"
    >
      <Image src="/images/an-ode-to-code-golf/golf9.png" />
    </Figure>

    <P>
      Even though I was now at a disheartening <b>39</b> chars, it offered the
      understanding that I was inside a regular Unix-like filesystem. I set out
      to try to understand what was the default working directory of the system.
      Was it{" "}
      <Code>
        <a href="http://www.linfo.org/slash_root.html" target="_blank">
          /root
        </a>
      </Code>
      ? Was it <Code>/</Code>?
    </P>

    <P>
      At that point, I got one step closer: if the default directory is{" "}
      <Code>/</Code>, I can make <Code>tmp</Code> relative!?
    </P>

    <Figure
      width={1604}
      height={708}
      desc="A monumental single-character discovery"
    >
      <Image src="/images/an-ode-to-code-golf/golf10.png" />
    </Figure>

    <P>
      I got <b>one thrilling character</b> closer to success, by removing that
      despicable leading <Code>/</Code>.
    </P>

    <P>
      At this point I once again "concluded" I had reached the limits of what
      was possible, but I was encouraged by Román's and primo's success. I was{" "}
      <b>2</b> characters away, where could they possibly come from?
    </P>

    <P>
      My only thought was that the only pair of possible characters that could
      disappear were parentheses, which in mathematics and programming are often
      used redundantly.
    </P>

    <P>
      I pictured removing them, and at that point was reminded of the{" "}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates"
        target="_blank"
      >
        <b>tagged template literal</b>
      </a>{" "}
      feature of JavaScript. Voila!
    </P>

    <Figure width={1606} height={708} desc="Glory at last">
      <Image src="/images/an-ode-to-code-golf/golf11.png" />
    </Figure>

    <P>
      Templates are a relatively new JavaScript feature, I don't actually ever
      remember using it, but I had seen it on Twitter many times due to the
      popularity of its use for CSS-in-JS with{" "}
      <a href="https://styled-components.com/" target="_blank">
        Styled Components
      </a>
      .
    </P>

    <P>
      With those two characters gone, I cemented my one and only contribution to
      the annals of code-golf.io as the permanent <em>4th 1st-place</em> 😅:
    </P>

    <Figure
      width={1664}
      height={534}
      desc="Nice detail: code-golf.io uses GitHub login to authenticate your submission"
    >
      <Image src="/images/an-ode-to-code-golf/golf12.png" />
    </Figure>

    <H2 id="fun-optimization">Optimizing for fun</H2>

    <P>
      Throughout that simple game, I had to apply lots of the skills that were
      essential throughout my life as a programmer: figuring out unfamiliar
      environments and systems without a manual, applying multiple "search"
      strategies and selecting the most promising one, iterating and dealing
      with trial-and-error, and perseverance.
    </P>

    <P>
      There have never been as many options to learn to code as there are today.
      From bootcamps, to free youtube videos, to expensive courses and exclusive
      chatrooms.
    </P>

    <P>
      Whether it's with code golfing or hacking tournaments, I suggest giving a
      try to the alternative of learning by having fun, overcoming obstacles and
      a healthy dose of competition with your friends.
    </P>

    <FootNotes>
      <Note id="1">
        In the very minimal list returned, I found <Code>Realm</Code>, which
        provides a clue about how{" "}
        <a
          target="_blank"
          href="https://www.figma.com/blog/how-we-built-the-figma-plugin-system/#attempt-3-realms"
        >
          sandboxing might
        </a>{" "}
        have been implemented by the game.
      </Note>
      <Note id="2">
        Much like with{" "}
        <a
          href="https://en.wikipedia.org/wiki/Continuous_integration"
          target="_blank"
        >
          CI
        </a>
        , green just… feels good
      </Note>
    </FootNotes>
  </Post>
));
