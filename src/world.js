import * as THREE from 'three'
import fragment from './shaders/frag'
import vertex from './shaders/vert'
import enableInlineVideo from 'iphone-inline-video';
const logo = require('./images/toyboy-square.png')

// TODO AEZ clean up this shader template

export default class World {

  constructor(domElement, videoElement, cakesElement) {
    this.videoElement = videoElement;
    this.cakes = cakesElement;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.uniforms = {};
    this.camera = null;
    domElement.appendChild(this.renderer.domElement);
    this.domElement = domElement;
    this.uniformLoaded = false;

    this.mouse = new THREE.Vector2(0, 0);
    this.dampenedMouse = new THREE.Vector2(0, 0);
    this.scroll = 0;
    this.dampenedScroll = 0;

    this.alphaDrag = 0;

    this.initCamera();

    window.addEventListener('mousemove', this.mousemove)
    window.addEventListener('scroll', this.onscroll)

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.deviceOrientationHandler, false);
      // console.log('device orientation detected');
    }

    this.addShader();

    this.vertex = vertex;
    this.fragment = fragment;

    this.resize();

    // this.animationFrameId = null;
    //
    // requestAnimationFrame(this.render);
    window.addEventListener('resize', this.resize);
  }

  onscroll = (event) => {
    this.scroll = window.scrollY;
    // this.renderer.domElement.style.transform = 'rotateX(' + Math.min(Math.max(0, (this.scroll-2600)/10), 30) + 'deg)';
    // this.renderer.domElement.style.backfaceVisibility = 'hidden';
    this.uniforms.scale3.value = this.scroll / (document.body.offsetHeight - window.innerHeight)// Math.min(Math.max(0, (this.scroll-3200)/10), 30) / 30;
    console.log(this.scroll / (document.body.offsetHeight - window.innerHeight))

  }

  update() {
    this.uniforms.time.value += 0.005;

    const dampenedMouseOld = this.dampenedMouse.clone()

    this.dampenedMouse.x += (this.mouse.x - this.dampenedMouse.x) * 0.06;
    this.dampenedMouse.y += (this.mouse.y - this.dampenedMouse.y) * 0.06;

    this.dampenedScroll += (this.scroll - this.dampenedScroll) * 0.09;

      this.uniforms.scale.value = this.dampenedMouse.distanceTo(dampenedMouseOld)

    this.uniforms.scale2.value = .2 * Math.abs(this.scroll - this.dampenedScroll);
    this.uniforms.mouse.value.x = this.mouse.x;
    this.uniforms.mouse.value.y = this.mouse.y;
  }

  mousemove = (event) => {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
    this.oldmouse = this.mouse.clone();

    this.mousevec = this.mouse.clone();

    this.mousevec.x = this.mousevec.x / window.innerWidth * 2 - 1;
    this.mousevec.y = (1 - this.mousevec.y / window.innerHeight) * 2 - 1;
    this.oldmouse.x = this.oldmouse.x / window.innerWidth * 2 - 1;
    this.oldmouse.y = this.oldmouse.y / window.innerHeight * 2 - 1;
  }

  deviceOrientationHandler = (event) => {
    // this.alphaPrev = this.alpha;
    // this.alpha = event.gamma;
    // this.alphaDrag += (this.alpha - this.alphaDrag) * 0.03;
    // this.alphaDragDiff = Math.abs(this.alpha - this.alphaDrag) / 45;
  }

  onTexLoad(texture) {
    this.uniforms.textureSampler.value = texture;

    let plane = new THREE.PlaneBufferGeometry(2,2);

    let material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertex: this.vertex,
      fragmentShader: this.fragment
    });

    let shader = new THREE.Mesh( plane, material );
    this.scene.add(shader);

  };

  oncanplaythrough = () => {
    this.videoTexture.needsUpdate = true;
    this.onTexLoad(this.videoTexture)
    this.uniformLoaded = true;
    this.video.play();
    this.render()
  }

  addShader() {
    this.video = this.videoElement;
    this.video.setAttribute('crossorigin', 'anonymous');
    this.videoTexture = new THREE.VideoTexture( this.video );
    this.videoTexture.minFilter = THREE.LinearFilter;
    this.videoTexture.magFilter = THREE.LinearFilter;
    this.videoTexture.format = THREE.RGBFormat;

    const loader = new THREE.TextureLoader;

    this.uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
      mouse: { type: "v2", value: new THREE.Vector2() },
      drag: { type: "v2", value: new THREE.Vector2(0,0) },
      scale: { type: "f", value: 0.0 },
      scale2: { type: "f", value: 0 },
      scale3: { type: "f", value: 0 },
      textureSampler: { type: "t", value: this.videoTexture },
      format: {type: "i", value: 0 },
      prevFormat: {type: "i", value: 0},
      timer: {type: "f", value: 0},
      toyboy: {type: "t", value: null}
    };

    loader.load(logo, (tex) => {
      this.toyboylogo = tex
      this.uniforms.toyboy.value = tex
    })

    // this.video.oncanplaythrough = this.oncanplaythrough
    this.render();
  }

  cleanupScene() {
    console.log('cleanup scene called')
    this.scene = null;
    this.projector = null;
    this.camera = null;
    this.controls = null;
    this.domElement.removeChild(this.renderer.domElement)
    cancelAnimationFrame( this.animationFrameId )
    this.renderer = null;
    window.removeEventListener('resize', this.resize)
  }

  render = () => {
    if( this.video.readyState == this.video.HAVE_ENOUGH_DATA ){
      this.videoTexture.needsUpdate = true;

      if (!this.uniformLoaded) {
        this.onTexLoad(this.videoTexture)
        this.uniformLoaded = true;
        this.video.play();
      }
    }

    this.update();
    this.animationFrameId = requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 1;
  }

  resize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.uniforms.resolution.value.x = this.renderer.domElement.width;
		this.uniforms.resolution.value.y = this.renderer.domElement.height;
  }
}
