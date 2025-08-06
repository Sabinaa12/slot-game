import * as PIXI from "pixi.js";

/**
 * BalanceDisplay — a text field showing the player's current balance.
 */
export class BalanceDisplay extends PIXI.Text {
  constructor(balance = 100) {
    super(`Balance: ${balance} $`, { fontSize: 24, fill: "#fff" });
    this.balancePosition();
  }

  private balancePosition(): void {
    this.x = 100;
    this.y = 560;
  }

  /**
   * Updates the displayed balance value.
   * @param balance
   */
  public updateBalance(balance: number): void {
    this.text = `Balance: ${balance} $`;
  }
}
