import Head from "next/head";
import reset from "../../css/reset";
import typography from "../../css/typography";
import colors from "../../css/colors";
import nprogress from "../../css/nprogress";
import Header from "../header";

import "nprogress";

const Main = ({ description = null, children }) => {
  return (
    <main>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {description && <meta name="description" content={description} />}
        <title>Wang QiWen's blog</title>
      </Head>

      <style jsx global>
        {reset}
      </style>
      <style jsx global>
        {colors}
      </style>
      <style jsx global>
        {nprogress}
      </style>
      <style jsx global>
        {typography}
      </style>

      <Header />

      {children}

      <style jsx>{`
        main {
          padding: 10px;

          width: 590px;
          min-height: 700px;
          border: 1px solid #e4d9c3;
          margin: 4px 0;
          float: left;
          background: url(images/frontmainslice.jpg) bottom left repeat-x;
        }
        @media (max-width: 600px) {
          main {
            padding: 20px;

            width: 590px;
            min-height: 700px;
            border: 1px solid #e4d9c3;
            margin: 4px 0;
            float: left;
            background: url(images/frontmainslice.jpg) bottom left repeat-x;
          }
        }
      `}</style>
    </main>
  );
};

export default Main;
