import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import World from './world';
import ReactPlayer from 'react-player'
import classNames from 'classnames'
const shirt = require('./images/shirt.JPG')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flipping: false,
      activeCake: 0,
      counter: 0
    }
  }
  componentDidMount() {
    this.scene = new World(this.threeref, this.video);
  }
  handleChange(index) {
    this.scene.uniforms.prevFormat.value = this.scene.uniforms.format.value;
    this.scene.uniforms.format.value = index;
    this.setState({activeCake: index})
    this.scene.uniforms.timer.value = 1;
    this.counter = window.setInterval(() => {
      if (this.scene.uniforms.timer.value <= 0) {
        window.clearInterval(this.counter)
      }
      this.scene.uniforms.timer.value -= .05;
    }, 100)

  }
  flipCanvas = () => {

      this.setState({flipping: !this.state.flipping})
  }
  playVideo = () => {
    this.scene.video.play();
  }
  render() {

    const canvasClasses = classNames('three', {flipping: this.state.flipping})

    const cake = require('./images/cake.png');
    const cake_active = require('./images/cake2.png');

    return (
      <div className="App">
        <video ref={vidref => this.video = vidref} style={{display: 'none'}} width="400" height="400" autoPlay="true" preload="auto" loop crossOrigin="anonymous" playsInline>
          <source type="video/mp4" src="https://s3.amazonaws.com/portfolio-219403973/Videos/Beige2.mp4" />
            <source type="video/webm" src="https://s3.amazonaws.com/aez-project/testvid.webm" />
        </video>

        <img style={{position: 'fixed', top: 0, left: '50%'}} src={require('./images/matkastella.png')} />

        <div onClick={this.flipCanvas} className={canvasClasses} ref={threeref => this.threeref = threeref}></div>
        <div className="Landing">
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




        <div style={{zindex: 4, display: "flex", alignItems: "center", justifyContent: "center", flexFlow: "column nowrap", minHeight: "100vh"}}>
          <div style={{zIndex: 4, alignItems: "center", justifyContent: "center", maxWidth: '90vw'}}>
            <img className="logo" style={{width: 675, maxWidth: '85vw'}} src={require('./images/matkastella-outline.png')} />
          </div>
          <img className="toyboy" src={require('./images/TOYBOY.png')} />
          {/*
<button style={{zIndex: 5}} onClick={this.playVideo}>Play</button>
            */}
          <div style={{justifySelf: "center", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: '85vw', width: 650}}>
            <img onClick={() => this.handleChange(this.state.activeCake ? this.state.activeCake - 1 : 4)} className="cake" style={{cursor: 'pointer', height: 50, paddingRight: 20, maxWidth: '10vw'}} src={require('./images/left2.svg')} />
            <img onClick={() => this.handleChange(0)} className="cake" style={{cursor: 'pointer', width: 80, maxWidth: '10vw'}} src={this.state.activeCake == 0 && cake_active || cake} />
            <img onClick={() => this.handleChange(1)} className="cake" style={{cursor: 'pointer', width: 80, maxWidth: '10vw'}} src={this.state.activeCake == 1 && cake_active || cake} />
            <img onClick={() => this.handleChange(2)} className="cake" style={{cursor: 'pointer', width: 80, maxWidth: '10vw'}} src={this.state.activeCake == 2 && cake_active || cake} />
            <img onClick={() => this.handleChange(3)} className="cake" style={{cursor: 'pointer', width: 80, maxWidth: '10vw'}} src={this.state.activeCake == 3 && cake_active || cake} />
            <img onClick={() => this.handleChange(4)} className="cake" style={{cursor: 'pointer', width: 80, maxWidth: '10vw'}} src={this.state.activeCake == 4 && cake_active || cake} />
            <img onClick={() => this.handleChange((this.state.activeCake == 4) ? 0 : (this.state.activeCake + 1))} className="cake" style={{cursor: 'pointer', height: 50, paddingLeft: 20, maxWidth: '10vw'}} src={require('./images/right2.svg')} />
          </div>

        </div>

        </div>


        {/*
          <div style={{display: 'none'}} className="ScrollContent">
            <img className={'third'} src={shirt} />
            <img className={'third'} src={shirt} />


            <h1>WATCH THE VIDEO</h1>
            <a href="https://vimeo.com/236816688" target="_blank"><img src={require('./images/thumb.png')} /></a>
          </div>
        */}

      </div>
    );
  }
}

export default App;
