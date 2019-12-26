import Post from "../../components/layouts/post";
import P from "../../components/post/paragraph";
import Header from "../../components/post/header";
import Quote from "../../components/post/quote";
import { H2, H3 } from "../../components/post/heading";
import { Ref, FootNotes, Note } from "../../components/post/footnotes";
import Code from "../../components/post/code";
import Snippet from "../../components/post/snippet";
import withViews from "../../lib/with-views";

export default withViews(({ views }) => (
  <Post>
    <Header title="ECMAScript 6" date="February 22, 2015" views={views} />

    <Quote by="Ludwig Wittgenstein">
      The limits of my language mean the limits of my world.
    </Quote>

    <P>
      For the past few months I’ve been exclusively writing ECMAScript 6 code by
      taking advantage of transpilation
      <Ref id="1" /> to a currently supported version of JavaScript.
    </P>

    <P>
      ECMAScript 6, henceforth ES6 and formerly ES.next, is the latest version
      of the specification. As of August 2014 no new features are being
      discussed, but details and edge cases are still being sorted out. It’s
      expected to be completed and published mid-2015.
    </P>

    <P>
      Adopting ES6 has simultaneously resulted in increased productivity (by
      making my code more succinct) and eliminated entire classes of bugs by
      addressing common JavaScript gotchas.
    </P>

    <P>
      More importantly, however, it’s reaffirmed my belief in an evolutionary
      approach towards language and software design as opposed to{" "}
      <a href={links[1]} target="_blank">
        clean-slate recreation
      </a>
    </P>

    <P>
      This should be fairly obvious to you if you’ve been using CoffeeScript,
      which set out to focus on the good parts of JS and hide the broken ones.
      ES6 has been able to adopt a lot of CoffeeScript’s great innovations in a
      non-disruptive way, to such an extent that some have even questioned its{" "}
      <a href={links[2]} target="_blank">
        role moving forward
      </a>
      .
    </P>

    <Quote
      by={
        <a href={links[3]} style={{ textDecoration: "none" }}>
          @raganwald
        </a>
      }
    >
      For all intents and purposes, JavaScript has merged CoffeeScript into
      master.  I call that a victory for making things and trying them out.
    </Quote>

    <P>
      Instead of making a thorough review of{" "}
      <a href={links[4]} target="_blank">
        all the new features
      </a>
      , I’ll point out the most interesting ones. To incentivize developers to
      upgrade, new languages or frameworks need to (1) feature a compelling
      compatibility story and (2) give you a{" "}
      <a href={links[5]} target="_blank">
        big enough carrot
      </a>
      .
    </P>

    <H2 id="the-module-syntax">The module syntax</H2>

    <P>
      ES6 introduces <b>syntax</b> for defining modules and declaring
      dependencies. I emphasize the word syntax because ES6 is not concerned
      with the actual implementation details of how modules are fetched or
      loaded.
    </P>

    <P>
      This further strengthens the <b>interoperability</b> between the different
      contexts in which JavaScript can be executed.
    </P>

    <P>
      Up to now, no guidelines existed for how to actually do this. A common
      approach is to introduce a function declaration:
    </P>

    <P>
      Consider as an example the simple task of writing a reusable
      implementation of{" "}
      <a target="_blank" href={links[6]}>
        CRC32
      </a>{" "}
      in JavaScript.
    </P>

    <P>
      Up to now, no guidelines existed for how to actually do this. A common
      approach is to introduce a function declaration:
    </P>

    <Snippet>{`function crc32 () {
  // …
}`}</Snippet>

    <P>
      With the caveat, of course, that it introduces a single fixed global name
      that other parts of the code will have to refer to. And from the
      perspective of the code that uses that <Code>crc32</Code> function,
      there’s no way to declare the dependency. One just has to assume the
      function will exist prior to the code’s interpretation.
    </P>

    <P>
      With this situation in mind, Node.JS led the way with the introduction of
      the <Code>require</Code> runtime function and the{" "}
      <Code>module.exports</Code> and <Code>exports</Code> objects. Despite
      succeeding in creating a thriving ecosystem of modules around it, the
      interoperability possibilities were still somewhat limited.
    </P>

    <P>
      A common scenario to illustrate this is the generation of browser bundles
      of modules, with tools like{" "}
      <a href={links[7]} target="_blank">
        browserify
      </a>{" "}
      or{" "}
      <a href={links[8]} target="_blank">
        webpack
      </a>
      . These can only be conceived because they treat <Code>require()</Code> as
      syntax, effectively ridding it of its inherent dynamism.
    </P>

    <P>
      If you’re trying to transport code to the browser, the following is not
      subject to static analysis and therefore breaks:
    </P>

    <Snippet>require(woot() + ‘_module.js’)</Snippet>

    <P>
      In other words, the packer’s algorithm can’t possibly know what{" "}
      <Code>woot()</Code> means ahead of time.
    </P>

    <P>
      ES6 has introduced the right set of restrictions while accomodating for
      most existing use cases, drawing inspiration from most of the
      informally-specified ad-hoc module systems out there, like jQuery’s{" "}
      <Code>$</Code>.
    </P>

    <P>
      The syntax does take some getting used to. The most common pattern for
      dependency definitions is surprisingly impractical.
    </P>

    <P>The following code:</P>

    <Snippet>import crc32 from ‘crc32’</Snippet>

    <P>works for</P>

    <Snippet>{"export default function crc32(){}"}</Snippet>

    <P>but not for</P>

    <Snippet>export function crc32(){}</Snippet>

    <P>
      the latter is considered a <em>named export</em> and requires the{" "}
      <Code>{"{ }"}</Code> syntax in the import statement:
    </P>

    <Snippet>{"import { crc32 } from ‘crc32’"}</Snippet>

    <P>
      In other words, the simplest (and arguably most desirable) form of module
      definition requires the extra default keyword. Or in the absence of that,
      the usage of <Code>{"{ }"}</Code> when importing.
    </P>

    <H2 id="destructuring">Destructuring</H2>

    <P>
      One of the most common patterns that has emerged in modern JavaScript code
      is the usage of option objects.
    </P>

    <P>
      So common is this practice that newly specified browser APIs, like
      WHATWG’s{" "}
      <a href={links[9]} target="_blank">
        fetch
      </a>{" "}
      (a modern substitute for XMLHttpRequest) follow it:
    </P>

    <Snippet>{`fetch(‘/users’, {
  method: ‘POST’,
  headers: {
    Accept: ‘application/json’,
    ‘Content-Type’: ‘application/json’
  },
  body: JSON.stringify({
    first: ‘Guillermo’,
    last: ‘Rauch’
  })
})`}</Snippet>

    <P>
      The widespread adoption of this pattern has effectively prevented the
      JavaScript ecosystem from falling into{" "}
      <a href={links[10]} target="_blank">
        The Boolean Trap
      </a>
      .
    </P>

    <P>
      If said API accepted regular parameters as opposed to an options object,
      calling fetch would be an exercise in argument order memorization and the
      typing of the <Code>null</Code> keyword.
    </P>

    <Snippet>{`// artistic rendition of a nightmare alternative world
fetch(‘/users’, ‘POST’, null, null, {
  Accept: ‘application/json’,
  ‘Content-Type’: ‘application/json’
}, null, JSON.stringify({
  first: ‘Guillermo’,
  last: ‘Rauch’
}))`}</Snippet>

    <P>
      On the implementation side of things, however, things haven’t looked
      nearly as pretty. Looking at the function’s declaration signature is no
      longer descriptive of its input’s possibilities:
    </P>

    <Snippet>{`
function fetch(url, opts){
  // …
}`}</Snippet>

    <P>
      Usually followed by the manual assignment of defaults to local variables:
    </P>

    <Snippet>{`opts = opts || {}
var body = opts.body || ''
var headers = opts.headers || {}
var method = opts.method || 'GET'`}</Snippet>

    <P>
      And unfortunately for us, despite being common, the <Code>||</Code>{" "}
      practice actually introduces subtle bugs. In this case we’re not admitting
      that <Code>opts.body</Code> could be 0, so robust code would most likely
      look like:
    </P>

    <Snippet>var body = opts.body === undefined ? '' : opts.body</Snippet>

    <P>
      Thanks to destructured parameters we can at once clearly define the
      parameters, properly set defaults and expose them to the local scope:
    </P>

    <Snippet>{`fetch(url, { body='', method='GET', headers={} }){
  console.log(method) // no opts. everywhere!
`}</Snippet>

    <P>
      As a matter of fact, defaults can also apply to the entire object
      parameter as well:
    </P>

    <Snippet>{`fetch(url, { method='GET' } = {}){
  // the second parameter defaults to {}
  // the following will output "GET":
  console.log(method)
}`}</Snippet>

    <P>You can also destructure with the assignment operator as follows:</P>

    <Snippet>{`var { method, body } = opts`}</Snippet>

    <P>
      This is reminiscent to me of the expressiveness granted by{" "}
      <Code>with</Code>, without the magic or negative performance implications.
    </P>

    <H2 id="new-conventions">New Conventions</H2>

    <P>
      Some parts of the language have been altogether replaced with better
      alternatives that’ll quickly become a new default for how you write
      JavaScript.
    </P>

    <P>I’ll go over some of them.</P>

    <H3 id="let-and-const-over-var">let/const over var</H3>

    <P>
      Instead of writing <Code>var x = y</Code> you’ll most likely be writing{" "}
      <Code>let x = y</Code>. let scopes your variable definition to the block
      it’s defined in:
    </P>

    <Snippet>{`if (foo) {
  let x = 5
  setTimeout(function(){ 
    // x is \`5\` here   
  }, 500)
}
// x is \`undefined\` here`}</Snippet>

    <P>
      This is especially useful for <Code>for</Code> or <Code>while</Code>{" "}
      loops:
    </P>

    <Snippet>{`for (let i = 0; i < 10; i++) {}
// \`i\` doesn't exist here.`}</Snippet>

    <P>
      When you want to ensure{" "}
      <a href="https://mathiasbynens.be/notes/es6-const" target="_blank">
        binding immutability
      </a>{" "}
      with the same semantics as <Code>let</Code>, use <Code>const</Code>{" "}
      instead.
    </P>

    <H3 id="template-strings">template strings over concatenation</H3>

    <P>
      With the lack of <Code>sprintf</Code> or similar utilities in the standard
      JavaScript library, composing strings has always been more painful than it
      should.
    </P>

    <P>
      Template strings make the embedding of expressions trivial, as well as
      support for multiple lines. Simply replace <Code>‘</Code> with{" "}
      <Code>`</Code>.
    </P>

    <Snippet>{`let str = \`
  Hello \${first}. 
  We are in the year \${new Date().getFullYear()}
\``}</Snippet>

    <H3 id="class-over-prototypes">class over prototypes</H3>

    <P>
      Defining a class was cumbersome and required a deep understanding of the
      language internals. Even though it’s still obviously useful to grasp the
      inner-workings, the barrier to entry to newcomers was unnecessarily high.
    </P>

    <P>
      <Code>class</Code> offers syntax sugar for defining a constructor{" "}
      <Code>function</Code>, the methods within <Code>prototype</Code> and
      getters / setters. It also provides prototypical inheritance with syntax
      alone (no utilities or 3rd party modules).
    </P>

    <Snippet>{`class A extends B {
  constructor(){}
  method(){}
  get prop(){}
  set prop(){}
}`}</Snippet>

    <P>
      I initially was surprised to learn classes are not hoisted (explanation{" "}
      <a href={links[11]} target="_blank">
        here
      </a>
      ). You should therefore think of them translating roughly to{" "}
      <Code>{`var A = function(){}`}</Code> as opposed to{" "}
      <Code>{`function A(){}`}</Code>.
    </P>

    <H3 id="fat-arrow-over-function">()=> over function</H3>

    <P>
      Not only is <Code>{`(x, y) => {}`}</Code> shorter to write than{" "}
      <Code>{`function (x,y) {}`}</Code>, but the behavior of this within the
      function body will most likely refer to what you want.
    </P>

    <P>
      The so-called “fat arrow” functions are <em>lexically bound</em>. Consider
      the example of a method within a class that launches two timers:
    </P>

    <Snippet>{`class Person {
  constructor(name){
    this.name = name
  }

  timers(){
    setTimeout(function(){
      console.log(this.name)
    }, 100)

    setTimeout(() => {
      console.log(this.name)
    }, 100)
  }
}`}</Snippet>

    <P>
      To the dismay of newcomers to the language, the first timer (using{" "}
      <Code>function</Code>) will log <Code>"undefined"</Code>. The second one
      will now correctly log name.
    </P>

    <H2 id="async-io">First-class support for async I/O</H2>

    <P>
      Asynchronous code execution has been around for almost the entire history
      of the language. <Code>setTimeout</Code>, after all, was introduced around
      the time JavaScript 1.0 came out.
    </P>

    <P>
      But arguably, the language didn’t <em>really support</em> it. The return
      value of function calls that scheduled “future work” is normally{" "}
      <Code>undefined</Code>, or in the case of <Code>setTimeout</Code> a{" "}
      <Code>Number</Code>.
    </P>

    <P>
      The introduction of <Code>Promise</Code> addresses this, and by doing so
      fills a very large hole of interoperability and{" "}
      <a href={links[12]} target="_blank">
        composability
      </a>
      .
    </P>

    <P>
      On one hand, APIs you’ll encounter become wholly more predictable. As a
      test of this, consider the new <Code>fetch</Code> API. How does it work
      beyond the signature we described? You guessed right. It returns a{" "}
      <Code>Promise</Code>.
    </P>

    <P>
      If you’ve used Node.JS in the past, you know that there’s an informal
      contract that callbacks will follow the signature:
    </P>

    <Snippet>{`function (err, result){}`}</Snippet>

    <P>
      Also informally specified is the idea that callbacks will fire{" "}
      <em>only once</em>. And that <Code>null</Code> will be the value in the
      absence of an error (and not <Code>undefined</Code> or <Code>false</Code>
      ). Except, this might not always{" "}
      <a href={links[13]} target="_blank">
        be the case
      </a>
      .
    </P>

    <H2 id="towards-the-future">Towards the future</H2>

    <P>
      ES6 is gaining a lot of momentum in the ecosystem.{" "}
      <a href={links[14]} target="_blank">
        Chrome
      </a>{" "}
      and{" "}
      <a href={links[15]} target="_blank">
        io.js
      </a>{" "}
      have already incorporated some of its features. A lot has already been
      written about it.
    </P>

    <P>
      But what’s worth pointing out is that this momentum has been largely
      enabled by <em>transpilation</em> rather than actual support.{" "}
      <a href={links[16]} target="_blank">
        Great tools
      </a>{" "}
      have emerged to enable transpiling and polyfilling, and browsers have over
      time added proper debugging and error reporting support for them (through
      source maps).
    </P>

    <P>
      The evolution of the language and its proposed features are outpacing
      implementation. As mentioned above, <Code>Promise</Code> is genuinely
      exciting as a building block alone, but consider the benefits of solving{" "}
      <a href={links[17]} target="_blank">
        the callback problem
      </a>{" "}
      once and for all.
    </P>

    <P>
      <b>ES7</b> is poised to do this by introducing the possibility of{" "}
      <Code>await</Code>-ing a promise:
    </P>

    <Snippet>{`async function uploadAvatar(){
  let user = await getUser()
  user.avatar = await getAvatar()
  return await user.save()
}`}</Snippet>

    <P>
      Even though the spec is in its{" "}
      <a href={links[18]} target="_blank">
        early discussions
      </a>
      , the same tool that compiles ES6 to ES5 already{" "}
      <a href={links[19]} target="_blank">
        enables it
      </a>
      .
    </P>

    <P>
      There’s still substantial work left to do to make sure the process of
      adopting new language syntax and APIs becomes even more friction-less to
      those getting started.
    </P>

    <P>But one thing is for certain: we must embrace the moving target.</P>

    <FootNotes>
      <Note id="1">
        I use the word “transpilation” throughout the article on the basis of
        its popularity to refer to JavaScript source-to-source compilation. That
        aside, the merits of the term are{" "}
        <a href={links[0]} target="_blank">
          technically debatable
        </a>
        .
      </Note>
    </FootNotes>
  </Post>
));

