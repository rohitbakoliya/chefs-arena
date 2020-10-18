import React, { Component, Fragment } from "react";
import Editor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import './editorStyles.css';

class EnhancedEditor extends Component {
  
  highlight = (code) => (
    <Highlight {...defaultProps} theme={this.props.theme} code={code} language={this.props.lang} >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  );

  render() {
    return (
      <Editor
        value={this.props.code}
        onValueChange={this.props.handleOnChange}
        highlight={this.highlight}
        padding={10}
        style={{     
          boxSizing: "border-box",
          fontFamily: '"Dank Mono", "Fira Code", monospace',
          ...this.props.theme.plain,
          borderRadius: '10px',
          border: '1px solid #474643'
        }}
        textareaClassName='codeEditor'
      />
    );
  }
}
export default EnhancedEditor;
