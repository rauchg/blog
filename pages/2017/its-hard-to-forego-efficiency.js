import Post from "../../components/layouts/post";
import Quote from "../../components/post/quote";
import P from "../../components/post/paragraph";
import Header from "../../components/post/header";
import withViews from "../../lib/with-views";

export default withViews(({ views }) => (
  <Post>
    <Header
      title="It's Hard to Forego Efficiency"
      date="March 28, 2017"
      views={views}
    />

    <P>We live in a world of tradeoffs.</P>

    <P>
      Spending some time optimizing a certain function takes your focus and time
      away from optimizing another.
    </P>

    <P>
      We all want everything to work perfectly, look beautiful, be intuitive and
      perform really well.
    </P>

    <P>This is true for your life as it is true for engineering.</P>

    <P>
      You want inbox zero, a healthy mind and body, up to date software
      development skills, design ability, a happy team, a happy family, an
      impressive bookshelf, a great social life…
    </P>

    <P>
      The problem is: You can’t spend all of your time and resources optimizing
      everything at once. Any extra minute you dedicate to an activity takes it
      away from something else.
    </P>

    <P>
      In order to make progress in any system, we learn to be ok with juggling
      many things and letting some drop to the ground.
    </P>

    <P>
      To meet a deadline, for example, you might choose to de-optimize your
      availability. Email starts piling in and meetings get rescheduled.
      Shipping is more important, right?
    </P>

    <P>When you start a new company, your website’s design might be lacking.</P>

    <P>
      When you start coding a new app, you might not document your APIs,
      thoroughly comment your code or write lots of tests.
    </P>

    <P>
      You basically learn to be ok with foregoing. But here’s a thing that I’m
      absolutely convinced you can’t forego: efficiency.
    </P>

    <P>
      My core argument is that once you’ve grown accustomed to a certain level
      of efficiency when performing a task, or a certain level of efficiency
      provided by the system or environment you are in,{" "}
      <b>it’s extraordinarily difficult to forego it</b>.
    </P>

    <P>
      For a basic example, consider a task you repeat every single day: Googling
      things. Imagine you switch to a new web browser that makes rendering
      search results take 200 milliseconds instead of, previously, 20
      milliseconds.
    </P>

    <P>
      It would be almost impossible to justify such a <em>backwards change</em>{" "}
      in your daily routine.
    </P>

    <P>
      It’s not even necessary to experience superior efficiency for a long
      period to notice this effect. Even knowing greener and more efficient
      grass is out there does the same. If at your current job deploying an app
      to production takes hours, but you know of a colleague of yours that{" "}
      <a href="https://zeit.co/now" target="_blank">
        deploys in seconds
      </a>
      , you will feel its inexorable pull.
    </P>

    <P>
      This effect is valid for any system, and by no means limited to
      programming.
    </P>

    <P>
      As an immigrant to the United States, I had to spend tireless hours
      putting together the required evidence and paperwork to become a legal
      resident.
    </P>

    <P>
      It only took me one or two visits to know that I’d be willing to spend all
      that effort and go through all the bureaucratic trouble.
    </P>

    <P>
      Every time I’d go back to my home country, I wasn’t my <em>same</em>{" "}
      productive self. Every single process felt painfully slow. Getting a bank
      account. Incorporating a company. Ordering food. Hiring a plumber. The
      work the plumber does. How the plumber got paid. The plumber wasn’t on
      time. Oh god.
    </P>

    <P>
      In{" "}
      <a href="https://www.amazon.com/World-As-I-See/dp/1494877066">
        The World As I see it
      </a>
      , Einstein shared his impressions of America, selecting this as his
      favorite trait:
    </P>

    <Quote>
      What first strikes the visitor with amazement is the superiority of this
      country, in matters of technics and organization. Objects of everyday use
      are more solid than in Europe, houses infinitely more convenient in
      arrangement. Everything is designed to save human labour. Labour is
      expensive, because the country is sparsely inhabited in comparison with
      its natural resources. The high price of labour was the stimulus which
      evoked the marvelous development of technical devices and methods of work.
    </Quote>

    <P>
      It’s hard to part ways with a more efficient web browser, imagine how hard
      it is to leave behind a more efficient country!
    </P>

    <P>
      If there is a quality worth fighting to preserve, this one is at the top
      of my list. As well as welcoming those who so keenly appreciate it and are
      eager to make their contribution.
    </P>
  </Post>
));
