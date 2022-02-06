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
  featuredImage,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  

  return (
    <section className="">
      {helmet || ""}
      <div className="max-w-6xl rounded shadow-lg bg-white mx-auto">
        <img src={featuredImage}>
        </img>
        <div className="">
          <div className="">
            <h1 className="text-4xl text-primary-green-dark px-12 py-2">
              {title}
            </h1>
            <p className="text-2xl px-12 py-2">{description}</p>
            <PostContent content={content} className="px-12 py-2" />
            {tags && tags.length ? (
              <div className="mt-4">
                <h4>Tags</h4>
                <ul className="">
                  {tags.map((tag) => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};


const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  console.log(post.frontmatter.featuredimage.publicURL)

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        featuredImage={post.frontmatter.featuredimage.publicURL}
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
  }
`;
