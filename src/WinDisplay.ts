import * as PIXI from "pixi.js";

/**
 * WinDisplay displays the amount won after a spin.
 */
export class WinDisplay extends PIXI.Text {
  constructor(wonValue: number = 0) {
    super(`Win: ${wonValue} $`, { fontSize: 24, fill: "#fff" });
    this.setPosition();
  }

  /**
   *
   * Sets the fixed position of the win display on screen.
   */
  private setPosition(): void {
    this.position.set(500, 560);
  }

  /**
   * Updates the displayed win amount.
   * @param balance
   */
  public updateBalance(wonValue: number): void {
    this.text = `Win: ${wonValue} $`;
  }
}
