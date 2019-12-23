import React from 'react';
import { useObject } from './Renderer';
import { Object3D } from 'three';

interface RenderObjProps {
  value?: () => Object3D
}

const RenderObj: React.FC<RenderObjProps> = ({ value }) => {

  const [obj] = React.useState(value);
  useObject(obj);

  return (
    <React.Fragment />
  );
}

export default RenderObj;
