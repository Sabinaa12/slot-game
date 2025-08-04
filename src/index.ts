import * as PIXI from "pixi.js";
import symbolImage from "../assets/SYM04.png";

const app = new PIXI.Application({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view as HTMLCanvasElement);

const texture = PIXI.Texture.from(symbolImage);
const sprite = new PIXI.Sprite(texture);
sprite.x = 300;
sprite.y = 200;
sprite.scale.set(0.5);

app.stage.addChild(sprite);
