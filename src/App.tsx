import React from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, TorusBufferGeometry, Color, AmbientLight, DirectionalLight, MeshPhongMaterial, DoubleSide } from "three";
import { OrbitControls } from './OrbitControls';

const App: React.FC = () => {

  const bodyDiv = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const body = bodyDiv.current;
    if (body) {
      const scene = new Scene();
      const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

      const ambientLight = new AmbientLight(0x333333);

      const light = new DirectionalLight(0xFFFFFF, 1.0);

      const materialColor = new Color();
      materialColor.setRGB(1, 1, 1);

      const flat = new MeshPhongMaterial({ color: materialColor, specular: 0x000000, side: DoubleSide });

      const controls = new OrbitControls(camera, body);
      controls.update();

      const renderer = new WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.gammaInput = true;
      renderer.gammaOutput = true;
      const child = body.appendChild(renderer.domElement);

      const geometry = new TorusBufferGeometry(10, 1, 16, 100);
      const cube = new Mesh(geometry, flat);
      scene.add(cube);
      scene.add(ambientLight);
      scene.add(light);

      camera.position.z = 30;

      let animateRequest: number | undefined;
      const animate = function () {
        animateRequest = requestAnimationFrame(animate);

        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        if (animateRequest !== undefined) {
          cancelAnimationFrame(animateRequest);
        }
        child.remove();
        scene.dispose();
        renderer.dispose();
        geometry.dispose();
      }
    }
  }, [bodyDiv]);

  return (
    <div ref={bodyDiv} />
  );
}

export default App;