const links = [
  "https://twitter.com/fogus/status/550717447163355136",
  "http://www.sigcomm.org/sites/default/files/ccr/papers/2008/January/1341431-1341436.pdf",
  "https://github.com/jashkenas/coffeescript/issues/3859",
  "https://twitter.com/raganwald/status/555386257233027073",
  "https://github.com/lukehoban/es6features",
  "http://teddziuba.tumblr.com/post/26426290981/python-3s-marketing-problem",
  "http://en.wikipedia.org/wiki/Cyclic_redundancy_check",
  "http://browserify.org/",
  "https://github.com/webpack/webpack",
  "https://fetch.spec.whatwg.org/",
  "http://ariya.ofilabs.com/2011/08/hall-of-api-shame-boolean-trap.html",
  "https://esdiscuss.org/history/2014-06-05T15%3A54%3A16.000Z-rossberg.google.com?path=%2Ftopic%2Fin-es6-strict-mode-do-function-declarations-within-a-block-hoist",
  "https://blog.jcoglan.com/2011/03/11/promises-are-the-monad-of-asynchronous-programming/",
  "https://medium.com/code-adventures/farewell-node-js-4ba9e7f3e52b#7cda",
  "https://twitter.com/addyosmani/status/541978036904554496",
  "https://iojs.org/en/es6.html",
  "http://babeljs.io/",
  "http://tirania.org/blog/archive/2013/Aug-15.html",
  "https://esdiscuss.org/notes/2014-01-30#async-await",
  "http://babeljs.io/docs/usage/transformers/#async-to-generator"
];
