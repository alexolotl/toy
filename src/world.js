import * as THREE from 'three'
import fragment from './shaders/frag'
import vertex from './shaders/vert'

// TODO AEZ clean up this shader template

export default class World {

  constructor(domElement) {
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

    this.initCamera();

window.addEventListener('mousemove', this.mousemove)

    this.addShader();

    this.vertex = vertex;
    this.fragment = fragment;

    this.resize();

    this.animationFrameId = null;

    requestAnimationFrame(this.render);
    window.addEventListener('resize', this.resize);

  }

  update() {
    this.uniforms.time.value += 0.005;

    const dampenedMouseOld = this.dampenedMouse.clone()

    this.dampenedMouse.x += (this.mouse.x - this.dampenedMouse.x) * 0.04;
    this.dampenedMouse.y += (this.mouse.y - this.dampenedMouse.y) * 0.04;

    this.uniforms.scale.value = this.dampenedMouse.distanceTo(dampenedMouseOld)
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
  addShader() {

    this.video      = document.createElement('video');
    this.video.width    = 320;
    this.video.height   = 240;
    this.video.autoplay = true;
    this.video.loop = true;
    this.video.src = require('./images/testvid.webm');
    this.video.volume = .6  ;
    this.videoTexture = new THREE.Texture( this.video );
    this.videoTexture.minFilter = THREE.LinearFilter;
    this.videoTexture.magFilter = THREE.LinearFilter;

    this.uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
      mouse: { type: "v2", value: new THREE.Vector2() },
      drag: { type: "v2", value: new THREE.Vector2(0,0) },
      scale: { type: "f", value: 0.0 },
      textureSampler: { type: "t", value: this.videoTexture }
    };

    this.render();


    // this.manager = new THREE.LoadingManager();
    // this.manager.onLoad = (tex) => {
    //   this.onTexLoad(tex)
    // }
    //
    // this.loader = new THREE.TextureLoader(this.manager);
    // this.loader.setCrossOrigin("anonymous");
    // this.loader.load(this.video);

    // setTimeout(() => this.onTexLoad(this.videoTexture), 4000);
  }

  cleanupScene = () => {
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
    if( this.video.readyState === this.video.HAVE_ENOUGH_DATA ){
      this.videoTexture.needsUpdate = true;

      if (!this.uniformLoaded) {
        this.onTexLoad(this.videoTexture)
        this.uniformLoaded = true;
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
