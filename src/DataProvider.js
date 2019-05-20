import React, { Component } from 'react';
import axios from "axios"
const { Provider, Consumer } = React.createContext()

class DataProvider extends Component {
    constructor(){
        super()
        this.state={
            advice: []
        }
    }
    
    getAdvice = ()=> {
        axios.get(`https://api.adviceslip.com/advice`).then(res => {
            this.setState({
                advice: res.data.slip.advice
            })
        }).catch(function (error) { 
            window.location.reload() 
        });
    }

    render() {
        return (
            <Provider value={{
                getAdvice: this.getAdvice,
                ...this.state
            }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

export default DataProvider;

export function withData(C) {
    return props => <Consumer>{value => <C {...value}{...props} />}</Consumer>
}