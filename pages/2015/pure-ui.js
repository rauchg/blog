import Post from "../../components/layouts/post";
import Header from "../../components/post/header";
import P from "../../components/post/paragraph";
import HR from "../../components/post/hr";
import Code from "../../components/post/code";
import Snippet from "../../components/post/snippet";
import { Ref, FootNotes, Note } from "../../components/post/footnotes";
import Figure, { Image } from "../../components/post/figure";
import loadScript from "load-script";
import withViews from "../../lib/with-views";

export default withViews(({ views }) => (
  <Post>
    <Header title="Pure UI" date="July 13, 2015" views={views} />

    <P>
      I recently redesigned and implemented a new version of{" "}
      <a href={links[0]} target="_blank">
        VideoPress
      </a>
      , the{" "}
      <a href={links[1]} target="_blank">
        WordPress
      </a>{" "}
      video platform.
    </P>

    <P>
      The process involved, among other things, creating a new UI, ditching the
      dependency on Flash in favor of HTML5 <Code>&lt;video&gt;</Code> and
      introducing new functionality.
    </P>

    <P>
      The particular way in which I implemented it led me to some interesting
      insights around the <b>growing convergence</b> of the designer and
      programmer roles.
    </P>

    <P>
      In the short term, as I’ll show, the communication between the programmer
      and designer will improve dramatically by becoming well technically
      delineated.
    </P>

    <P>
      And if I’m allowed to extrapolate, a clear path is now laid out towards a
      future where the steps to go from sketch to design to implementation are
      greatly more accessible to everyone with an idea.
    </P>

    <HR />

    <P>
      A lot has been written about the merits of React as a library. Today I’m
      compelled to write about the benefits of a{" "}
      <a href={links[3]} target="_blank">
        programming model
      </a>
      <Ref id="1" /> it enables and its implications to the design and creation
      workflow.
    </P>

    <P>
      The fundamental idea I want to discuss is the definition of an
      application’s UI as <b>a pure function of application state</b>.
    </P>

    <P>
      A pure function is one that exhibits the property of substitution:
      replacing a call with its returned value should make the program
      equivalent. As an example, <Code>concat('hello', 'world')</Code> can be
      substituted with <Code>'hello world'</Code> without changing the behavior
      of your program.
    </P>

    <P>
      How can we apply this to a graphical user interface? By having the
      function return an abstract representation of widgets (or markup) to be
      rendered on the screen:
    </P>

    <Snippet>{`function videoplayer({ title, src } = {}){
  if (src) {
    return div(
      div({ 'class': 'title' }, title),
      video({ autoplay: true, loop: true, src })
    );
  } else { 
    return div('No video to load');
  }
}`}</Snippet>

    <P>
      If I call the videoplayer function with no parameters, I’ll consistently
      get a <Code>&lt;div&gt;No video to load&lt;/div&gt;</Code> back. If I call
      it with <Code>'Charlie bit mey'</Code> and <Code>'charlie.mp4'</Code> I’ll
      likewise get the titlebar and video I expect.
    </P>

    <P>
      Since I’m not returning the actual DOM elements (no{" "}
      <Code>document.createElement</Code>) or performing any real rendering, we
      can think of this function as one that performs mappings between an input
      (my parameters) and an output (the virtual dom).
    </P>

    <P>
      If throughout the lifetime of the program the parameters change (let’s say
      there’s a new video to play or the user performs an action), the function
      is called again with new parameters and the rendered view is updated.
    </P>

    <P>
      With this model in place, the programmer is thus relieved from the burden
      of specifying the transition between states (or transformation) of the UI
      over time. No need to specify how to go from <b>A</b> to <b>B</b>: just
      describe what <b>A</b> looks like and what <b>B</b> looks like, in a
      discrete way.
    </P>

    <HR />

    <P>
      UI designers have been intuitively “programming” in this way for some time
      now, arguably in a more direct way.
    </P>

    <P>
      While design specifications were usually drawn out on a single canvas, the
      rise of mobile has forced the industry to think about varying screen sizes
      (responsiveness).
    </P>

    <P>
      <b>Artboards</b> have become the de-facto standard
      <Ref id="2" /> to convey how a certain UI is supposed to be rendered for
      each configuration in graphics software. They allow the creator to shape
      and position each canvas where elements are placed.
    </P>

    <P>
      This is what a designer’s handout looks like when using artboards to
      represent the same content for desktop and for mobile:
    </P>

    <Figure wide>
      <Image src="https://cldup.com/JDDxCgEoBj.png" />
    </Figure>

    <P>
      We can think of the example above as the same Socket.IO{" "}
      <Code>dashboard()</Code> UI function but with different parameters. The
      second artboard represents the invocation{" "}
      <Code>{"dashboard({ width: 375 })"}</Code>.
    </P>

    <Snippet>{`function dashboard({ width, num }){
  // with proper access to the layout data
  // data CSS media queries can be redundant
  if (width > 375) {
    return div('Twitter followers', prettify(num));
  } else {
    return div('Twitter', abbreviate(num));
  }
}`}</Snippet>

    <P>
      Moreover, seasoned designers have recognized the need for further
      specification. This can be seen in the popularization of UI styleguides,
      such as the following example from{" "}
      <a href={links[6]} target="_blank">
        Github Primer
      </a>
      .
    </P>

    <Figure wide>
      <Image src="https://cldup.com/AgHrso5cqp.png" />
    </Figure>

    <P>
      CSS and HTML being fully declarative have lent themselves very well to
      this task.
    </P>

    <P>
      We can now think of this as the base function being the{" "}
      <Code>&lt;button&gt;</Code>, and its parameters being the{" "}
      <Code>class="btn-sm"</Code> or <Code>disabled</Code>. The button produces
      different outputs depending on the supplied parameters, which can be
      combined: <Code>&lt;button class="btn-sm btn-outline"&gt;</Code>,{" "}
      <Code>&lt;button disabled class="btn-outline"&gt;</Code>, and so on.
    </P>

    <HR />

    <P>
      With this paradigm in mind, I set out to realize the different main states
      of the video player with my design tool.
    </P>

    <Figure wide>
      <Image src="https://cldup.com/iIIdwqx6y4.png" />
    </Figure>

    <P>These answer the questions of what the player would look like when</P>

    <P>
      … the video is converting on the backend and not ready for playback yet
      <br />
      … the video has been removed due to DMCA
      <br />
      … a connection or server error occured
      <br />
      … the video is not G rated and the person is asked to enter their age
      <br />
      … the video was playing but no further data was received
      <br />… the user hovers the progress bar
    </P>

    <P>
      The main issue, however, is that underestimating the size of the state
      space is actually very easy. In other words, it’s difficult to come up
      with the complete list of questions that your UI needs to answer.
    </P>

    <P>
      It’s easy because the experience we’re discussing fundamentally revolves
      around just watching video. Every other state can be seen as exceptional
      in the same way errors are. Without careful consideration, it could be
      wrongly reduced to “just <Code>&lt;video&gt;</Code> and a few extra divs”.
    </P>

    <P>
      Through this lens, one can hazard an explanation for the age-old problem
      of poor software development estimates. When the <em>magnitude</em> of the
      undertaking is not clear for the developer or designer, let alone for the
      people removed from the creation process, it’s simply impossible to make
      any accurate predictions.
    </P>

    <P>
      Unlike other projects I’d worked on in the past, the next step of the
      implementation almost perfectly matched the design workflow. I broke down
      the initial design into even smaller functions that would be rendered into
      HTML artboards.
    </P>

    <P>
      Since these functions are essentially acting as mappings between data and
      UI, I created a simple JSON file that would describe the different
      parameters for each state.
    </P>

    <Snippet>{`{
  "title": "Thumb tooltip",
  "views": [
    [
      {
        "title": "Default",
        "require": "../views/thumb-tip",
        "params": {
          "width": 136,
          "height": 78,
          "css": true
        }
      },
      {
        "title": "Custom offset (30px)",
        "require": "../views/thumb-tip",
        "params": {
          "width": 136,
          "height": 78,
          "tipLeft": 30
        }
      },
      {
        "title": "Custom offset (left edge)",
        "require": "../views/thumb-tip",
        "params": {
          "width": 136,
          "height": 78,
          "tipLeft": 0
        }
      },
      // …`}</Snippet>

    <Figure wide>
      <div id="demo1" className="pure-ui-demo"></div>
    </Figure>

    <P>
      Throughout this exercise it became apparent that there was more to the
      project than what I had contemplated in my original plan.
    </P>

    <P>
      As an example, it wasn’t enough just to consider a state where there’s a
      tooltip on top of the progress bar. But also what happens if the tip is
      positioned to the leftmost or rightmost edge of the toolbar. Or if it’s
      triggered without the image having loaded yet.
    </P>

    <P>
      In many cases, it’s necessary to go back to the design tool and represent
      these new states adequately. For the tips, I had to split the triangle in
      half if they approach the boundaries of the player. I added a state to
      display when the image grid is not loaded yet. And so on. The tooltip
      alone expanded into the 6 representations seen above.
    </P>

    <HR />

    <P>
      This allows us to make a distinction of two very distinct (yet frequently
      interleaved) phases of the creation process: <b>design</b> and{" "}
      <b>discovery</b>.
    </P>

    <P>
      Design is the process of taking the available data and coming up with its
      representation. The outcome is reasonably well specified and understood.
    </P>

    <P>
      Discovery is about the transformation (usually expansion) of that input.
      It’s the evolution of the design. The uncovering of new states and new
      ideas throughout the process itself.
    </P>

    <P>
      Even the most careful designer that can anticipate -due to their extensive
      experience and ability- a wide range of scenarios will necessarily
      participate in this feedback loop.
    </P>

    <P>
      First, there’s a potentially infinite number of permutations of the
      parameters they’re trying to design. Only some of the combinations can
      (and should) be considered at the design stage.
    </P>

    <P>
      An example from this project is the conversion phase of the video. While
      the video is converting, I intended to show a blurred out thumbnail with a
      progress bar that notifies the user in realtime.
    </P>

    <Figure wide>
      <div id="demo2" className="pure-ui-demo"></div>
    </Figure>

    <P>
      Once rendered, I incorporated a <Code>[+]</Code> icon (which you can click
      above) to modify the parameters with which the view was invoked and
      rendered.
    </P>

    <P>
      One can then experiment and modify the parameters (or potentially
      introduce some{" "}
      <a href={links[7]} target="_blank">
        chaos
      </a>
      ) and get direct feedback.
    </P>

    <P>
      In this case, clicking and dragging the numbers to alter the dimensions of
      the player allows us to see how it would perform in the real world beyond
      just the breakpoints specified by the designer, like iPhone or iPad size.
    </P>

    <P>
      When a parameter is recognized as an image, an extra link is added to
      retrieve a random image from{" "}
      <a href={links[8]} target="_blank">
        imgur
      </a>
      . It turns out that light images were actually not very friendly to the
      particular design I picked for the progress bar, and it had to be
      revisited. Adding some shadows made it perform well with a wide range of
      photos:
    </P>

    <Figure>
      <Image src="https://cldup.com/KK_maFpl8V.gif" />
    </Figure>

    <P>
      Another way in which discovery occurs, usually more painstakingly, is in
      the <em>implementation</em> process itself.
    </P>

    <P>
      In the case of video streaming, something that can be easily overlooked
      (which falls under the category of “errors”) is that the download of the
      video can stall completely. When this happens, the <em>MediaElement</em>{" "}
      API emits a <em>stalled</em> event.
    </P>

    <P>
      Both designer and developer can be oblivious to details like that
      initially. But under this model, the communication between the designer
      and developer now consists of a very clear <b>protocol</b>.
    </P>

    <P>
      The next step is for the design mockup to be created for the player but
      with the extra parameter <Code>{"{ stalled: true }"}</Code>. And so the
      TODO list expands, but in a way that neatly breaks down responsibilities.
    </P>

    <P>
      This workflow brings us closer to understanding the <b>completeness</b> of
      implementation in a very direct way. If you think up and hand out 20
      distinct states in which your application can behave, then you should be
      able to clearly see them rendered on a screen as HTML. If only 10 are
      done, then the implementation is only 50% done.
    </P>

    <P>
      To contrast this, consider a simple payment form with jQuery. The server
      responds <Code>200</Code> if the payment succeeds, or <Code>400</Code>{" "}
      otherwise. The programmer that’s in charge of implementing this writes:
    </P>

    <Snippet>{`function pay(){ 
  $.ajax({ url: ‘/api/pay’ })
    .fail(() => $(‘#msg-error’).show())
    .success( () => {
      $('#payment').hide();
      $('#msg-success').show();
    });
 }`}</Snippet>

    <P>
      What if we now wanted to see the two states this procedure can yield, to
      assess our progress?
    </P>

    <P>
      The only way one could confidently determine the correctness and
      completeness of the implementation would be actually executing the code.
      In a simple case like this, the task would be to ensure that both logical
      branches (failure and success) are executed.
    </P>

    <P>
      This, in practice, can actually be quite convoluted. Applications must
      handle different states that are difficult to replicate under normal
      testing conditions.{" "}
      <a href={links[9]} target="_blank">
        They must
      </a>{" "}
      provide answers to questions like “what if this network call is taking too
      long?”, “what if it the response doesn’t come back?” and “what if the
      server returns an error?”, among others.
    </P>

    <P>
      In addition, getting to the particular payment form in this example could
      be the result of more branching. You must first be logged in, maybe under
      a certain type of user, of a certain role and specific privileges, with
      some pre-existing data in their profile.
    </P>

    <HR />

    <P>
      The ideas outlined in this article can hopefully lead to the
      implementation of a workflow that maximizes productivity, efficiency,
      correctness and completeness.
    </P>

    <P>
      Mapping out your application in this way can not only allow you to measure
      progress but also complexity. Are there too many steps? Too many screens?
      Are they consistent?
    </P>

    <P>
      Visualizing the evolution of this map over time can shed light into how
      accurate the initial preconceptions of the task at hand were. If much of
      the map is discovered later on, it could mean that the project was
      improperly scoped or understood, and it can explain why it’s taking longer
      to ship.
    </P>

    <P>
      The design and creation of an application serves a clear goal: the
      creative representation of some data a set of users are interested in.
    </P>

    <P>
      The techniques described allow for this process to be significantly
      smoother, by ensuring that designer and programmer share a common guide.
      That being said, there’s still a very clear repetition of effort when
      translating these creative ideas from our minds to the medium.
    </P>

    <P>
      As we continue to refine our understanding of the entire process, our
      tools will follow.
    </P>

    <P>
      <em>Lorem Ipsum</em> has had a good run. Let’s replace it with data.
    </P>

    <FootNotes>
      <Note id="1">
        In general, comparing libraries or frameworks in terms of features seems
        inferior to examining the model it imposes on the programmer. The latter
        will inform you about how well the code will fare over time as the
        product matures and the team grows, but the former won’t. It will also
        empower you to foresee what the evolutionary path of the technology
        looks like.
      </Note>
      <Note id="2">
        Artboards were initially introduced by Illustrator as a way of grouping
        related designs together, such as a{" "}
        <a href={links[4]} target="_blank">
          company’s business stationary
        </a>
        .<br />
        <a href={links[5]} target="_blank">
          Sketch
        </a>{" "}
        popularized its usage to represent designs targing varying devices and
        screen sizes, and Photoshop is now incorporating the feature.
      </Note>
    </FootNotes>

    {/* side effects from the third-party demo codebase */}
    <Demos />
    <style jsx>{`
      .pure-ui-demo {
        vertical-align: top;
        padding: 15px 0 0;
        text-align: left;
        position: relative;
      }

      #demo1.loaded {
        padding-bottom: 10px;
      }

      #demo1.loaded::after {
        content: "Hint: click [+] to edit!";
        font-size: 11px;
        position: absolute;
        left: 0px;
        bottom: 15px;
        color: #999;
      }

      #demo2 {
        max-width: 600px;
        margin: auto;
      }

      @media (max-width: 500px) {
        #demo1 {
          text-align: center;
        }

        #demo1 :global(.t) {
          text-align: left;
        }

        #demo1 :global(.options) {
          text-align: left;
        }

        #demo1 :global(.board) {
          margin-right: 0;
        }

        #demo1.loaded::after {
          content: "Hint: tap [+] to edit!";
          position: static;
        }
      }
    `}</style>
  </Post>
));

