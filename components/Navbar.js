import React from "react"
import Link from "next/link"
import axios from "axios"
export default class Navbar extends React.Component {
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
  toggleHamburger = () => {
    this.setState(
      {
        active: !this.state.active,
      },
      () => {
        this.state.active
          ? this.setState({
              navBarActiveClass: "is-active",
            })
          : this.setState({
              navBarActiveClass: "",
            })
      }
    )
  }
  render() {
    return (
      <nav
        className="navbar scale-in-ver-top"
        role="navigation"
        aria-label="main navigation"
      >
      {console.log(`${process.env.URL}/wp-json/wp/v2/pages`)}
        <div className="navbar-brand">
          <a
            role="button"
            className={`navbar-burger burger ${this.state.navBarActiveClass}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => this.toggleHamburger()}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${this.state.navBarActiveClass}`}
        >
          <div className="navbar-start">
            {this.state.page !== null
              ? this.state.page.map((post, i) => (
                  <Link key={i} href="/[slug]" as={`/${post.slug}`}>
                    <a
                      className="navbar-item"
                      onClick={() => this.toggleHamburger()}
                    >
                      {post === "undefined" ? null : post.title.rendered}
                    </a>
                  </Link>
                ))
              : null}
          </div>
        </div>
      </nav>
    )
  }
}
