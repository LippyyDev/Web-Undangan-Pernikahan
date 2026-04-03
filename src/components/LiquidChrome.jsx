import { useEffect, useRef } from 'react';

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float u_time;
  uniform vec2  u_resolution;
  uniform float u_speed;
  uniform float u_amplitude;
  uniform float u_frequencyX;
  uniform float u_frequencyY;
  uniform vec2  u_mouse;
  uniform bool  u_interactive;

  // Color palette — creamy pink & white
  // color1 = warm white / cream
  // color2 = soft blush pink
  // color3 = light rose
  const vec3 COLOR_A = vec3(1.00, 0.97, 0.94);   // #FFF7F0  warm cream-white
  const vec3 COLOR_B = vec3(0.98, 0.85, 0.87);   // #FAD9DE  blush pink
  const vec3 COLOR_C = vec3(0.95, 0.72, 0.76);   // #F2B8C2  dusty rose
  const vec3 COLOR_D = vec3(1.00, 0.92, 0.93);   // #FFEAEE  very light rose

  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i + vec2(0.0, 0.0));
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p  = p * 2.0 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv.y = 1.0 - uv.y;

    float t = u_time * u_speed;

    // Mouse influence
    vec2 mouse = u_mouse;
    if (!u_interactive) mouse = vec2(0.5, 0.5);
    float mdist = length(uv - mouse);
    float mfx = exp(-mdist * 4.0) * u_amplitude * 0.4;

    // Domain warp
    vec2 q = vec2(
      fbm(uv * vec2(u_frequencyX, u_frequencyY) + vec2(0.0, t * 0.3)),
      fbm(uv * vec2(u_frequencyX, u_frequencyY) + vec2(5.2, t * 0.3 + 1.3))
    );

    vec2 r = vec2(
      fbm(uv * vec2(u_frequencyX, u_frequencyY) + 4.0 * q + vec2(1.7, 9.2) + t * 0.15 + mfx),
      fbm(uv * vec2(u_frequencyX, u_frequencyY) + 4.0 * q + vec2(8.3, 2.8) + t * 0.12 + mfx)
    );

    float f = fbm(uv * vec2(u_frequencyX, u_frequencyY) + 4.0 * r + t * 0.05);
    f = f * u_amplitude + (1.0 - u_amplitude) * 0.5;
    f = clamp(f, 0.0, 1.0);

    // Flow highlight (silky sheen)
    float sheen = fbm(uv * vec2(u_frequencyX * 2.0, u_frequencyY * 2.0) + vec2(t * 0.2, t * 0.1));
    sheen = pow(sheen, 3.0) * 0.6;

    // Mix palette
    vec3 col = mix(COLOR_A, COLOR_B, smoothstep(0.0, 0.5,  f));
    col       = mix(col,    COLOR_C, smoothstep(0.4, 0.75, f));
    col       = mix(col,    COLOR_D, smoothstep(0.65, 0.9, f));

    // Add white sheen layer
    col = mix(col, vec3(1.0, 1.0, 1.0), sheen * 0.5);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function LiquidChrome({
  speed = 0.2,
  amplitude = 0.3,
  frequencyX = 3,
  frequencyY = 3,
  interactive = true,
  style = {},
  className = '',
}) {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const glRef     = useRef(null);
  const programRef = useRef(null);
  const uniRef    = useRef({});
  const mouseRef  = useRef([0.5, 0.5]);
  const startRef  = useRef(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;
    glRef.current = gl;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER,   vertexShader));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragmentShader));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    programRef.current = prog;

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    // Cache uniforms
    const uni = uniRef.current;
    uni.time        = gl.getUniformLocation(prog, 'u_time');
    uni.resolution  = gl.getUniformLocation(prog, 'u_resolution');
    uni.speed       = gl.getUniformLocation(prog, 'u_speed');
    uni.amplitude   = gl.getUniformLocation(prog, 'u_amplitude');
    uni.frequencyX  = gl.getUniformLocation(prog, 'u_frequencyX');
    uni.frequencyY  = gl.getUniformLocation(prog, 'u_frequencyY');
    uni.mouse       = gl.getUniformLocation(prog, 'u_mouse');
    uni.interactive = gl.getUniformLocation(prog, 'u_interactive');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = [
        (e.clientX - r.left) / r.width,
        1.0 - (e.clientY - r.top) / r.height,
      ];
    };
    if (interactive) canvas.addEventListener('mousemove', onMouse);

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !rafRef.current) {
          rafRef.current = requestAnimationFrame(render);
        } else if (!isVisible && rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!isVisible) return;
      const t = (performance.now() - startRef.current) / 1000;
      gl.uniform1f(uni.time,        t);
      gl.uniform2f(uni.resolution,  canvas.width, canvas.height);
      gl.uniform1f(uni.speed,       speed);
      gl.uniform1f(uni.amplitude,   amplitude);
      gl.uniform1f(uni.frequencyX,  frequencyX);
      gl.uniform1f(uni.frequencyY,  frequencyY);
      gl.uniform2fv(uni.mouse,      mouseRef.current);
      gl.uniform1i(uni.interactive, interactive ? 1 : 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      observer.disconnect();
      if (interactive) canvas.removeEventListener('mousemove', onMouse);
      gl.deleteProgram(prog);
    };
  }, [speed, amplitude, frequencyX, frequencyY, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  );
}
