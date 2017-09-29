import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import World from './world';
import ReactPlayer from 'react-player'

class App extends Component {
  componentDidMount() {
    const scene = new World(this.threeref);
  }
  render() {
    return (
      <div className="App">
        {
          //   <img className="vid" src={require('./matvid.png')} />
          // <img className="vid2" src={require('./matvid.png')} />
          // <div className="title-block">
          //   <h1>MAT KASTELLA</h1>
          //   <h1>toyboy</h1>
          // </div>

          //
          // <ReactPlayer className="video" url="https://vimeo.com/235128760" width="100vw" height="200vh" />
        }

        <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", flexFlow: "column nowrap", minHeight: "100vh"}}>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", maxWidth: '90vw'}}>
            <img className="cake" style={{width: 100, maxWidth: '15%'}} src={require('./images/cake.png')} />
            <img className="logo" style={{width: 600, maxWidth: '85%'}} src={require('./images/matkastella-outline.png')} />
          </div>
          <img className="toyboy" src={require('./images/TOYBOY.png')} />
          <div className="three" ref={threeref => this.threeref = threeref}></div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: '90vw', width: 700}}>
            <img className="cake" style={{width: 100, maxWidth: '15%'}} src={require('./images/cake.png')} />
              <img className="cake" style={{width: 100, maxWidth: '15%'}} src={require('./images/cake.png')} />
                <img className="cake" style={{width: 100, maxWidth: '15%'}} src={require('./images/cake.png')} />
                  <img className="cake" style={{width: 100, maxWidth: '15%'}} src={require('./images/cake.png')} />
                    <img className="cake" style={{width: 100, maxWidth: '15%'}} src={require('./images/cake.png')} />
          </div>
        </div>


      </div>
    );
  }
}

export default App;
