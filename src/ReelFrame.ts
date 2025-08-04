import * as PIXI from "pixi.js";
import reelFrame from "../assets/REEL.png";

export class ReelFrame extends PIXI.Sprite {
  constructor() {
    const texture = PIXI.Texture.from(reelFrame);
    super(texture);
    this.createReelFrame();
  }

  private createReelFrame(): void {
    this.pivot.set(this.width / 2, this.height / 2);
    this.x = 200;
    this.y = 100;
  }
}
