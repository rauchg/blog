import Post from "../../components/layouts/post";
import P from "../../components/post/paragraph";
import Header from "../../components/post/header";
import Quote from "../../components/post/quote";
import { H2, H3 } from "../../components/post/heading";
import Code from "../../components/post/code";
import Snippet from "../../components/post/snippet";
import UL, { LI as ULI } from "../../components/post/bullets-list";
import OL, { LI as OLI } from "../../components/post/numbers-list";
import TLDR from "../../components/post/tldr";
import Figure, { Image } from "../../components/post/figure";
import withViews from "../../lib/with-views";

export default withViews(({ views }) => (
  <Post>
    <Header
      title="7 Principles of Rich Web Applications"
      date="November 4, 2014"
      views={views}
    />

    <P>
      <span className="translations">
        Also available in:{" "}
        <a href={links[0]} target="_blank">
          Japanese
        </a>
        ,{" "}
        <a href={links[1]} target="_blank">
          Russian
        </a>
        ,{" "}
        <a href={links[2]} target="_blank">
          Portuguese
        </a>
      </span>
      .
    </P>

    <P>
      This is a writeup based on a presentation I gave at BrazilJS in August
      2014. It builds on some of the ideas I’ve been{" "}
      <a href={links[3]} target="_blank">
        blogging
      </a>{" "}
      <a href={links[4]} target="_blank">
        about
      </a>{" "}
      recently related mostly to UX and performance.
    </P>

    <P>
      I want to introduce 7 actionable principles for websites that want to make
      use of JavaScript to control their UI. They are the result of my
      experience as a web developer, but also as a long-time user of the WWW.
    </P>

    <P>
      JavaScript has undeniably become an indispensable tool for frontend
      developers. Its usage is now expanding into other areas like{" "}
      <a href={links[5]} target="_blank">
        servers
      </a>{" "}
      and{" "}
      <a href={links[6]} target="_blank">
        microcontrollers
      </a>
      . It’s the language of choice for{" "}
      <a href={links[7]} target="_blank">
        introducing
      </a>{" "}
      computer science concepts by prestigious universities.
    </P>

    <P>
      Yet a lot of questions on its precise role and usage on the web remain a
      mystery, even to many framework and library authors.
    </P>

    <UL>
      <ULI>
        Should JavaScript be used to replace browser functions like history,
        navigation and page rendering?
      </ULI>
      <ULI>Is the backend dying? Should I render HTML at all?</ULI>
      <ULI>Are Single Page Applications (SPAs) the future?</ULI>
      <ULI>
        Is JS supposed to augment pages for websites, but render pages in web
        apps?
      </ULI>
      <ULI>Should techniques like PJAX or TurboLinks be used?</ULI>
      <ULI>
        What’s the precise distinction between a website and a web application?
        Should there be one at all?
      </ULI>
    </UL>

    <P>
      What follows is my attempt to answer these. My approach is to examine the
      usage of JavaScript <em>exclusively</em> from the lens of user experience
      (UX). In particular, I put a strong focus on the idea of minimizing the
      time it takes the user to get the data they are interested in. Starting
      with networking fundamentals all the way to predicting the future.
    </P>

    <OL>
      <OLI>
        <a href="#server-rendered-pages-are-not-optional">
          Server rendered pages are not optional
        </a>
      </OLI>
      <OLI>
        <a href="#act-immediately-on-user-input">
          Act immediately on user input
        </a>
      </OLI>
      <OLI>
        <a href="#react-to-data-changes">React to data changes</a>
      </OLI>
      <OLI>
        <a href="#control-the-data-exchange-with-the-server">
          Control the data exchange with the server
        </a>
      </OLI>
      <OLI>
        <a href="#dont-break-history-enhance-it">
          Don’t break history, enhance it
        </a>
      </OLI>
      <OLI>
        <a href="#push-code-updates">Push code updates</a>
      </OLI>
      <OLI>
        <a href="#predict-behavior">Predict behavior</a>
      </OLI>
    </OL>

    <H2 id="server-rendered-pages-are-not-optional">
      1. Server rendered pages are not optional
    </H2>

    <TLDR>
      Server rendering is not about SEO, it’s about performance. Consider the
      additional roundtrips to get scripts, styles, and subsequent API requests.
      In the future, consider HTTP 2.0 “pushing” of resources.
    </TLDR>

    <P>
      The first thing I’m compelled to point out is a fairly common false
      dichotomy. That of “server-rendered apps vs single-page apps”. If we want
      to optimize for the best possible user experience and performance, giving
      up one or the other is never a good idea.
    </P>

    <P>
      The reasons are fairly straightforward. The medium by which pages are
      transmitted, the internet, has a theoretical speed limit. This has been
      memorably illustrated by the famous essay/rant{" "}
      <a href={links[8]} target="_blank">
        “It’s the latency, stupid”
      </a>{" "}
      by Stuart Cheshire:
    </P>

    <Snippet>{`The distance from Stanford to Boston is 4320km.
The speed of light in vacuum is 300 x 10^6 m/s.
The speed of light in fibre is roughly 66% of the speed of light in vacuum.
The speed of light in fibre is 300 x 10^6 m/s * 0.66 = 200 x 10^6 m/s.
The one-way delay to Boston is 4320 km / 200 x 10^6 m/s = 21.6ms.
The round-trip time to Boston and back is 43.2ms.
The current ping time from Stanford to Boston over today’s Internet is about 85ms (…)
So: the hardware of the Internet can currently achieve within a factor of two of the speed of light.`}</Snippet>

    <P>
      The cited 85ms round-trip time between Boston and Stanford will certainly
      improve over time, and your own experiments right now might already show
      it. But it’s important to note that there’s a theoretical minimum of about{" "}
      <strong>50ms</strong> between the two coasts.
    </P>

    <P>
      The bandwidth capacity of your users’ connections might improve
      noticeably, as it steadily has, but the latency needle won’t move much at
      all. This means that minimizing the number of roundtrips you make to
      display information on page is essential to great user experience and
      responsiveness.
    </P>

    <P>
      This becomes particularly relevant to point out considering the rise of
      JavaScript-driven applications that usually consist of no markup other
      than <Code>&lt;script&gt;</Code> and <Code>&lt;link&gt;</Code> tags beside
      an empty <Code>&lt;body&gt;</Code>. This class of application has received
      the name of “Single Page Applications” or “SPA”. As the name implies,
      there’s only one page the server consistently returns, and all the rest is
      figured out by your client side code.
    </P>

    <P>
      Consider the scenario where the user navigates to{" "}
      <Code>http://app.com/orders/</Code> after following a link or typing in
      the URL. At the time your application receives and processes the request,
      it already has important <em>information</em> about what’s going to be
      shown on that page. It could, for example, pre-fetch the orders from the
      database and include them in the response. In the case of most SPAs, a
      blank page and a <code>&lt;script&gt;</code> tag is returned instead, and
      another roundtrip will be made to get the scripts contents. So that then
      another roundtrip can be made to get the data needed for rendering.
    </P>

    <Figure desc="Analysis of the HTML sent by the server for every page of a SPA in the wild">
      <Image src="https://cldup.com/kpfLbf6dha.png" />
    </Figure>

    <P>
      At this point many developers consciously accept this tradeoff because
      they make sure the extra network hops happen only once for their users by
      sending the proper cache headers in the script and stylesheet responses.
      The general consensus is that it’s an acceptable tradeoff because once the
      bundle is loaded, you can then handle most of the user interaction (like
      transitions to other pages) without requesting additional pages or
      scripts.
    </P>

    <P>
      However, even in the presence of a cache, there’s a performance penalty
      when considering script parsing and evaluation time.{" "}
      <a href={links[9]} target="_blank">
        “Is jQuery Too Big For Mobile?”
      </a>{" "}
      describes how even for jQuery alone this could be in the order of hundreds
      of milliseconds for certain mobile browsers.
    </P>

    <P>
      What’s worse, usually no feedback whatsoever is given to the user while
      the scripts are loading. This results in a blank page displaying and then
      a sudden transition to a fully loaded page.
    </P>

    <P>
      Most importantly, we usually forget that the current prevailing transport
      of internet data (TCP) <em>starts slowly</em>. This pretty much guarantees
      that most script bundles won’t be fetched in one roundtrip, making the
      situation described above even worse.
    </P>

    <P>
      A TCP connection starts with an initial roundtrip for the handshake. If
      you’re using SSL, which happens to be important for safe script delivery,
      an additional two roundtrips are used (only one if the client is resuming
      a session). Only then can the server start sending data, but as it turns
      out, it does so slowly and incrementally.
    </P>

    <P>
      A congestion control mechanism called <em>slow start</em> is built into
      the TCP protocol to send the data in a growing number of <em>segments</em>
      . This has two serious implications for SPAs:
    </P>

    <P>
      1. Large scripts take a lot longer to download than it seems. As explained
      in the book{" "}
      <a href={links[10]} target="_blank">
        “High Performance Browser Networking”
      </a>{" "}
      by Ilya Grigorik, it takes “four roundtrips (…) and hundreds of
      milliseconds of latency, to reach 64 KB of throughput between the client
      and server”. In this example, considering a great internet connection
      between London and New York, it takes 225ms before TCP is able to reach
      the maximum packet size.
    </P>

    <P>
      2. Since this rule applies also for the initial page download, it makes
      the initial content that comes rendered with the page all that much more
      important. As Paul Irish concludes in his presentation{" "}
      <a href={links[11]} target="_blank">
        “Delivering the Goods”
      </a>
      , the first 14kb are crucially important. This is a helpful illustration
      of the amount of data the server can send in each round-trip over time:
    </P>

    <Figure desc="How many KB a server can send for each phase of the connection by segments">
      <Image src="https://cldup.com/WI9kN_9iyR.png" />
    </Figure>

    <P>
      Websites that deliver content (even if it’s only the basic layout without
      the data) within this window will seem extremely responsive. In fact, to
      many authors of fast server-side applications JavaScript is deemed
      unneeded or as something to be used sparingly. This bias is further
      strengthened if the app has a fast backend and data sources and its
      servers located near users (CDN).
    </P>

    <P>
      The role of the server in assisting and speeding up content presentation
      is certainly application-specific. The solution is not always as
      straightforward as “render the entire page on the server”.
    </P>

    <P>
      In some cases, parts of the page that are not essential to what the user
      is likely after are better left out of the initial response and fetched
      later by the client. Some applications, for example, opt to render the
      “shell” of the page to respond immediately. Then they fetch different
      portions of the page in parallel. This allows for great responsiveness
      even in a situation with slow legacy backend services. For some pages,
      pre-rendering the content that’s “above{" "}
      <a href={links[12]} target="_blank">
        the fold
      </a>
      ” is also a viable option.
    </P>

    <P>
      Making a <em>qualitative assessment</em> of scripts and styles based on
      the information the server has about the the session, the user and the URL
      is absolutely crucial. The scripts that deal with sorting orders will
      obviously be more important to <Code>/orders</Code> than the logic to deal
      with the settings page. Maybe less intuitively, one could also make a
      distinction between “structural CSS” and the “skin/theme CSS”. The former
      might be required by the JavaScript code, so it should block, but the
      latter could be loaded asynchronously.
    </P>

    <P>
      A neat example of a SPA that does not incur in extra roundtrip penalties
      is a proof-of-concept clone of{" "}
      <a href={links[13]} target="_blank">
        StackOverflow in 4096 bytes
      </a>{" "}
      (which can theoretically be delivered on the first post-handshake
      roundtrip of a TCP connection!). It manages to pull this off at the
      expense of cacheability, by inlining all the assets within the response.
      With{" "}
      <a href={links[14]} target="_blank">
        SPDY or HTTP/2 server push
      </a>
      , it should be theoretically possible to deliver client code that’s
      cacheable in a single hop. For the time being, rendering part or all of
      the page on the server is the most common solution to avoiding extra
      roundtrips.
    </P>

    <Figure desc="Proof-of-concept SPA with inlined CSS and JS that doesn’t incur in extra roundtrips">
      <Image src="https://cldup.com/NeV5qFDaVR.png" />
    </Figure>

    <P>
      A flexible enough system that can share rendering code between browser and
      server and provides tools for progressively loading scripts and styles
      will probably eliminate the colloquial distinction between{" "}
      <em>websites and webapps</em>. Both are reigned by the same UX principles.
      A blog and a CRM are fundamentally not that different. They have URLs,
      navigation, they show data to the user. Even a spreadsheet application,
      which traditionally relies a lot more on client side functionality, first
      needs to show the user the data he’s interested in modifying. And doing so
      in the least number of network roundtrips is paramount.
    </P>

    <P>
      In my view, the major tradeoffs in performance seen in many widely
      deployed systems these days have to do with the progressive accumulation
      of complexity in the stack. Technologies like JavaScript and CSS were
      added over time. Their popularity increased over time as well. Only now
      can we appreciate the impact of the different ways they’ve been applied.
      Some of this is addressed by improving protocols (as shown by the ongoing
      enhancements seen in SPDY and QUIC), but the application layer is where
      most of the benefits will come from.
    </P>

    <P>
      It’s helpful to refer to some of the initial discussions around the design
      of the initial WWW and HTML to understand this. In particular,{" "}
      <a href={links[15]} target="_blank">
        this mailing list thread
      </a>{" "}
      from 1997 proposing the addition of the <Code>{"<img>"}</Code> tag to
      HTML. Marc Andreessen re-iterates the importance of serving information
      fast:
    </P>

    <Quote>
      "If a document has to be pieced together on the fly, it could get
      arbitrarily complex, and even if that were limited we’d certainly start
      experiencing major hits on performance for documents structured in this
      way. This essentially throws the
      <b style={{ color: "#D0021B" }}> single-hop principle of WWW </b>
      out the door (well, IMG does that too but for a very specific reason and
      in a very limited sense) — are we sure we want to do that?”
    </Quote>

    <H2 id="act-immediately-on-user-input">2. Act immediately on user input</H2>

    <TLDR>
      JavaScript allows us to mask network latency altogether. Applying this as
      a design principle should even remove most spinners or “loading” messages
      from your applications. PJAX or TurboLinks miss out on opportunities to
      improve the perception of speed.
    </TLDR>

    <P>
      The first principle builds heavily on the idea of minimizing latency as
      the user interacts with your website.
    </P>

    <P>
      That said, despite how much effort you invest into minimizing the
      back-and-forth between server and client, there’s a few things beyond your
      control. A theoretical lower bound given by the distance between your user
      and your server being the unescapable one.
    </P>

    <P>
      Poor or unpredictable network quality being the other significant one. If
      the network connection is not great, packet re-transmission will occur.
      What you would expect to result in a couple roundtrips could end up taking
      several.
    </P>

    <P>
      And in this lies JavaScript’s greatest strength towards improving UX. With
      client-side code driving user interaction, we are now able to{" "}
      <em>mask latency</em>. We can create the perception of speed. We can
      artificially approach zero latency.
    </P>

    <P>
      Let’s consider the basic HTML web again for a second. Documents connected
      together through hyperlinks, or <Code>{"<a>"}</Code> tags. When any of
      them are clicked, the browser will make a network request that’ll take
      unpredictably long, then get and process its response and finally
      transition to the new state.
    </P>

    <P>
      JavaScript allows to <b>act immediately</b> and <b>optimistically</b> on
      user input. A click on a link or button can result in an immediate
      reaction without hitting the network. A famous example of this is Gmail
      (or Google Inbox), where archiving an email will happen immediately on the
      UI while the server request is sent and processed asynchronously.
    </P>

    <P>
      In the case of a form, instead of waiting for some HTML as a response
      after its submission, we can act right after the user presses enter. Or
      even better, like Google Search does, we can respond to the user holding
      down a key:
    </P>

    <Figure desc="Google adapts its layout as soon as you hold down a key">
      <Image src="https://cldup.com/CmkksKRbrl.gif" />
    </Figure>

    <P>
      That particular behavior is an example of what I call{" "}
      <em>layout adaptation</em>. The basic idea is that the first state of a
      page “knows” about the layout of the next state, so it can transition to
      it before there’s any data to populate the page with. It’s “optimistic”
      because there’s still a risk that the data never comes and an error should
      be displayed instead, but that’s obviously rare.
    </P>

    <P>
      Google’s homepage is particularly relevant to this essay because its
      evolution illustrates the first two principles we’ve discussed very
      clearly.
    </P>

    <P>
      First of all, analyzing the{" "}
      <a href={links[16]} target="_blank">
        packet dump
      </a>{" "}
      of the TCP connection to <Code>www.google.com</Code> reveals they make
      sure to send their entire homepage all at once after the request comes in.
      The whole exchange, including closing the connection, takes 64ms for me in
      San Francisco. This has likely been the case ever since{" "}
      <a href={links[17]} target="_blank">
        the beginning
      </a>
      .
    </P>

    <P>
      In late 2004, Google{" "}
      <a href={links[18]} target="_blank">
        pioneered
      </a>{" "}
      the usage of JavaScript to provide inline as-you-type suggestions
      (curiously, as a 20% time project, like Gmail). This even became an
      inspiration for{" "}
      <a href={links[19]} target="_blank">
        coining AJAX
      </a>
      :
    </P>

    <Quote>
      Take a look at Google Suggest. Watch the way the suggested terms update as
      you type, almost instantly […] with no waiting for pages to reload. Google
      Suggest and Google Maps are two examples of a new approach to web
      applications that we at Adaptive Path have been calling Ajax
    </Quote>

    <P>
      And in 2010 they{" "}
      <a href={links[20]} target="_blank">
        introduced
      </a>{" "}
      Instant Search, which puts JS front and center by skipping the page
      refresh altogether and transitioning to the “search results” layout as
      soon as you press a key as we saw above.
    </P>

    <P>
      Another prominent example of layout adaptation is most likely in your
      pocket. Ever since the early days, iPhone OS would request app authors to
      provide a <Code>default.png</Code> image that would be rendered right
      away, while the actual app was loading.
    </P>

    <Figure desc="iPhone OS enforced loading default.png before the application">
      <Image src="https://cldup.com/Gg1AwDA71S.png" />
    </Figure>

    <P>
      In this case, the OS was compensating not necessarily for network latency,
      but CPU. This was crucial considering the constraints of the original
      hardware. There’s however a scenario where this technique breaks. That
      would be when the layout doesn’t match the stored image, as in the case of
      login screens. A thorough analysis of its implications was provided by{" "}
      <a href={links[21]} target="_blank">
        Marco Arment in 2010
      </a>
      .
    </P>

    <P>
      Another form of input besides clicks and form submissions that’s greatly
      enhanced by JavaScript rendering is <b>file input</b>.
    </P>

    <P>
      We can capture the user’s intent to upload through a variety of means:
      drag and drop, paste, file picker. Then, thanks to new{" "}
      <a href={links[22]} target="_blank">
        HTML5 APIs
      </a>{" "}
      we can display content as if it had been uploaded. An example of this in
      action is in the work we did with Cloudup uploads. Notice how the
      thumbnail is generated and rendered immediately:
    </P>

    <Figure desc="The image gets rendered and fades in before the upload completes">
      <Image src="https://cldup.com/iCig_gr__M.gif" />
    </Figure>

    <P>
      In all of these cases, we’re enhancing the perception of speed.
      Thankfully, there’s plenty of evidence that this is a good idea. consider{" "}
      <a href={links[23]} target="_blank">
        the example
      </a>{" "}
      of how <em>increasing</em> the walk to baggage claim reduced the number of
      complaints at the Houston Airport, without necessarily making baggage
      handling faster.
    </P>

    <P>
      The application of this idea should have very profound implications on the
      UI of our applications. I contend that spinners or “loading indicators”
      should become a rarity, especially as we transition to applications with{" "}
      <em>live data</em>, discussed in the next section.
    </P>

    <P>
      There are situations where the illusion of immediacy could actually be
      detrimental to UX. Consider a payment form or a logout link. Acting
      optimistically on those, telling the user everything is done when it’s
      not, can result in a negative experience.
    </P>

    <P>
      But even in those cases, the display of spinners or loading indicators
      should be <b>deferred</b>. They should only be rendered after the user no
      longer considers the response was immediate. According to the often-cited{" "}
      <a href={links[24]} target="_blank">
        research by Nielsen
      </a>
      :
    </P>

    <Quote>
      The basic advice regarding response times has been about the same for
      thirty years Miller 1968; Card et al. 1991:
      <br />
      <b>0.1 second</b> is about the limit for having the user feel that the
      system is reacting instantaneously, meaning that no special feedback is
      necessary except to display the result.
      <br />
      <b>1.0 second</b> is about the limit for the user’s flow of thought to
      stay uninterrupted, even though the user will notice the delay.
      <b style={{ color: "#D0021B" }}>
        {" "}
        Normally, no special feedback is necessary during delays of more than
        0.1 but less than 1.0 second
      </b>
      , but the user does lose the feeling of operating directly on the data.
      <br />
      <b>10 seconds</b> is about the limit for keeping the user’s attention
      focused on the dialogue. For longer delays, users will want to perform
      other tasks while waiting for the computer to finish
    </Quote>

    <P>
      Techniques like PJAX or TurboLinks unfortunately largely miss out on the
      opportunities described in this section. The client side code doesn’t
      “know” about the future representation of the page, until an entire
      roundtrip to the server occurs.
    </P>

    <H2 id="react-to-data-changes">3. React to data changes</H2>

    <TLDR>
      When data changes on the server, let the clients know without asking. This
      is a form of performance improvement that frees the user from manual
      refresh actions (F5, pull to refresh). New challenges: (re)connection
      management, state reconciliation.
    </TLDR>

    <P>
      The third principle is that of <em>reactivity</em> of the UI with respect
      to data changes in the source, typically one or more database servers.
    </P>

    <P>
      Serving an HTML snapshot of data that remains static until the user
      refreshes the page (traditional websites) or interacts with it (AJAX) is
      increasingly becoming obsolete.
    </P>

    <P>
      Your UI should be <b>self-updating</b>.
    </P>

    <P>
      This is crucially important in a world of an ever-increasing number of
      data points, in the form of watches, phones, tablets and wearable devices
      yet to be designed.
    </P>

    <P>
      Consider the Facebook newsfeed at the time of its inception, when data was
      primarily entered through personal computers. Rendering it statically was
      not optimal, but it made sense if people were updating their profiles
      maybe once a day, if that.
    </P>

    <P>
      We now live in a world where you can upload a photo, and have your peers
      like it or comment on it almost immediately. The need for realtime
      feedback is natural due to the highly concurrent usage of the application.
    </P>

    <P>
      It would be wrong, however, to assume that the benefits of reactivity are
      limited to multi-user applications. Which is why I like to talk about{" "}
      <em>concurrent data</em> points as opposed to <em>users</em>. Consider the
      common scenario of sharing a photo you have on your phone with your own
      laptop:
    </P>

    <Figure desc="A single-user application can still benefit from reactivity">
      <Image src="https://cldup.com/15MbLjLsfm.gif" />
    </Figure>

    <P>
      It’s useful to think of all the data exposed to the user as reactive.{" "}
      <b>Session and login state synchronization</b> is an example of applying
      this principle uniformly. If users of your application have multiple tabs
      open simultaneously, logging out of one will invalidate them all. This
      inevitably results in enhanced privacy and security, especially in
      situations where multiple people have access to the same device.
    </P>

    <Figure desc="Each page reacts to the session and login state">
      <Image src="https://cldup.com/FS74zJHpDg.gif" />
    </Figure>

    <P>
      Once you set up the expectation that the information on the screen updates
      automatically, it’s important to consider a new need:{" "}
      <b>state reconciliation</b>.
    </P>

    <P>
      When receiving ordered atomic data updates, it’s easy to forget that your
      application should be able to update appropriately even after long periods
      of disconnection. Consider the scenario of closing your laptop’s lid and
      reopening it days later. What how does your app behave then?
    </P>

    <Figure desc="Example of what would occur if we disregard elapsed time upon reconnection">
      <Image src="https://cldup.com/D7obeKaOlB.png" />
    </Figure>

    <P>
      The ability for your application to reconcile states disjointed in time is
      also relevant to our first principle. If you opt to send data with the
      initial page load, you must consider the time the data is on the wire
      until your client-side scripts load. That time is essentially equivalent
      to a disconnection, and the initial connection by your scripts is a
      session resumption.
    </P>

    <H2 id="control-the-data-exchange-with-the-server">
      4. Control the data exchange with the server
    </H2>

    <TLDR>
      We can now fine-tune the data exchange with the server. Make sure to
      handle errors, retry on behalf of the user, sync data on the background
      and maintain offline caches.
    </TLDR>

    <P>
      When the WWW was conceived, data exchange between the client and server
      was limited to a few ways:
    </P>

    <OL>
      <OLI>
        Clicking a link would <Code>GET</Code> a new page and render the new
        page
      </OLI>
      <OLI>
        Submitting a form would <Code>POST</Code> or <Code>GET</Code> and render
        a new page
      </OLI>
      <OLI>
        Embedding an image or object would <Code>GET</Code> it asynchronously
        and render it
      </OLI>
    </OL>

    <P>
      The simplicity of this model is attractive, and we certainly have a much
      higher learning curve today when it comes to understanding how data is
      sent and received.
    </P>

    <P>
      The biggest limitations were around the second point. The inability to
      send data without necessarily triggering a new page load was not optimal
      from a performance standpoint. But most importantly, it completely broke
      the back button:
    </P>

    <Figure desc="Possibly the most annoying artifact of the old web">
      <Image src="https://cldup.com/mc3PlaztUS.png" />
    </Figure>

    <P>
      The web as an <b>application platform</b> was thus inconceivable without
      JavaScript. AJAX constituted a <em>leapfrog</em> in terms of the user
      experience around user submission of information.
    </P>

    <P>
      We now have a variety of APIs (<Code>XMLHttpRequest</Code>,{" "}
      <Code>WebSocket</Code>, <Code>EventSource</Code> to name a few) that give
      us fine-grained control of the data flow. In addition to the ability to
      send data the user inputs into a form, we now have some new opportunities
      to enhance UX.
    </P>

    <P>
      One that’s specially relevant to our previous principle is the ability to
      display the <em>connection state</em>. If we set up the expectation that
      the data updates automatically, we ought to notify the user about being{" "}
      <em>disconnected</em> and ongoing <em>reconnection attempts</em>.
    </P>

    <P>
      When detecting a disconnection, it’s useful to store data in memory (or
      even better, <Code>localStorage</Code>) so that it can be sent later. This
      is specially important in light of the introduction of{" "}
      <a href={links[25]} target="_blank">
        ServiceWorker
      </a>
      , which enables JavaScript web applications to run in the{" "}
      <em>background</em>. If your application is not open, you can still
      attempt to sync user data in the background.
    </P>

    <P>
      Consider timeouts and errors when sending data and{" "}
      <b>retry on behalf of the user</b>. If a connection is re-established,
      attempt to send the data again. In the case of a persistent failure,
      communicate it to the user.
    </P>

    <P>
      Certain errors should be handled carefully. For example, an unexpected{" "}
      <Code>403</Code> could mean the user’s session has been invalidated. In
      such cases, you have the opportunity to prompt the user to resume it by
      showing a login screen.
    </P>

    <P>
      It’s also important to make sure the user doesn’t inadvertently interrupt
      the data flow. This can happen under two situations. The first and most
      obvious one is closing the browser or tab, which you can attempt to
      prevent with <Code>beforeunload</Code> handlers.
    </P>

    <Figure desc="The beforeunload browser warning">
      <Image src="https://cldup.com/8Eu4Sk9mD8.png" />
    </Figure>

    <P>
      The other (and less obvious) one is capturing page transitions before they
      happen, like clicking links that trigger a new page load. This gives you a
      chance to display your own modals.
    </P>

    <H2 id="dont-break-history-enhance-it">
      5. Don’t break history, enhance it
    </H2>

    <TLDR>
      Without the browser managing URLs and history for us, new challenges
      emerge. Make sure not to break expectations related to scrolling. Keep
      your own caches for fast feedback.
    </TLDR>

    <P>
      Form submissions aside, if we were to design any modern web application
      with only hyperlinks, we’d end up with fully functional back/forward
      navigation.
    </P>

    <P>
      Consider, for example, the typical “infinite pagination scenario”. The
      typical way it’s implemented involves capturing the click with JavaScript,
      requesting some data / HTML, injecting it. Making the{" "}
      <Code>history.pushState</Code> or <Code>replaceState</Code> call is an
      optional step, unfortunately not taken by many.
    </P>

    <P>
      And this is why I use the word “break”. With the simpler model the web
      proposed initially, this situation was not in the picture. Every state
      transition relied on a URL change.
    </P>

    <P>
      The flip side of this is that new opportunities emerge for enhancing
      history now that we can control it with JavaScript.
    </P>

    <P>
      One such opportunity is what Daniel Pipius dubbed{" "}
      <a href={links[26]} target="_blank">
        Fast Back
      </a>
      :
    </P>

    <Quote>
      Back should be quick; users don’t expect data to have changed much.
    </Quote>

    <P>
      This is akin to considering the back button an application-level button
      and applying principle <em>2: act immediately on user input</em>. The key
      is that you can now decide how to cache the previous page and render it
      instantly. You can then apply principle 3 and then inform the user of{" "}
      <em>new</em> data changes that happened to that page.
    </P>

    <P>
      There are still a few cases where you won’t be in control of the caching
      behavior. For example, if you render a page, then navigate to a third
      party website, and the user clicks back. Applications that render HTML on
      the server and then modify it on the client are at particular risk of this
      subtle bug:
    </P>

    <Figure desc="Pressing back incorrectly loads the initial HTML from the pageload">
      <Image src="https://cldup.com/c081WZaE8H.gif" />
    </Figure>

    <P>
      Another way of breaking navigation is by ignoring{" "}
      <em>scrolling memory</em>. Once again, pages that don’t rely on JS and
      manual history management most likely won’t have an issue with this. But
      dynamic ones usually do. I tested the two most popular JavaScript-driven
      newsfeeds of the web: Twitter and Facebook. Both exhibited{" "}
      <em>scrolling amnesia</em>.
    </P>

    <Figure desc="Infinite pagination is usually susceptible to scrolling amnesia">
      <Image src="https://cldup.com/3m0DOKp9BW.gif" />
    </Figure>

    <P>
      Finally, be aware of state changes that are relevant only while navigating
      history. Consider this example of toggling the display of comment
      subtrees.
    </P>

    <Figure desc="The toggling of comments should be preserved when navigating history">
      <Image src="https://cldup.com/bvqcnxO0De.gif" />
    </Figure>

    <P>
      If the page was re-rendered by following a link within the application,
      the expectation of the user might be that all comments appear uncollapsed.
      The state was <em>volatile</em> and only associated with the entry in the
      history stack.
    </P>

    <H2 id="push-code-updates">6. Push code updates</H2>

    <TLDR>
      Pushing data without pushing code is insufficient. If your data updates
      automatically, so should your code. Avoid API errors and improve
      performance. Use stateless DOM for side-effect free repainting.
    </TLDR>

    <P>Making your application react to code changes is crucially important.</P>

    <P>
      First of all, it reduces the surface for possible errors and increases
      reliability. If you make a breaking change to your backend APIs, then
      clients’ code <em>must</em> be updated. They might otherwise not be able
      to understand new data, or they may send data in an incompatible format.
    </P>

    <P>
      Another equally important reason has to do with the implementation of
      principle #3. If your UI is self-updating, there’s little reason for users
      to trigger a page refresh.
    </P>

    <P>
      Keep in mind that in a traditional website, a page refresh accomplishes
      two things: reload the data and reload the code. Setting up a mechanism to
      push data without one to push code is not enough, especially in a world
      where a single tab (session) might stay open for a very long time.
    </P>

    <P>
      If a server push channel is in place, a notification can be emitted to
      clients when new code is available. In the absence of that, a version
      number can be appended as a header to outgoing HTTP requests. The server
      can then compare it to its latest known version, opt to handle request or
      not, and advice the client.
    </P>

    <P>
      After this, some web applications opt to refresh the page on behalf of the
      user when deemed appropriate. For example, if the page is{" "}
      <a href={links[27]} target="_blank">
        not visible
      </a>{" "}
      and no form inputs are filled out.
    </P>

    <P>
      A better approach is to perform <b>hot code reloading</b>. This means that
      there would be no need to perform a full page refresh. Instead, certain
      modules can be swapped on the fly and their code re-executed.
    </P>

    <P>
      It’s certainly hard to make hot code reloading work for many existing
      codebases. It’s worth discussing then a type of architecture that
      elegantly separates <em>behavior</em> (code) from <em>data</em> (state).
      Such a separation would allow us to make a lot of different patches very
      efficient.
    </P>

    <P>
      Consider for example a module in your application that sets up an event
      bus (e.g:{" "}
      <a href={links[28]} target="_blank">
        socket.io
      </a>
      ). When events are received, the state of a certain component is populated
      and it renders to the DOM. Then you modify the behavior of that component,
      for example, so that it produces different DOM markup for existing and new
      state.
    </P>

    <P>
      The ideal scenario is that we’re able to update the code on a per-module
      basis. It wouldn’t make sense to restart the socket connection, for
      example, if we can get away with just updating the modified component’s
      code. Our ideal architecture for hot-code pushing is thus <em>modular</em>
      .
    </P>

    <P>
      But the next challenge is that modules should be able to be re-evaluated
      without introducing undesirable side effects. This is where an
      architecture like the one proposed by{" "}
      <a href={links[29]} target="_blank">
        React
      </a>{" "}
      comes particularly handy. If a component code is updated, its logic can be
      trivially re-executed and the DOM efficiently updates. An exploration of
      this concept by Dan Abramov can be{" "}
      <a href={links[30]} target="_blank">
        found here
      </a>
      .
    </P>

    <P>
      In essence, the idea that you <em>render to</em> the DOM (or{" "}
      <em>paint</em> it) is what significantly helps with hot code swapping. If
      state was kept in the DOM, or event listeners where set up manually by
      your application, updating code would become a much more complicated task.
    </P>

    <H2 id="predict-behavior">7. Predict behavior</H2>

    <TLDR>Negative latency.</TLDR>

    <P>
      A rich JavaScript application can have mechanisms in place for predicting
      the <em>eventual user input</em>.
    </P>

    <P>
      The most common application of this idea is to preemptively request data
      from the server before an action is consummated. Starting to fetch data
      when you hover a hyperlink so that it’s ready when it’s clicked is a
      straightforward example.
    </P>

    <P>
      A slightly more advanced method is to monitor mouse movement and analyze
      its trajectory to detect “collisions” with actionable elements like
      buttons. A{" "}
      <a href={links[31]} target="_blank">
        jQuery example
      </a>
      :
    </P>

    <Figure desc="jQuery plugin that predicts the mouse trajectory">
      <Image src="https://cldup.com/VZ7GRJR3Rl.gif" />
    </Figure>

    <H2 id="conclusion">Conclusion</H2>

    <P>
      The web remains one of the most versatile mediums for the transmission of
      information. As we continue to add more dynamism to our pages, we must
      ensure that we retain some of its great historical benefits while we
      incorporate new ones.
    </P>

    <P>
      Pages interconnected by hyperlinks are a great building block for any type
      of application. Progressive loading of code, style and markup as the user
      navigates through them will ensure great performance without sacrificing
      interactivity.
    </P>

    <P>
      New unique opportunities have been enabled by JavaScript that, once
      universally adopted, will ensure the best possible user experience for the
      broadest and freest platform in existence.
    </P>

    <style jsx>{`
      .translations {
        color: #666;
      }
    `}</style>
  </Post>
));

