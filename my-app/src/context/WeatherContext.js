import React from "react";


const Context =  React.createContext([])

 export class WeatherStore extends React.Component{
    state = {weather: []}

    onWeatherChange = weather => {
        this.setState({weather})
    }


   render(){
       return (
           <Context.Provider value={{ ...this.state, onWeatherChange: this.onWeatherChange}}>
               {this.props.children}
           </Context.Provider>
       )
   }
}

export default Context;