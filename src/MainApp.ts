import { Reel } from "./Reel";
import { Container } from "pixi.js";

/**
 * Main cladd of slot game
 */
export class MainApp extends Container {
  private _reel!: Reel;

  constructor() {
    super();
    this.init();
  }

  /** Initializes the main components of the game. */
  private init(): void {
    this.createReel();
  }

  /**
   * Creates and adds the reel to the stage.
   */
  private createReel(): void {
    this._reel = new Reel();
    this.addChild(this._reel);
  }
}
