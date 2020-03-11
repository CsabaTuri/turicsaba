import Layout from "../components/Layout"
import React from "react"
import axios from "axios"
import Contact from "../components/Contact"

const Post = props => (
  <Layout>
    <article
      className="entry-content"
      dangerouslySetInnerHTML={{
        __html: props.post === undefined ? null : props.post.content.rendered,
      }}
    />
    {props.post === undefined ? null : props.post.title.rendered ===
      "Kezdőlapu" ? (
      <Contact />
    ) : null}
  </Layout>
)

Post.getInitialProps = async function({ query }) {
  const { slug } = query
  try {
    const res = await axios.get(
      `${process.env.URL}/wp-json/wp/v2/pages?slug=${slug}`,
      {
        method: "GET",
        mode: "cors",
      }
    )
    return { post: res.data[0] }
  } catch (err) {
    console.log("err")
  }
}
export default Post
