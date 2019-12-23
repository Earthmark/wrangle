import React, { useContext, useEffect } from 'react';
import { Scene, WebGLRenderer, Object3D, Camera } from "three";
import useDisposeState from './useDisposeState';

const CanvasContext = React.createContext<Scene | null>(null);

export function useObject(object?: Object3D | null | undefined) {
  const ctx = useContext(CanvasContext);
  useEffect(() => {
    if (object) {
      ctx?.add(object);
      return () => { ctx?.remove(object); }
    }
  }, [ctx, object]);
}

interface CanvasProps {
  width: number,
  height: number,
  createCamera(aspectRatio: number): Camera;
  createControls?(object: Camera, domElement?: HTMLElement): {
    update(): void;
  },
  children?(renderTarget: React.RefObject<HTMLCanvasElement>): React.ReactNode
}

const Canvas: React.FC<CanvasProps> = ({ width, height, children, createControls, createCamera }) => {
  const [scene] = useDisposeState(() => new Scene());

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const camera = createCamera(width / height);

      const controls = createControls?.(camera, canvas);
      controls?.update();

      const renderer = new WebGLRenderer({
        canvas
      });
      renderer.setSize(width, height);

      camera.position.set(0, 0, 30);

      let animateRequest: number | undefined;
      const animate = function () {
        animateRequest = requestAnimationFrame(animate);

        controls?.update();
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        if (animateRequest !== undefined) {
          cancelAnimationFrame(animateRequest);
        }
        scene.dispose();
        renderer.dispose();
      }
    }
  }, [canvasRef, width, height, scene, createControls, createCamera]);

  return (
    <CanvasContext.Provider value={scene}>
      {children?.(canvasRef)}
    </CanvasContext.Provider>
  );
}

export default Canvas;
