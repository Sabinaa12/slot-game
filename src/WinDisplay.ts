import * as PIXI from "pixi.js";

/**
 * WinDisplay displays the amount won after a spin.
 */
export class WinDisplay extends PIXI.Text {
  constructor(wonValue: number = 0) {
    super(`Win: ${wonValue} $`, {
      fontSize: 24,
      fill: "#2d3748",
      fontWeight: "bold",
      fontFamily: "Arial",
      stroke: "#ddceceff",
      strokeThickness: 2,
    });
    this.setPosition();
  }

  /**
   *
   * Sets the fixed position of the win display on screen.
   */
  private setPosition(): void {
    this.position.set(400, 600);
  }

  /**
   * Updates the displayed win amount.
   * @param balance
   */
  public updateWin(wonValue: number): void {
    this.text = `Win: ${wonValue} $`;
  }
}
