import React from "react"
import Link from "next/link"
import axios from "axios"

export default class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: "",
      page: null,
    }
  }
  componentDidMount() {
    axios
      .get(`${process.env.URL}/wp-json/wp/v2/pages`, {
        method: "GET",
        mode: "cors",
      })
      .then(res => {
        const page = res.data
        this.setState({ page })
      })
  }
  componentWillUnmount() {
    this.setState({ page: null })
  }
  render() {
    return (
      <footer className="footer has-text-white-ter">
        <div className="content has-text-centered"></div>
        <div className="content has-text-centered has-text-white-ter">
          <div className="container has-text-white-ter">
            <div className="columns">
              <div className="column is-6">
                <section className="menu">
                  {this.state.page !== null
                    ? this.state.page.map((post, i) => (
                        <Link key={i} href="/[slug]" as={`/${post.slug}`}>
                          <a className="navbar-item">
                            {post === "undefined" ? null : post.title.rendered}
                          </a>
                        </Link>
                      ))
                    : null}
                </section>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}
