import React, { FC } from "react";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import {
  Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder,
} from "@babylonjs/core";

import "./App.css";

export const App: FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const engine = new Engine(canvas, true);
      const scene = new Scene(engine);

      const camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
      camera.attachControl(canvas, true);
      const light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
      const sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);

      // hide/show the Inspector
      window.addEventListener("keydown", (ev) => {
        // Shift+Ctrl+Alt+I
        if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.keyCode === 73) {
          if (scene.debugLayer.isVisible()) {
            scene.debugLayer.hide();
          } else {
            scene.debugLayer.show();
          }
        }
      });

      engine.runRenderLoop(() => {
        scene.render();
      });
    }
  }, [canvasRef]);

  return <canvas ref={canvasRef} />;
};
