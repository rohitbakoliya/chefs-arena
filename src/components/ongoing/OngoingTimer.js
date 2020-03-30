import React, { Component } from 'react'
export default class OngoingTimer extends Component {
     
     state = {
          timer: null,
          startDate : '',
          endDate : '',
          days : '0000',
          hours: '00',
          minutes: '00',
          seconds: '00',
     }
     componentDidMount(){

          let obj =JSON.parse(localStorage.getItem('OngoingcontestDetails')); 
          let startDate = new Date(obj.startDate).getTime();
          let endDate = new Date(obj.endDate).getTime(); 
          this.setState({
               startDate : startDate,
               endDate : endDate
          } , ()=>{     
               this.refresh();         
               var timer = setInterval(()=> this.refresh() , 1000)
               this.setState({timer : timer});
          })
     }
     componentWillUnmount(){
          clearInterval(this.state.timer);
     }
     refresh = () => {
          var now = new Date().getTime();
          var timeA = this.state.endDate;
          function additionalPadding (n) {
            return (n < 10 ? '0' + n : n)
          }
          const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
          var distance = Math.abs(timeA -  now);
          var days = Math.floor(distance / (day));
          var hours =additionalPadding(Math.floor((distance % (day)) / (hour)));
          var minutes = additionalPadding(Math.floor((distance % (hour)) / (minute)))
          var seconds = additionalPadding(Math.floor((distance % (minute)) / second))
          this.setState({days : days ,  hours: hours, minutes: minutes, seconds: seconds })
     }
     render() {
          var counter = <div className="timer">
          <h4 style={{ margin: 10, padding: 0 }}>{this.state.days ? this.state.days  : null}{this.state.days ? ":" : null}{this.state.hours}:{this.state.minutes}:{this.state.seconds}</h4>
        </div>

          var contestStatus = 'Contest has ended'
          var now = new Date().getTime();
          if (now > this.state.startDate && now < this.state.endDate) {
          contestStatus = 'Running'
          } else if (now < this.state.startDate) {
          contestStatus = 'Before start'
          }
          if(localStorage.getItem('contestStatus'))
          localStorage.setItem('contestStatus' , contestStatus);

          var counterView = <div className="center card" style={{ marginTop : 10 , paddingTop : 10}}>
               <div className="card-content">
                    <div className="card-title">
                         <strong>{contestStatus}</strong>
                    </div>
                    <div className="divider grey darken-2"></div>
                    {counter}
               </div>
        </div>
          return (
               this.state.startDate ? counterView : null
          )
     }
}
