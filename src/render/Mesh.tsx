import React from 'react';
import { useObject } from './Renderer';
import { Mesh as TMesh, Geometry, BufferGeometry, Material } from 'three';

interface MeshProps {
  geometry?: Geometry | BufferGeometry,
  material?: Material | Material[]
}

const Mesh: React.FC<MeshProps> = ({ geometry, material }) => {

  const mesh = React.useMemo(() => new TMesh(geometry, material), [geometry, material]);
  useObject(mesh);

  return (
    <React.Fragment />
  );
}

export default Mesh;
