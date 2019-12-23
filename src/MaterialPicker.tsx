import React, { useEffect } from "react";
import useDisposeState from "./render/useDisposeState";
import { MeshStandardMaterial, Material } from "three";

interface MaterialPickerProps {
  materialUpdated?(material?: Material): void;
}

const MaterialPicker: React.FC<MaterialPickerProps> = ({ materialUpdated }) => {
  const [material] = useDisposeState(() => new MeshStandardMaterial());

  useEffect(() => {
    materialUpdated?.(material);
    return () => { materialUpdated?.(undefined); }
    // Do not watch materialUpdated for changes because it is a callback and may change between each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [material]);

  // TODO: Picker props
  return <div>
    <input value={material.roughness} onChange={e => {
      const val = parseInt(e.currentTarget.value, 10);
      if (!isNaN(val)) {
        material.setValues({ roughness: val });
      }
    }}>
    </input>
  </div>
}

export default MaterialPicker;