import { Reel } from "./Reel";
import { Container } from "pixi.js";
import { ReelFrame } from "./ReelFrame";
import { SpinButton } from "./SpinButton";

/**
 * Main cladd of slot game
 */
export class MainApp extends Container {
  private _reel!: Reel;
  private _reelFrame!: ReelFrame;
  private _spinButton!: SpinButton;
  constructor() {
    super();
    this.init();
  }

  /** Initializes the main components of the game. */
  private init(): void {
    this.createReelFrame();
    this.createReel();
    this.createSpinButton();
  }

  /**
   * Creates and adds the reel to the stage.
   */
  private createReel(): void {
    this._reel = new Reel();
    this.addChild(this._reel);
    this._reel.x = 270;
  }

  /**
   * Creates and adds the reel frame to the stage.
   */
  private createReelFrame(): void {
    this._reelFrame = new ReelFrame();
    this.addChild(this._reelFrame);
  }

  /**
   * Creates and adds the spin button to the stage.
   */
  private createSpinButton(): void {
    this._spinButton = new SpinButton();
    this.addChild(this._spinButton);
    SpinButton.pressedButtonHandler = () => {
      this._reel.startSpin();
    };
  }
}
