import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { url_value: "", loading: false, video_url: null };
  }

  handleChange = event => {
    this.setState({
      url_value: event.target.value
    });
  };

  handleSubmit = event => {
    console.log(this.state.url_value);
  };

  render() {
    const { video_url, url_value, loading } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Tastai</h1>

          <div>
            <label htmlFor="url-input">
              Give us a long boring cooking video and we'll make it delicious
              for you
            </label>
            <br />
            <br />
            <input
              id="url-input"
              value={url_value}
              onChange={this.handleChange}
              placeholder="http://youtube.com?v=someVideoUrl"
            />
            <button onClick={this.handleSubmit}>Tastaify!</button>
          </div>
        </header>
        {video_url != null ? <div>Video Here</div> : ""}
      </div>
    );
  }
}

export default App;
