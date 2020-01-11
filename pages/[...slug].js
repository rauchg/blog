import React from "react";
import ReactJSXParser from "@zeit/react-jsx-parser";
import { textBlock } from "../lib/notion/renderers";
import getPageData from "../lib/notion/getPageData";
import getBlogIndex from "../lib/notion/getBlogIndex";
import IssgIndicator from '../components/issg-indicator';
import { getBlogLink, getDateStr, getHeadingId } from "../lib/blog-helpers";

import Head from "next/head";
import withViews from "../lib/with-views";
import Post from "../components/layouts/post";
import Header from "../components/post/header";
import components from "../components/shared";

// Get the data for each blog post
export async function unstable_getStaticProps({ params: { slug } }) {
  slug = Array.isArray(slug) ? slug.join('/') : slug
  // load the postsTable so that we can get the page's ID
  const postsTable = await getBlogIndex();
  const post = postsTable[slug];

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`);
    return {
      props: {
        redirect: true
      },
      revalidate: 1
    };
  }
  const postData = await getPageData(post.id);
  post.content = postData.blocks;

  return {
    props: {
      post
    },
    revalidate: 2,
  };
}

// Return our list of blog posts to prerender
export async function unstable_getStaticPaths() {
  const postsTable = await getBlogIndex();
  return Object.keys(postsTable).map(slug => getBlogLink(slug));
}

const listTypes = new Set(["bulleted_list", "numbered_list"]);

const RenderPost = ({ post, views, redirect }) => {
  let listTagName = null;
  let listLastId = null;
  let listChildren = [];

  if (redirect) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta httpEquiv="refresh" content={`0;url=https://rauchg.com`} />
        </Head>
      </>
    );
  }

  return (
    <Post>
      <IssgIndicator />

      <Header title={post.Page} date={getDateStr(post.Date)} views={views} />
      <Head>
        <meta property="og:title" content={post.Page} />
        <meta property="og:site_name" content="Guillermo Rauch's blog" />
        <meta property="og:description" content={post.Description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rauchg" />
        <meta property="og:image" content={post["Twitter Card"] || ""} />
      </Head>

      {(!post.content || post.content.length === 0) && (
        <components.p>This post has no content</components.p>
      )}

      {(post.content || []).map((block, blockIdx) => {
        const { value } = block;
        const { type, properties, id } = value;
        const isLast = blockIdx === post.content.length - 1;
        const isList = listTypes.has(type);
        let toRender = [];

        if (isList) {
          listTagName = components[type === "bulleted_list" ? "ul" : "ol"];
          listLastId = `list${id}`;
          listChildren.push(
            React.createElement(
              components.li || "li",
              { key: id },
              textBlock(properties.title, true, id)
            )
          );
        }

        if (listTagName && (isLast || !isList)) {
          toRender.push(
            React.createElement(
              listTagName,
              { key: listLastId },
              ...listChildren
            )
          );
          listChildren = [];
          listLastId = null;
          listTagName = null;
        }

        const renderHeading = Type => {
          const children = textBlock(properties.title, true, id);
          const headingId =
            type !== "string" ? getHeadingId(children) : undefined;

          toRender.push(
            <Type key={id} id={headingId}>
              {children}
            </Type>
          );
        };

        switch (type) {
          case "page":
          case "divider":
            break;
          case "text":
            if (properties) {
              toRender.push(textBlock(properties.title, false, id));
            }
            break;
          case "image":
          case "video": {
            const { format = {} } = value;
            const { block_width } = format;
            const baseBlockWidth = 768;
            const roundFactor = Math.pow(10, 2);
            // calculate percentages
            const width = block_width
              ? `${Math.round(
                  (block_width / baseBlockWidth) * 100 * roundFactor
                ) / roundFactor}%`
              : "100%";

            const isImage = type === "image";
            const Comp = isImage ? "img" : "video";

            toRender.push(
              <Comp
                key={id}
                src={`/api/asset?assetUrl=${encodeURIComponent(
                  format.display_source
                )}&blockId=${id}`}
                controls={!isImage}
                alt={isImage ? "An image from Notion" : undefined}
                loop={!isImage}
                muted={!isImage}
                autoPlay={!isImage}
                style={{
                  boxShadow: "0 8px 8px rgba(0, 0, 0, 0.3)",
                  width,
                  maxWidth: "100%",
                  margin: "5px auto",
                  display: "block"
                }}
              />
            );
            break;
          }
          case "header":
            renderHeading("h1");
            break;
          case "sub_header":
            renderHeading(components.h2);
            break;
          case "sub_sub_header":
            renderHeading(components.h3);
            break;
          case "code": {
            if (properties.title) {
              const content = properties.title[0][0];
              const language = properties.language[0][0];

              if (language === "LiveScript") {
                // this requires the DOM for now
                toRender.push(
                  <ReactJSXParser
                    key={id}
                    jsx={content}
                    components={components}
                    componentsOnly={false}
                    renderInpost={false}
                    allowUnknownElements={true}
                    blacklistedTags={["script", "style"]}
                  />
                );
              } else {
                toRender.push(
                  <components.Code key={id}>{content}</components.Code>
                );
              }
            }
            break;
          }
          case "quote":
            if (properties.title) {
              toRender.push(
                React.createElement(components.blockquote, {
                  key: id,
                  by: "",
                  children: properties.title
                })
              );
            }
            break;
          default:
            if (process.env.NODE_ENV !== "production" && !listTypes.has(type)) {
              console.log("unknown type", type);
            }
            break;
        }
        return toRender;
      })}
    </Post>
  );
};

export default withViews(RenderPost);
