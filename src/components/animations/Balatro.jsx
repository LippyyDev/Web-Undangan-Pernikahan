import React, { useRef, useEffect } from 'react';

function hexToRgb(hex) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  return [r / 255, g / 255, b / 255];
}

const vertexShaderSource = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform float u_spinRotation;
  uniform float u_spinSpeed;
  uniform float u_contrast;
  uniform float u_lighting;
  uniform float u_spinAmount;
  uniform float u_pixelFilter;

  // Generic plasma/swirl mapping for balatro effect
  void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      
      // Pixel filter handling
      if (u_pixelFilter > 0.0) {
          vec2 pixels = u_resolution.xy / (u_resolution.x / u_pixelFilter);
          uv = floor(uv * pixels) / pixels;
      }
      
      // Aspect ratio correction & centering
      vec2 p = uv * 2.0 - 1.0;
      p.x *= u_resolution.x / u_resolution.y;

      float r = length(p);
      float a = atan(p.y, p.x);
      
      // Apply spin amount and rotation
      float v = sin(r * u_spinAmount * 10.0 - u_time * u_spinSpeed + a * u_spinRotation);
      float w = sin((p.x + p.y) * 4.0 + u_time * 2.0) + cos((p.x - p.y) * 3.0 + u_time);
      
      float mixVal = smoothstep(-1.0, 1.0, v + w * 0.5);
      
      vec3 col = mix(u_color1, u_color2, mixVal);
      col = mix(col, u_color3, smoothstep(-1.0, 1.0, sin(v * 2.0 + u_time)));

      // Applying contrast
      col = (col - 0.5) * u_contrast + 0.5;
      
      // Applying lighting centered highlight
      col += u_lighting * (1.0 - r);
      
      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

export default function Balatro({
  spinRotation = -2,
  spinSpeed = 7,
  color1 = '#d3abbf',
  color2 = '#ffffff',
  color3 = '#d5d7d8',
  contrast = 3.5,
  lighting = 0.25,
  spinAmount = 0.25,
  pixelFilter = 1850,
  className = ''
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, 'position');
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1.0, -1.0,   1.0, -1.0,   -1.0, 1.0,   -1.0, 1.0,   1.0, -1.0,   1.0, 1.0]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
      u_color1: gl.getUniformLocation(program, 'u_color1'),
      u_color2: gl.getUniformLocation(program, 'u_color2'),
      u_color3: gl.getUniformLocation(program, 'u_color3'),
      u_spinRotation: gl.getUniformLocation(program, 'u_spinRotation'),
      u_spinSpeed: gl.getUniformLocation(program, 'u_spinSpeed'),
      u_contrast: gl.getUniformLocation(program, 'u_contrast'),
      u_lighting: gl.getUniformLocation(program, 'u_lighting'),
      u_spinAmount: gl.getUniformLocation(program, 'u_spinAmount'),
      u_pixelFilter: gl.getUniformLocation(program, 'u_pixelFilter')
    };

    let animationFrameId;
    let startTime = Date.now();

    const render = () => {
      const { clientWidth, clientHeight } = canvas;
      if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
        canvas.width = clientWidth;
        canvas.height = clientHeight;
        gl.viewport(0, 0, clientWidth, clientHeight);
      }

      const time = (Date.now() - startTime) * 0.001;
      
      gl.uniform1f(uniforms.u_time, time);
      gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
      gl.uniform3fv(uniforms.u_color1, hexToRgb(color1));
      gl.uniform3fv(uniforms.u_color2, hexToRgb(color2));
      gl.uniform3fv(uniforms.u_color3, hexToRgb(color3));
      gl.uniform1f(uniforms.u_spinRotation, spinRotation);
      gl.uniform1f(uniforms.u_spinSpeed, spinSpeed);
      gl.uniform1f(uniforms.u_contrast, contrast);
      gl.uniform1f(uniforms.u_lighting, lighting);
      gl.uniform1f(uniforms.u_spinAmount, spinAmount);
      gl.uniform1f(uniforms.u_pixelFilter, pixelFilter);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [spinRotation, spinSpeed, color1, color2, color3, contrast, lighting, spinAmount, pixelFilter]);

  return <canvas ref={canvasRef} className={className} style={{ width: '100%', height: '100%', display: 'block' }} />;
}
