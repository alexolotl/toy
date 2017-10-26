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
      flipping: false,
      activeCake: 0,
      counter: 0,
      mute: false
    }
    // window.addEventListener('scroll', this.scroll);
  }
  componentDidMount() {
    this.scene = new World(this.threeref, this.video, this.cakeref);
  }
  handleChange(index) {

    if (index == 'plus') {
      if (this.state.activeCake == 4) {
        index = 0
      }
      else {index = this.state.activeCake + 1;}
    }
    if (index == 'minus') {
      if (this.state.activeCake == 0) {
        index = 4
      }
      else {index = this.state.activeCake - 1}
    }

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
  scroll = (event) => {
    if (this.cakeref.getBoundingClientRect().top < 20) {
      // this.cakeref.style.position = 'fixed'
    }
  }
  togglePlay = (event) => {
    if (this.state.mute) {
      this.video.volume = 1;
    }
    else {
      this.video.volume = 0;
    }
    this.setState({mute: !this.state.mute})
  }
  render() {

    const canvasClasses = classNames('three', {flipping: this.state.flipping})

    const cake = require('./images/cake.png');
    const cake_active = require('./images/cake2.png');

    const mute = require('./images/mute.png')
    const play = require('./images/play.png')

    return (
      <div className="App">
        <header>
          <a href="#">toyboy</a>
          <a href="#merch">shop</a>
          <a href="#video">video</a>
          <a href="https://en.wikipedia.org/wiki/Castella" target="_blank">about</a>
        </header>
        <video ref={vidref => this.video = vidref} style={{display: 'none'}} width="400" height="400" preload="true" autoPlay="true" loop playsInline>
          {/*
            <source type="video/mp4" src={require('./images/testvid.mp4')} />
            <source type="video/webm" src={require('./images/testvid.webm')} />
          */}

            <source type="video/mp4" src="https://s3.amazonaws.com/aez-project/toyboy_compressed.mp4" />
            <source type="video/webm" src="https://s3.amazonaws.com/aez-project/toyboy_compressed.webm" />
        </video>

        <div style={{display: 'none', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', position: 'fixed', left: 0, top: 0}}>
          <img style={{position: 'fixed', flex: '1 1 auto', maxWidth: '100vw'}} src={require('./images/warp-text.png')} />
        </div>



        <div style={{display: 'non'}} className={canvasClasses} ref={threeref => this.threeref = threeref}></div>
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
            <img className="logo" style={{width: 650, maxWidth: '75vw'}} src={require('./images/matkastella-outline.png')} />
          </div>
          <img className="toyboy" src={require('./images/TOYBOY.png')} />
          {/*
<button style={{zIndex: 5}} onClick={this.playVideo}>Play</button>

<div ref={cake => this.cakeref = cake} style={{justifySelf: "center", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: '85vw', width: 650}}>
  <img onClick={() => this.handleChange('minus')} className="cake" style={{cursor: 'pointer', height: 50, paddingRight: 20, maxWidth: '10vw'}} src={require('./images/left2.svg')} />
  <img onClick={() => this.handleChange(0)} className="cake" style={{cursor: 'pointer', width: 80, maxWidth: '10vw'}} src={this.state.activeCake == 0 && cake_active || cake} />
  <img onClick={() => this.handleChange(1)} className="cake" style={{cursor: 'pointer', width: 80, maxWidth: '10vw'}} src={this.state.activeCake == 1 && cake_active || cake} />
  <img onClick={() => this.handleChange(2)} className="cake" style={{cursor: 'pointer', width: 80, maxWidth: '10vw'}} src={this.state.activeCake == 2 && cake_active || cake} />
  <img onClick={() => this.handleChange(3)} className="cake" style={{cursor: 'pointer', width: 80, maxWidth: '10vw'}} src={this.state.activeCake == 3 && cake_active || cake} />
  <img onClick={() => this.handleChange(4)} className="cake" style={{cursor: 'pointer', width: 80, maxWidth: '10vw'}} src={this.state.activeCake == 4 && cake_active || cake} />
  <img onClick={() => this.handleChange('plus')} className="cake" style={{cursor: 'pointer', height: 50, paddingLeft: 20, maxWidth: '10vw'}} src={require('./images/right2.svg')} />
</div>
            */}

        </div>
        </div>


          <div className="container text-center content">

            <div className="row merch" id="merch" style={{marginBottom: 0}}>
              <div>
              <div className="col-sm-12 col shop">
                <h1 className="overlap">SHOP</h1>
              </div>
              <div className="col-sm-6 col">
                <a href="https://kastellashop.bigcartel.com">
                  <img src={require('./images/edit1.jpg')} />
                  <h2 className="overlay">Toyboy Ripped Tee</h2>
                </a>
              </div>
              <div className="col-sm-6 col">
                <a href="https://kastellashop.bigcartel.com"><img src={require('./images/edit2.jpg')} />
                <h2 className="overlay">Toyboy Tall Tee</h2>
                </a>

              </div>
              <div className="col-sm-6 col">
                <a href="https://kastellashop.bigcartel.com"><img src={require('./images/edit3.jpg')} />

                  <h2 className="overlay">Toyboy Crop</h2>
                </a>
              </div>
              <div className="col-sm-6 col">
                <a href="https://kastellashop.bigcartel.com"><img src={require('./images/edit4.jpg')} />

                  <h2 className="overlay">Toyboy Crop</h2>
                </a>
              </div>
              </div>
            </div>

            <div className="row vimeo text-center" id="video">
              <div style={{width: '100%'}}>
                <div className="col-sm-12">
                  <h1 className="overlap">VIDEO</h1>
                </div>
                <div className="col-sm-12">
                  <div className="iframe-container">
                    <iframe src="https://player.vimeo.com/video/236816688" style={{zIndex: 1, margin: '0 auto', zIndex: 5, textAlign: 'center'}} frameBorder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                  </div>
                </div>
              </div>
            </div>



            <div style={{width: '100%', height: '200vh'}}></div>
          </div>


          <footer>
            <div ref={cake => this.cakeref = cake} style={{justifySelf: "center", zIndex: 5, display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: '85vw', width: 500}}>
              <img onClick={() => this.handleChange('minus')} className="cake" style={{cursor: 'pointer', height: 40, paddingRight: 20, maxWidth: '8vw'}} src={require('./images/left2.svg')} />
              <img onClick={() => this.handleChange(0)} className="cake" style={{cursor: 'pointer', width: 50, maxWidth: '10vw'}} src={this.state.activeCake == 0 && cake_active || cake} />
              <img onClick={() => this.handleChange(1)} className="cake" style={{cursor: 'pointer', width: 50, maxWidth: '10vw'}} src={this.state.activeCake == 1 && cake_active || cake} />
              <img onClick={() => this.handleChange(2)} className="cake" style={{cursor: 'pointer', width: 50, maxWidth: '10vw'}} src={this.state.activeCake == 2 && cake_active || cake} />
              <img onClick={() => this.handleChange(3)} className="cake" style={{cursor: 'pointer', width: 50, maxWidth: '10vw'}} src={this.state.activeCake == 3 && cake_active || cake} />
              <img onClick={() => this.handleChange(4)} className="cake" style={{cursor: 'pointer', width: 50, maxWidth: '10vw'}} src={this.state.activeCake == 4 && cake_active || cake} />
              <img onClick={() => this.handleChange('plus')} className="cake" style={{cursor: 'pointer', height: 40, paddingLeft: 20, maxWidth: '8vw'}} src={require('./images/right2.svg')} />
            </div>
            <img onClick={this.togglePlay} className="mute" src={this.state.mute ? play : mute} />
          </footer>

      </div>
    );
  }
}

export default App;
