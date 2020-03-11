import Head from "next/head"
import React from "react"
import axios from "axios"
import loadable from "@loadable/component"
import pMinDelay from "p-min-delay"

const Contact = loadable(() => import("../components/Contact"))
const Layout = loadable(() => pMinDelay(import("../components/Layout"), 200))

export default class Index extends React.Component {
  static async getInitialProps() {
    const response = await axios.get(
      `${process.env.URL}/wp-json/wp/v2/pages?slug=kezdolap`
    )
    return {
      post: response.data[0],
    }
  }
  render() {
    return (
      <Layout>
        <Head>
          <title>
            {this.props.post === undefined
              ? null
              : this.props.post.title.rendered}
          </title>
          <meta
            name="description"
            content={`This is a single post for ${
              this.props.post === undefined
                ? null
                : this.props.post.title.rendered
            }`}
          />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <article
          className="entry-content"
          dangerouslySetInnerHTML={{
            __html:
              this.props.post === undefined
                ? null
                : this.props.post.content.rendered,
          }}
        />
        <Contact />
      </Layout>
    )
  }
}
