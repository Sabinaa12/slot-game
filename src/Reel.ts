import * as PIXI from "pixi.js";
import symbolImage from "../assets/SYM04.png";
import { Symbol } from "./Symbol";
import { gsap } from "gsap";

/**
 * Reel class – represents a single reel with symbols.
 */
export class Reel extends PIXI.Container {
  constructor() {
    super();
    this.addSymbol();
  }

  //TO DO
  private addSymbol(): void {
    const texture = PIXI.Texture.from(symbolImage);
    const symbol = new Symbol(texture);
    symbol.playSymbolAnimation();

    this.addChild(symbol);
    gsap.delayedCall(3, () => {
      symbol.stopSymbolAnimation();
    });
  }
}
