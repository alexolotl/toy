export default `
#define M_PI 3.1415926535897932384626433832795
    uniform vec2 resolution;
    uniform float time;
    uniform vec2 mouse;
    uniform sampler2D textureSampler;
    uniform vec2 drag;
    uniform float scale;
    uniform float scale2;
    uniform float scale3;
    uniform int format;
    uniform int prevFormat;
    uniform float timer;
    uniform sampler2D toyboy;

    float warp(vec2 p) {

      vec2 center = vec2(0.2,0.2);

      vec3 circle = smoothstep(.07,.15,vec3(length(p-center)));
      //circle = smoothstep(0.2,0.8,circle);
      //p = mix(p-center,(p-center)/10.,1.-circle.xy); //comment out
      //p *= 3.;

      vec2 p2 = p * 10.+.5*sin(7.0*p.y + time)*cos(5.0*p.x + time);
      p2 = p2 * 2.+.5*sin(4.0*p2.y + time/2.)*cos(3.0*p2.x + time/2.);
      p2 = p2 * 1.+.5*sin(4.0*p2.y + time/3.)*cos(3.0*p2.x + time/4.);
      p2 = p2 * 1.+.25*sin(4.0*p2.y + time/2.5)*cos(3.0*p2.x + time/2.);

      p2 += sin(4.*p.y+time/3.)*cos(6.*p.x+time/4.);

      p2 = fract(1.*p2);

      p2 = smoothstep(0., 0.5, p2) - smoothstep(0.5,1.,p2);

      float warped = length(p2);

      //return mix(warped,0.,1.-circle.x);
      return warped;

    }

 void main() {
   vec2 uv;

    if (resolution.x > resolution.y) {
      uv = gl_FragCoord.xy / resolution.x;
    }
    else {
      uv = gl_FragCoord.xy / resolution.y;
    }
    vec2 st = uv;
    vec2 origUv = uv;
    origUv.x /= 1.4;
    vec2 fractUv = fract(origUv*15. + uv.xy);
    vec2 squashedUv = gl_FragCoord.xy/resolution.y*2.5;
    squashedUv.x /= 1.4;
    squashedUv.x -= .15;
    squashedUv = vec2(uv.x, 1.);

    uv /= 4.;

    float f = warp(uv);
    float delta = 0.001;

    float dx = (warp(vec2(uv.x + delta, uv.y)) - f) / delta;
    float dy = (warp(vec2(uv.x, uv.y + delta)) - f) / delta;

    vec3 screenNormal = vec3(0.,0.,-1.);
    float bump = .02;
    screenNormal = normalize( screenNormal + vec3(dx,dy,0.)*bump);

    // LIGHTING  // lighting code and comments from https://www.shadertoy.com/view/4l2XWK
  //
// Determine the light direction vector, calculate its distance, then normalize it.
vec3 lightPos = vec3(cos(time)*2.+.5,sin(time)*2.+.5,-1.);
vec3 ld = lightPos - vec3(uv,0.);
float lDist = max(length(ld), 0.001);
ld /= lDist;

  // Light attenuation.
  //float atten = 1./(1.0 + lDist*lDist*0.15);
 float atten = min(1./(lDist*lDist*1.), 1.);

  // Using the bump function, "f," to darken the crevices. Completely optional, but I
  // find it gives extra depth.
  //atten *= f*.9 + .1;
  atten *= f*f*.7 + .3;
  atten *= pow(f, .75);



// Diffuse value.
float diff = max(dot(screenNormal, ld), 0.);
  // Enhancing the diffuse value a bit. Made up.
  diff = pow(diff, 4.)*0.66 + pow(diff, 8.)*0.34;
  // Specular highlighting.
  float spec = pow(max(dot( reflect(-ld, screenNormal), -vec3(uv,1.)), 0.), 12.);

  vec3 color = vec3(f,f+uv.x,1.);

  //vec3 texcolor = texture2D(textureSampler, reflect(normalize(vec3(uv,-5)), screenNormal).xz).rgb;
  vec3 texcolor = texture2D(textureSampler, uv+f*.1).rgb;
  color = mix(color, texcolor, 0.);
  color = (color + spec)*atten;

  if (format == 0) {
    color = texture2D(textureSampler, mix(uv, fractUv, .75) + (scale/4. + scale2/4.)*.0001*vec2(dx,dy)).xyz;

  }
  else if (format == 1) {
    // color = texture2D(textureSampler, fract(gl_FragCoord.xy) + (scale/4. + scale2/4. +.03)*.0001*vec2(dx,dy)).xyz; // cool too !
    // color *= .8;
    // color += .2;
    // vec2 displace = (scale/4. + scale2/4. +.03)*.0001*vec2(dx,dy);
    // if (fract(st.x * 3.) < .7 && fract(st.x*3.) > .3) {
    //   color = texture2D(textureSampler,st + displace).xyz;
    // }

    color = texture2D(textureSampler, uv + (scale/4. + scale2/4.)*.0001*vec2(dx,dy)).xyz;
  }
  else if (format == 2) {
    color = texture2D(textureSampler, origUv + (scale/8. + scale2/8.)*.0001*vec2(0.,dy*10.)).xyz;
  }
  else if (format == 3) {
    color = texture2D(textureSampler, squashedUv).xyz;
    color = mix(color, texture2D(textureSampler, vec2(st.y, 1.+scale)).xyz, .5);
  }
  else if (format == 4) {
    //color = texture2D(textureSampler, fract(origUv*6000. + uv*45.) + (scale/8.)*.0001*vec2(dx,dy)).xyz;
    color = texture2D(textureSampler, fract(gl_FragCoord.xy / 4.) + (scale2/5. + scale/5. +.2)*.0001*vec2(dx,dy)).xyz;
  }
  else { // this one is good too dont delete it !!!!
    color = texture2D(textureSampler, mix(uv, origUv+.08*vec2(dx,dy), .5) + (scale/8.)*.0001*vec2(dx,dy)).xyz;
  }

  vec3 tb = texture2D(toyboy, gl_FragCoord.xy / resolution.xy).xyz;
  vec3 outline = 5.*(1. - tb) * tb;
  outline = smoothstep(.7,.99,outline) * scale3 * scale3 * scale3;
  tb = smoothstep(0.4, 0.5, tb) * 2.;
  color *= mix(tb, vec3(1.), 1. - scale3);
  color += .3*color;
  color += color*outline;



    gl_FragColor= vec4(color, 1.0);
  }
`
