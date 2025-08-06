import { Reel } from "./Reel";
import { Container } from "pixi.js";
import { ReelFrame } from "./ReelFrame";
import { SpinButton } from "./SpinButton";
import { BalanceDisplay } from "./BalanceDisplay";

/**
 * Main class of slot game
 */
export class MainApp extends Container {
  private _reel!: Reel;
  private _reelFrame!: ReelFrame;
  private _spinButton!: SpinButton;
  private _balanceDisplay!: BalanceDisplay;
  private _currentBalance: number = 100;
  constructor() {
    super();
    this.init();
  }

  /** Initializes the main components of the game. */
  private init(): void {
    this.createReelFrame();
    this.createReel();
    this.createSpinButton();
    this.createBalanceDisplay();
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
      if (this._currentBalance > 0)
        this._balanceDisplay.updateBalance(--this._currentBalance);
    };
  }

  /**
   * Creates the balance display
   */
  private createBalanceDisplay(): void {
    this._balanceDisplay = new BalanceDisplay();
    this.addChild(this._balanceDisplay);
  }
}
