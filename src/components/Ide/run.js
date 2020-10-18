import React from "react";
import "prismjs/components/prism-core";
import axios from "axios";
import NavBar from "../common/navbar/nav";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-go";
import "./prism.css";
import Utils from "../utils/utils";
import EnhancedEditor from "./editor";
import nightOwlTheme from "prism-react-renderer/themes/nightOwl";
import draculaTheme from "prism-react-renderer/themes/dracula";
import vsDarkTheme from "prism-react-renderer/themes/vsDark";
import githubTheme from "prism-react-renderer/themes/github";
import palenightTheme from "prism-react-renderer/themes/palenight";
import duotoneDarkTheme from "prism-react-renderer/themes/duotoneDark";
import duotoneLightTheme from "prism-react-renderer/themes/duotoneLight";

import "./editorStyles.css";

class Run extends React.Component {
  state = {
    code:
      localStorage.getItem("localCode") ||
      `#include <iostream>
using namespace std;

int main() {
     // your code goes here
     return 0;
}`,
    value: "C++14",
    link: "",
    theme: githubTheme,
    themeName: "Github Light",
    highlightLang: "cpp",
    input: localStorage.getItem("localInput") || "",
    loading: false,
    time: "",
    cmpinfo: "",
    output: "",
    status: "",
    memory: "",
    stderr: "",
  };

  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.innerHTML = `$(document).ready(function(){
          $('select').formSelect();
     });`;
    this.instance.appendChild(script);
  }
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
    if (event.target.value === "C++14") {
      this.setState({
        highlightLang: "cpp",
      });
    } else if (event.target.value === "PYTH") {
      this.setState({
        highlightLang: "python",
      });
    } else if (event.target.value === "c") {
      this.setState({
        highlightLang: "c",
      });
    } else if (event.target.value === "go") {
      this.setState({
        highlightLang: "go",
      });
    } else if (event.target.value === "Java") {
      this.setState({
        highlightLang: "java",
      });
    }
  };
  handleInput = (e) => {
    this.setState({
      input: e.target.value,
    });
    localStorage.setItem("localInput", e.target.value);
  };
  handleChangeTheme = ({ target: { value } }) => {
    this.setState({ themeName: value });
    var _theme;
    if (value === "VS Code Dark") _theme = vsDarkTheme;
    else if (value === "Night Owl") _theme = nightOwlTheme;
    else if (value === "Github Light") _theme = githubTheme;
    else if (value === "Dracula") _theme = draculaTheme;
    else if (value === "Palenight") _theme = palenightTheme;
    else if (value === "Duotone Dark") _theme = duotoneDarkTheme;
    else _theme = duotoneLightTheme;
    this.setState({ theme: _theme });
  };
  handleRun = async (e) => {
    this.setState({
      loading: true,
    });
    let problem_config = {
      sourceCode: this.state.code,
      language: this.state.value,
      input: this.state.input,
    };
    axios
      .post("https://api.codechef.com/ide/run", problem_config, {
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        this.setState({ link: res.data.result.data.link });
        //wait for 4-5 sec till code is executing
        setTimeout(this.getStatus, 4000);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          Utils.generateAccessToken();
        } else {
          alert("Something went wrong, try again!");
        }
      });
  };
  getStatus = async (e) => {
    await axios
      .get(`https://api.codechef.com/ide/status?link=${this.state.link}`, {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        const data = res.data.result.data;
        this.setState({
          status: data.status,
          output: data.output,
          memory: data.memory,
          stderr: data.stderr,
          cmpinfo: data.cmpinfo,
          date: data.date,
          time: data.time,
          loading: false,
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          Utils.generateAccessToken();
          alert("Some error occured...please refresh page");
        } else {
          alert("Something went wrong, try again!");
        }
      });
  };
  handleCodeChange = (code) => {
    this.setState({ code });
    localStorage.setItem("localCode", code);
  };
  render() {
    let op = this.state.loading ? (
      <h3 style={{fontWeight: 'normal'}}>Submission Queued...</h3>
    ) : this.state.status !== "" ? (
      <div>
        <h2 style={{margin: '10px', fontWeight: 'normal'}}>OUTPUT</h2>
        <div className="row">
          <div className="col l3">
            <strong>Status:</strong> {this.state.status}
          </div>
          <div className="col l3">
            <strong>Date:</strong> {this.state.date.substring(0, 10)}
          </div>
          <div className="col l3">
            <strong>Time:</strong> {this.state.time}sec
          </div>
          <div className="col l3">
            <strong>Mem:</strong> {this.state.memory}kB
          </div>
        </div>
        <div>
          {this.state.stderr !== "" ? (
            <textarea
              className="red-text textArea"
              value={this.state.stderr}
              readOnly
            />
          ) : null}
        </div>
        <div>
          {this.state.cmpinfo !== "" ? (
            <div>
              <strong>Compile Info :</strong>
              <textarea
                className="red-text textArea"
                value={this.state.cmpinfo}
                readOnly
              />
            </div>
          ) : null}
        </div>
        <div>
          {" "}
          {this.state.output !== "" ? (
            <textarea value={this.state.output} className="textArea" readOnly />
          ) : (
            <div>No Output</div>
          )}
        </div>
      </div>
    ) : null;

    return this.state.highlightLang ? (
      <div className="wrapper">
        <NavBar />
        <div className="container">
          <div className="row valign-wrapper">
            <div className="col l9">
              <div className="input-field col l3">
                <select
                  id="languages"
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  <option value="c">C</option>
                  <option value="C++14">C++</option>
                  <option value="Java">Java</option>
                  <option value="PYTH">Python</option>
                  <option value="go">Go</option>
                </select>
              </div>
              <div className="input-field col l4 push-l2">
                <select
                  id="theme"
                  value={this.state.themeName}
                  onChange={this.handleChangeTheme}
                >
                  <option value="Github Light">Github Light</option>
                  <option value="Duotone Light">Duotone Light</option>
                  <option value="Duotone Dark">Duotone Dark</option>
                  <option value="Night Owl">Night Owl</option>
                  <option value="Dracula">Dracula</option>
                  <option value="VS Code Dark">VS Code Dark</option>
                  <option value="Palenight">Palenight</option>
                </select>
              </div>
            </div>
            <div className="col l3">
              <div
                onClick={this.handleRun}
                className="btn waves-effect waves-light submit modal-trigger"
              >
                <i className="material-icons left hide-on-small-only">code</i>
                RUN
              </div>
            </div>
          </div>
          <div>
            <EnhancedEditor
              code={this.state.code}
              lang={this.state.highlightLang}
              theme={this.state.theme}
              handleOnChange={(code) => this.handleCodeChange(code)}
              themeName={this.state.themeName}
            />
          </div>

          <br />
          <div className="row">
            <textarea
              className="textArea"
              placeholder="Custom Input goes here"
              id="textarea1"
              onChange={this.handleInput}
              value={this.state.input}
            ></textarea>
          </div>
          <div>{op}</div>
          <br />
          <br />
        </div>
        <div ref={(el) => (this.instance = el)}></div>
      </div>
    ) : null;
  }
}
export default Run;
