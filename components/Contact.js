import React from "react"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
    }).catch(error => alert(error))
  }
  render() {
    return (
      <section className="section  form-section section--gradient ">
        <div className="container">
          <div className="columns">
            <div className="column ">
              <div
                style={{
                  display: "flex",
                  lineHeight: "1",
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <form
                  className="is-size-1-mobile is-size-1-tablet is-size-1-widescreen"
                  style={{
                    boxShadow:
                      "rgba(255, 255, 255, .2) 0.5rem 0px 0px, rgba(255, 255, 255, .2) -0.5rem 0px 0px",
                    backgroundColor: "rgba(255, 255, 255, .1)",
                    color: "#ECCB31",
                    lineHeight: "1",
                    padding: "0.25em",
                    opacity: "1",
                  }}
                  name="contact"
                  method="post"
                  action="/contact/thanks/"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={this.handleSubmit}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div hidden>
                    <label>
                      Don’t fill this out:{" "}
                      <input name="bot-field" onChange={this.handleChange} />
                    </label>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"name"}>
                      Név
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={"text"}
                        name={"name"}
                        onChange={this.handleChange}
                        id={"name"}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"email"}>
                      Email
                    </label>
                    <div className="control">
                      <input
                        className="input"
                        type={"email"}
                        name={"email"}
                        onChange={this.handleChange}
                        id={"email"}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" htmlFor={"message"}>
                      Üzenet
                    </label>
                    <div className="control">
                      <textarea
                        className="textarea"
                        name={"message"}
                        onChange={this.handleChange}
                        id={"message"}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <button
                      className="button is-link send-button"
                      type="submit"
                    >
                      Elküldöm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