const links = [
  "http://yosuke-furukawa.hatenablog.com/entry/2014/11/14/141415",
  "http://habrahabr.ru/post/242429/",
  "http://wmonline.ucoz.com.br/publ/melhores_praticas/usabilidade/7_principios_de_aplicacoes_rich_web_e/22-1-0-35",
  "https://cloudup.com/blog/the-need-for-speed",
  "https://cloudup.com/blog/introducing-mydb",
  "http://nodejs.org/",
  "https://tessel.io/",
  "http://web.stanford.edu/class/cs101/",
  "http://www.stuartcheshire.org/rants/latency.html",
  "http://modernweb.com/2014/03/10/is-jquery-too-big-for-mobile/",
  "http://chimera.labs.oreilly.com/books/1230000000545/ch02.html#thats_four_rou",
  "https://docs.google.com/presentation/d/1MtDBNTH1g7CZzhwlJ1raEJagA8qM3uoV7ta6i66bO2M/present#slide=id.g3eb97ca8f_10",
  "https://varvy.com/pagespeed/prioritize-visible-content.html",
  "http://danlec.com/blog/stackoverflow-in-4096-bytes",
  "http://www.chromium.org/spdy/link-headers-and-server-hint",
  "http://1997.webhistory.org/www.lists/www-talk.1993q1/0260.html",
  "https://gist.github.com/rauchg/3e1b2d7529009370b986",
  "http://en.wikipedia.org/wiki/Google#mediaviewer/File:Google1998.png",
  "http://googleblog.blogspot.com/2004/12/ive-got-suggestion.html",
  "http://www.adaptivepath.com/ideas/ajax-new-approach-web-applications/",
  "http://googleblog.blogspot.com/2010/09/search-now-faster-than-speed-of-type.html",
  "http://www.marco.org/2010/11/11/my-default-png-dilemma",
  "https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications",
  "http://www.nytimes.com/2012/08/19/opinion/sunday/why-waiting-in-line-is-torture.html",
  "http://www.nngroup.com/articles/response-times-3-important-limits/",
  "http://jakearchibald.com/2014/using-serviceworker-today/",
  "https://medium.com/joys-of-javascript/beyond-pushstate-building-single-page-applications-4353246f4480",
  "https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API",
  "http://socket.io/",
  "http://facebook.github.io/react/",
  "http://gaearon.github.io/react-hot-loader/",
  "https://medium.com/@cihadturhan/a-ux-idea-i-know-where-you-are-aiming-3e00d152afb2"
];
