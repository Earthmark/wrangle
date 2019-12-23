import React, { useEffect } from "react";
import useDisposeState from "./render/useDisposeState";
import { MeshPhysicalMaterial, Material } from "three";
import { Slider, Typography, Paper } from "@material-ui/core";

interface MaterialPickerProps {
  materialUpdated?(material?: Material): void;
}

const MaterialPicker: React.FC<MaterialPickerProps> = ({ materialUpdated }) => {
  const [material] = useDisposeState(() => new MeshPhysicalMaterial({}));

  useEffect(() => {
    materialUpdated?.(material);
    return () => { materialUpdated?.(undefined); }
    // Do not watch materialUpdated for changes because it is a callback and may change between each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [material]);

  // TODO: Picker props
  return <Paper>
    <Typography>
      Material Information
    </Typography>
    <Typography id="roughness-slider" gutterBottom>
      Roughness
    </Typography>
    <Slider
      aria-labelledby="roughness-slider"
      defaultValue={material.roughness}
      min={0}
      step={0.05}
      max={1}
      onChange={(_, n) => material.roughness = n as number} />
    <Typography id="metalness-slider" gutterBottom>
      Metalness
    </Typography>
    <Slider
      aria-labelledby="metalness-slider"
      defaultValue={material.metalness}
      min={0}
      step={0.05}
      max={1}
      onChange={(_, n) => material.metalness = n as number} />
    <Typography id="clearcoat-slider" gutterBottom>
      Clearcoat
      </Typography>
    <Slider
      aria-labelledby="clearcoat-slider"
      defaultValue={material.clearcoat}
      min={0}
      step={0.05}
      max={1}
      onChange={(_, n) => material.clearcoat = n as number} />
    <Typography id="clearcoat-roughness-slider" gutterBottom>
      Clearcoat Roughness
        </Typography>
    <Slider
      aria-labelledby="clearcoat-roughness-slider"
      defaultValue={material.clearcoatRoughness}
      min={0}
      step={0.05}
      max={1}
      onChange={(_, n) => material.clearcoatRoughness = n as number} />
  </Paper>
}

export default MaterialPicker;