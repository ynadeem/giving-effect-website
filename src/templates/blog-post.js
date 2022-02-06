import Content, { HTMLContent } from "../components/Content";
import { Link, graphql } from "gatsby";

import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import React from "react";
import { kebabCase } from "lodash";

// eslint-disable-next-line
export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  publishDate,
  featuredImage,
  imageBanner,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  console.log(imageBanner);

  return (
    <div className="relative">
      {helmet || ""}
      <div>
        <img src={imageBanner} className="max-w-full"></img>
      </div>
      <div className="relative flex justify-center">
        <div className="max-w-5xl rounded shadow-lg bg-white absolute -top-40">
          <div className="w-5/6 mx-auto">
            <div className="flex text-6xl text-primary-green-dark justify-center pt-8">
              {title}
            </div>
            <div className="text-md text-gray-400 mb-2">{publishDate}</div>
            <div className="flex justify-center text-lg mb-6">
              {description}
            </div>
            <img
              src={featuredImage}
              alt="Featured Image"
              className="max-w-3xl mx-auto mb-6"
            ></img>
            <PostContent content={content} className="py-2 text-justify" />
            {tags && tags.length ? (
              <div className="mt-4">
                <div className="text-lg">Tags</div>
                <div className="">
                  {tags.map((tag) => (
                    <div
                      key={tag + `tag`}
                      className="text-primary-green-dark hover:text-primary-green-light"
                    >
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post, exampleImage: imageBanner } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        publishDate={post.frontmatter.date}
        featuredImage={post.frontmatter.featuredimage.publicURL}
        imageBanner={imageBanner.publicURL}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        featuredimage {
          publicURL
        }
        tags
      }
    }

    exampleImage: file(
      extension: { eq: "png" }
      name: { eq: "light-green-banner" }
    ) {
      publicURL
    }
  }
`;

// query SpecificImageQuery {
// 	exampleImage: file(
// 		extension: {eq: "png"},
//     name: {eq: "light-green-banner"}
//   ) {
// 	  childImageSharp {
//       fluid {
//         src
//       }
//     }
// 	}
// }
