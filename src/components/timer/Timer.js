import React, { Component } from 'react'
import moment from 'moment';

export default class Timer extends Component {
     
     state = {
          timer: null,
          startDate : parseInt(localStorage.getItem('startDate')),
          endDate : parseInt(localStorage.getItem('endDate')),
          hours: '00',
          minutes: '00',
          seconds: '00',
     }
     componentDidMount(){
          this.refresh();         
          var timer = setInterval(()=> this.refresh() , 1000)
          this.setState({timer : timer});
     }
     componentWillUnmount(){
          clearInterval(this.state.timer);
     }
     refresh = () => {
          var now = new Date()
          var timeA = now
          var timeB = now
      
          if (now > this.state.startDate && now < this.state.endDate) {
            timeA = this.state.endDate
          } else if (now < this.state.startDate) {
            timeA = this.state.startDate
          }
      
          function remaing (a, b) {
            var ans = moment(a).subtract(b.getHours(), 'hours').toDate()
            ans = moment(ans).subtract(b.getMinutes(), 'minutes').toDate()
            ans = moment(ans).subtract(b.getSeconds(), 'seconds').toDate()
            return ans
          }
      
          function additionalPadding (n) {
            return (n < 10 ? '0' + n : n)
          }
      
          var rest = remaing(timeA, timeB)
          var hours = additionalPadding(rest.getHours())
          var minutes = additionalPadding(rest.getMinutes())
          var seconds = additionalPadding(rest.getSeconds())

          this.setState({ hours: hours, minutes: minutes, seconds: seconds })
     }
     render() {
          var counter = <div className="timer">
          <h4 style={{ margin: 10, padding: 0 }}>{this.state.hours}:{this.state.minutes}:{this.state.seconds}</h4>
        </div>

          var contestStatus = 'Contest has ended'
          var now = new Date()
          if (now > this.state.startDate && now < this.state.endDate) {
          contestStatus = 'Running'
          } else if (now < this.state.startDate) {
          contestStatus = 'Before start'
          }
          localStorage.setItem('contestStatus' , contestStatus);

          var counterView = <div className="center" style={{ marginTop : 10 , paddingTop : 10}}>
          <p style={{ margin: 0, padding: 0 ,fontSize :'1.2rem' }}> {contestStatus} </p>
          {counter}
        </div>
          return (
               this.state.startDate ? counterView : null
          )
     }
}
