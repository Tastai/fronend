import React, { Component } from "react";
import loader from "./loader_white.png";
import logo from "./logo.png";
import "./App.css";

const LoadingView = () => {
  return (
    <div className="loading-view">
      <img src={loader} />
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { url_value: "", loading: false, video_url: null };
  }

  fakeApiCall = theUrl => {
    console.log("Called fakeApi with: ", theUrl);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("http://demos.transloadit.com.s3.amazonaws.com/1b/095e201f9f11e8b87383c8f3763392/audio.mp4");
      }, 2500);
    });
  };

  handleChange = event => {
    this.setState({
      url_value: event.target.value
    });
  };

  getVideoLink(url_value) {
    this.fakeApiCall(url_value)
      .then(resp => {
        this.setState(
          {
            video_url: resp
          },
          () => this.setState({ loading: false })
        );
      })
      .catch(err => console.log(err));
  }

  handleSubmit = event => {
    const { url_value } = this.state;
    this.setState(
      {
        loading: true
      },
      this.getVideoLink
    );
  };

  shouldShowButton() {
    return (
      this.state.url_value != null &&
      this.state.url_value.length > 0 &&
      this.state.url_value.indexOf("youtube.com") >= 0
    );
  }

  render() {
    const { video_url, url_value, loading } = this.state;
    const submitVisible = this.shouldShowButton();

    return (
      <div className="App">
        <div className="App-container">
          <h1 className={`logo ${video_url ? "active" : ""}`}>
            <img src={logo} />
          </h1>

          <div className="input-group">
            {video_url == null && (
              <label htmlFor="url-input">
                Give us a long boring cooking video and we'll make it delicious
                for you
              </label>
            )}
            <div className="input-button">
              <input
                style={{ borderRightWidth: submitVisible ? "0" : "4px" }}
                id="url-input"
                value={url_value}
                onChange={this.handleChange}
                placeholder="Enter a YouTube Url"
              />
              {submitVisible && (
                <button onClick={this.handleSubmit}>Tastaify!</button>
              )}
            </div>
          </div>
          {loading && <LoadingView />}
          {video_url != null ? (
            <div className="video-container">
              <video controls={true}>
                <source src={video_url} type="video/mp4" />
              </video>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default App;
