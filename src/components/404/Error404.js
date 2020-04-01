import React, { Component } from 'react'
import './Error404.css';

export default class Error404 extends Component {
     render() {
          return (
               <div className="error-page">
                    <div className="error">404</div>
                    <br /><br />
                    <span className="info">Page not found</span>
               </div>
          )
     }
}
