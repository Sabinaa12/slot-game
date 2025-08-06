import * as PIXI from "pixi.js";

import { MainApp } from "./MainApp";
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,

  backgroundColor: 0xa7b2ef,
});
document.body.appendChild(app.view as HTMLCanvasElement);

const mainApp = new MainApp();

app.stage.addChild(mainApp);

window.addEventListener("resize", () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});
