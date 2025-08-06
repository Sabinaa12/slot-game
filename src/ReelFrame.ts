import * as PIXI from "pixi.js";
import reelFrame from "../assets/REEL.png";

/**
 * ReelFrame class
 */
export class ReelFrame extends PIXI.Sprite {
  constructor() {
    const texture = PIXI.Texture.from(reelFrame);
    super(texture);
    this.setupFrame();
  }

  /**
   * Positions the reel frame and sets its pivot to center
   */
  private setupFrame(): void {
    this.pivot.set(this.width / 2, this.height / 2);
    this.position.set(600, 100);
  }
}
