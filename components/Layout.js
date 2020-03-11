import React from "react"
import Helmet from "react-helmet"
import Footer from "../components/Footer"
import Navbar from "./Navbar"
import "../styles/all.sass"

const TemplateWrapper = ({ children }) => {
  return (
    <div>
      <Helmet>
        <html lang="hu" />
        <meta name="theme-color" content="#fff" />
        <meta property="og:type" content="business.business" />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/img/og-image.jpg" />
      </Helmet>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  )
}
export default TemplateWrapper
