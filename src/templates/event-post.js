import Content, { HTMLContent } from "../components/Content";
import { Link, graphql } from "gatsby";

import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import React from "react";

// eslint-disable-next-line
export const EventPostTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
  status
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <p>This event is {status}</p>
            <PostContent content={content} />
          </div>
        </div>
      </div>
    </section>
  );
};


const EventPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <EventPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
        status={post.frontmatter.status}
      />
    </Layout>
  );
};


export default EventPost;

export const pageQuery = graphql`
  query EventPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        status
      }
    }
  }
`;
