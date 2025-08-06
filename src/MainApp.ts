import { Reel } from "./Reel";
import { Container } from "pixi.js";
import { ReelFrame } from "./ReelFrame";
import { SpinButton } from "./SpinButton";
import { BalanceDisplay } from "./BalanceDisplay";
import { WinDisplay } from "./WinDisplay";

/**
 * Main class of slot game
 */
export class MainApp extends Container {
  private _reel!: Reel;
  private _reelFrame!: ReelFrame;
  private _spinButton!: SpinButton;
  private _balanceDisplay!: BalanceDisplay;
  private _winDisplay!: WinDisplay;
  private _currentBalance: number = 100;
  constructor() {
    super();
    this.init();
  }

  /**
   * Initializes all main game components.
   */
  private init(): void {
    this.createReelFrame();
    this.createReel();
    this.createSpinButton();
    this.createBalanceDisplay();
    this.createWinDisplay();
  }

  /**
   * Creates and adds the reel to the stage.
   */
  private createReel(): void {
    this._reel = new Reel();
    this.addChild(this._reel);
    this._reel.x = 270;
    Reel.stopSpinHandler = this.handleStopSpin.bind(this);
  }
  /**
   * Called when reel stops spinning to evaluate win logic.
   */
  private handleStopSpin(): void {
    this.evaluateWin();
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
    SpinButton.pressedButtonHandler = this.handleSpinButtonPress.bind(this);
  }

  /**
   * Handles the logic for when the spin button is pressed
   */
  private handleSpinButtonPress(): void {
    this._winDisplay.updateBalance(0);

    if (this._reel.spinInProgress) {
      this._reel.stopSpin();
    } else {
      this._reel.startSpin();
    }

    if (this._currentBalance > 0) {
      this._balanceDisplay.updateBalance(--this._currentBalance);
      if (this._currentBalance === 0) this._spinButton.disable();
    }
  }

  /**
   * Creates the balance display
   */
  private createBalanceDisplay(): void {
    this._balanceDisplay = new BalanceDisplay();
    this.addChild(this._balanceDisplay);
  }

  /**
   * Creates the win display
   */
  private createWinDisplay(): void {
    this._winDisplay = new WinDisplay();
    this.addChild(this._winDisplay);
  }

  /**
   * Evaluates win based on matching symbols and updates balance/display.
   */
  private evaluateWin(): void {
    const stopSymbols = this._reel.getInitialSandwichSymbols();
    const symbolIndexesByName: Map<string, number[]> = new Map();

    for (let i = 1; i < 4; i++) {
      const symbol = stopSymbols[i];
      const symName = symbol.getSymbolName();

      if (!symbolIndexesByName.has(symName)) {
        symbolIndexesByName.set(symName, []);
      }

      symbolIndexesByName.get(symName)!.push(i);
    }

    symbolIndexesByName.forEach((indexes, key) => {
      if (indexes.length >= 2) {
        if (this._currentBalance === 0) this._spinButton.enable();

        indexes.forEach((i) => {
          stopSymbols[i].playSymbolAnimation();
        });

        const winAmount = indexes.length;
        this._currentBalance += winAmount;
        this._balanceDisplay.updateBalance(this._currentBalance);
        this._winDisplay.updateBalance(winAmount);
      }
    });
  }
}
