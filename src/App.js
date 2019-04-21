import React, { Component } from 'react';
import { withData } from './DataProvider';
import "./App.css"

class App extends Component {
  constructor(){
    super()
    this.state={
      advices: [],
      toggle: true
    }
  }

  componentWillMount(){
    this.props.getAdvice()
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.getAdvice()
  }
  handleFav = (e) => {
    e.preventDefault()
    this.state.advices.push(this.props.advice)
  }
  handleToggle = () =>{
    this.setState(prevState =>({
        toggle: !prevState.toggle
    }))
}

  render() {
    const styles={
      btnParent:{
        display: "flex",
        flexDirection:"row",
        justifyContent:"center",
        marginTop: "1.3em",
        marginBottom:"3.5em"
      },
      backParent:{
        display: "flex",
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop: "1.3em",
        marginBottom:"3.5em"
      },
      next:{
        border:"red solid",
        borderRadius: 5,
        outline: "none",
        marginLeft: '1%'
      },
      fav:{
        border:"red solid",
        borderRadius: 5,
        outline: "none",
        marginRight: '1%'    
      },
      favPage:{
        border:"red solid",
        borderRadius: 5,
        outline: "none",        
      },
      advice:{
        color: "black",
        display:"block",
        margin:"auto",
        textAlign:"center",
        marginTop:10,
        fontSize: 35,
        width: 350,
      },
      favs:{
        color: "black",
        display:"block",
        margin:"auto",
        width:"90%",
        textAlign:"center",
        marginTop:10,
        fontSize: 35,
        border: "solid green"
      }
    }
    const mappedFavs = this.state.advices.map(advice => {
        return(
          <div>
            <h1 style={styles.favs}>{advice}</h1>
          </div>
        )
    })
    return (
      <>
        {this.state.toggle ? 
          <>
            <div style={styles.btnParent}>
              <button className='button' onClick={this.handleFav} style={styles.fav}>Save</button>
              <button className='button' onClick={this.handleToggle} style={styles.favPage}>Favorites</button>
              <button className='button' onClick={this.handleSubmit} style={styles.next}>Next</button>
            </div>
              <h1 style={styles.advice}>{this.props.advice}</h1>
          </>
          :
          <>
          <div style={styles.backParent}>
          <button className='button' onClick={this.handleToggle} style={styles.favPage}>Back</button>
          </div>
          <div style={{overflow: "scroll", height: "70vh", width: 350, display: "block", margin:"auto"}}>
            {mappedFavs}
          </div>
          </>
        }
      </>
    );
  }
}

export default withData(App);