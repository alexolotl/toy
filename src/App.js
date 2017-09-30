import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import World from './world';
import ReactPlayer from 'react-player'
import classNames from 'classnames'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flipping: false
    }
  }
  componentDidMount() {
    this.scene = new World(this.threeref);
  }
  handleChange(index) {
    this.scene.uniforms.prevFormat.value = this.scene.uniforms.format.value;
    this.scene.uniforms.format.value = index;
  }
  flipCanvas = () => {

      this.setState({flipping: !this.state.flipping})
  }
  render() {

    const canvasClasses = classNames('three', {flipping: this.state.flipping})

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

        <div className="top-block">
        </div>


        <div onClick={this.flipCanvas} className={canvasClasses} ref={threeref => this.threeref = threeref}></div>

        <div style={{zindex: 4, display: "flex", alignItems: "center", justifyContent: "space-between", flexFlow: "column nowrap", minHeight: "100vh"}}>
          <div style={{zIndex: 4, display: "none", alignItems: "center", justifyContent: "center", maxWidth: '90vw'}}>
            <img className="cake" style={{width: 100, maxWidth: '15%'}} src={require('./images/cake.png')} />
            <img className="logo" style={{width: 600, maxWidth: '85%'}} src={require('./images/matkastella-outline.png')} />
          </div>
          <img className="toyboy" style={{opacity: 0}} src={require('./images/TOYBOY.png')} />
          <img className="toyboy" src={require('./images/TOYBOY.png')} />
          <div style={{justifySelf: "flex-end", height: 150, zIndex: 5, display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: '90vw', width: 200}}>
            <img onClick={() => this.handleChange(0)} className="cake" style={{width: 80, maxWidth: '15%'}} src={require('./images/cake.png')} />
            <img onClick={() => this.handleChange(1)} className="cake" style={{width: 80, maxWidth: '15%'}} src={require('./images/cake.png')} />
            <img onClick={() => this.handleChange(2)} className="cake" style={{width: 80, maxWidth: '15%'}} src={require('./images/cake.png')} />
            <img onClick={() => this.handleChange(3)} className="cake" style={{width: 80, maxWidth: '15%'}} src={require('./images/cake.png')} />
            <img onClick={() => this.handleChange(4)} className="cake" style={{width: 80, maxWidth: '15%'}} src={require('./images/cake.png')} />
            <img onClick={() => this.handleChange(5)} className="cake" style={{width: 80, maxWidth: '15%'}} src={require('./images/cake.png')} />
          </div>
        </div>


      </div>
    );
  }
}

export default App;
