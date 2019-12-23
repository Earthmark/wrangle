import React from 'react';
import { TorusBufferGeometry, PerspectiveCamera, Material, AmbientLight, DirectionalLight } from 'three';
import Renderer from './render/Renderer';
import Mesh from './render/Mesh';
import { OrbitControls } from './render/OrbitControls';
import useDisposeState from './render/useDisposeState';
import MaterialPicker from './MaterialPicker';
import RenderObj from './render/RenderObj';

const App: React.FC = () => {
  const [geometry1] = useDisposeState(() => new TorusBufferGeometry(10, 1, 16, 100));
  const [geometry2] = useDisposeState(() => new TorusBufferGeometry(5, 3, 16, 100));

  const [materials, setMaterials] = React.useState<(Material | undefined)[]>([undefined, undefined, undefined]);

  return (
    <div>
      {
        materials.map((_, i) => <MaterialPicker key={i} materialUpdated={newMaterial => setMaterials(s => {
          const newCopy = [...s];
          newCopy[i] = newMaterial;
          return newCopy;
        })} />)
      }
      <Renderer height={800} width={800}
        createCamera={(aspectRatio) => new PerspectiveCamera(75, aspectRatio, 0.1, 1000)}
        createControls={(camera, canvas) => new OrbitControls(camera, canvas)}>
        {renderTarget => <>
          <Mesh material={materials[0]} geometry={geometry1} />
          <Mesh material={materials[1]} geometry={geometry2} />
          <RenderObj value={() => new AmbientLight(0x333333)} ></RenderObj>
          <RenderObj value={() => new DirectionalLight(0xFFFFFF, 1.0)} ></RenderObj>
          <canvas ref={renderTarget}></canvas>
        </>
        }
      </Renderer>
    </div>
  );
}

export default App;
