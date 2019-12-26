import Post from "../../components/layouts/post";
import Header from "../../components/post/header";
import P from "../../components/post/paragraph";
import Code from "../../components/post/code";
import { Ref, FootNotes, Note } from "../../components/post/footnotes";
import withViews from "../../lib/with-views";

export default withViews(({ views }) => (
  <Post>
    <Header title="Addressable Errors" date="February 4, 2016" views={views} />

    <P>
      One of the biggest problems with debugging is that error and warning
      messages are <b>static</b>. The only way for errors to become more useful
      and evolve is for authors to tweak them and launch a new version of their
      software.
    </P>

    <P>
      Unfortunately, some errors are rare and hard to reproduce. You might
      stumble upon them in a log-file with little context. Deploying new code is
      costly and time-consuming, and the error is not guaranteed to disappear or
      become more debuggable.
    </P>

    <P>
      There’s also a limit to how useful error messages can be by themselves
      (although it’s a very good idea to constantly{" "}
      <a target="_blank" href={links[0]}>
        improve them
      </a>
      ).
    </P>

    <P>
      The usual way to find out more about an error is to Google it to learn
      from others. But even then, user feedback tends to be scattered in many
      different places, some of which the project’s authors hardly ever visit.
    </P>

    <P>
      The solution is simple: <b>attach URLs</b>
      <Ref id="1" /> to all your errors and make them collaborative
      <Ref id="2" />. GitHub wikis, gists or issues are good candidates for
      hosting these. Bonus points: shorten them to make{" "}
      <a target="_blank" href={links[1]}>
        live debugging
      </a>{" "}
      easier.
    </P>

    <FootNotes>
      <Note id="1">
        The inspiration for this portion came from seeing{" "}
        <Code>
          <a target="_blank" href={links[2]}>
            {links[2]}
          </a>
        </Code>{" "}
        in Web Inspector a bunch of times.
      </Note>
      <Note id="2">
        User comments about best-practices, errors and snippets in combination
        with permalinks made the{" "}
        <a target="_blank" href={links[3]}>
          PHP manual
        </a>{" "}
        one of the best resources for newcomers and experts alike.
      </Note>
    </FootNotes>
  </Post>
));

const links = [
  "http://elm-lang.org/blog/compiler-errors-for-humans",
  "https://i.imgur.com/OANtEbP.jpg",
  "http://fb.me/react-warning-keys",
  "http://php.net/manual/en/keyword.paamayim-nekudotayim.php#69537"
];