class Demos extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.onScriptLoad = this.onScriptLoad.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    document.querySelector("#demo1").innerHTML = "";
    document.querySelector("#demo2").innerHTML = "";
    if (!window.Viewer) {
      loadScript("https://cldup.com/uUo8iSbKXRh/C7isGX.js", err => {
        if (!this.mounted) return;
        if (err) return console.error("demo script load fail");
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div>
        <style jsx global>{`
          /* this is specified here until we fix a bug with :global
         * and descendants in styled-jsx */
          .pure-ui-demo .category > .t {
            display: none;
          }
        `}</style>
      </div>
    );
  }

  onScriptLoad() {
    document.querySelector("#demo1").classList.add("loaded");

    Viewer(
      [
        {
          title: "Thumb tooltip",
          views: [
            [
              {
                title: "Default",
                require: "thumbTip",
                params: {
                  width: 136,
                  height: 78,
                  css: true
                }
              },
              {
                title: "Custom offset (30px)",
                require: "thumbTip",
                params: {
                  width: 136,
                  height: 78,
                  tipLeft: 30
                }
              },
              {
                title: "Custom offset (left edge)",
                require: "thumbTip",
                params: {
                  width: 136,
                  height: 78,
                  tipLeft: 0
                }
              },
              {
                title: "Custom offset (right edge)",
                require: "thumbTip",
                params: {
                  width: 136,
                  height: 78,
                  tipLeft: 142
                }
              },
              {
                title: "Loading",
                require: "thumbTip",
                params: {
                  width: 136,
                  height: 78,
                  waiting: true
                }
              },
              {
                title: "Loaded",
                require: "thumbTip",
                params: {
                  url: "https://cldup.com/tY2dbQWFVw.png",
                  width: 136,
                  height: 78,
                  index: 38,
                  rows: 10,
                  cols: 10,
                  at: 30
                }
              }
            ]
          ]
        }
      ],
      document.querySelector("#demo1"),
      () => {}
    );

    Viewer(
      [
        {
          title: "Transcoding",
          views: [
            {
              title: "In progress (dark thumbnail)",
              require: "converting",
              params: {
                title: "The video of all galaxies that span the universe",
                bgurl: "https://cldup.com/VK_jwU0ZRK.png",
                progress: 65,
                width: "ontouchstart" in document ? 320 : 560,
                height: 315
              }
            }
          ]
        }
      ],
      document.querySelector("#demo2"),
      () => {}
    );
  }
}

const links = [
  "https://videopress.com",
  "https://wordpress.com",
  "https://en.wikipedia.org/wiki/Adobe_Flash",
  "http://lambda-the-ultimate.org/node/4561",
  "https://helpx.adobe.com/illustrator/how-to/work-with-artboards.html",
  "https://www.sketchapp.com/",
  "http://primercss.io/buttons/",
  "https://en.wikipedia.org/wiki/Fuzz_testing",
  "http://imgur.com/",
  "http://writings.quilt.org/2014/05/12/distributed-systems-and-the-end-of-the-api/#toc-ack"
];
