import React from "react";
import ReactMarkdown from 'react-markdown/with-html';
import MathJax from 'react-mathjax';
import RemarkMathPlugin from 'remark-math';


function MarkdownRender(props) {
    const newProps = {
        ...props,
        plugins: [
          RemarkMathPlugin,
        ],
        renderers: {
          ...props.renderers,
          math: (props) => 
            <MathJax.Node formula={props.value} />,
          inlineMath: (props) =>
            <MathJax.Node inline formula={props.value} />
        }
      };
      return (
        <MathJax.Provider input="tex">
            <ReactMarkdown escapeHtml={false} {...newProps} />
        </MathJax.Provider>
      );
}

export default MarkdownRender;