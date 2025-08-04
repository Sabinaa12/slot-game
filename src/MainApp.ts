import { Reel } from "./Reel";
import { Container } from "pixi.js";
import { ReelFrame } from "./ReelFrame";

/**
 * Main cladd of slot game
 */
export class MainApp extends Container {
  private _reel!: Reel;
  private _reelFrame!: ReelFrame;

  constructor() {
    super();
    this.init();
  }

  /** Initializes the main components of the game. */
  private init(): void {
    this.createReelFrame();
    this.createReel();
  }

  /**
   * Creates and adds the reel to the stage.
   */
  private createReel(): void {
    this._reel = new Reel();
    this.addChild(this._reel);
  }

  /**
   * Creates and adds the reel frame to the stage.
   */
  private createReelFrame(): void {
    this._reelFrame = new ReelFrame();
    this.addChild(this._reelFrame);
  }
}
