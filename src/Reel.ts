import * as PIXI from "pixi.js";
import sym01 from "../assets/SYM01.png";
import sym02 from "../assets/SYM02.png";
import sym03 from "../assets/SYM03.png";
import sym04 from "../assets/SYM04.png";
import sym05 from "../assets/SYM05.png";
import sym06 from "../assets/SYM06.png";

import { Symbol } from "./Symbol";
import { gsap } from "gsap";

/**
 * Reel class – represents a single reel with symbols.
 */
export class Reel extends PIXI.Container {
  private readonly _symbolTextures = [sym01, sym02, sym03, sym04, sym05, sym06];
  private _symbols: Symbol[] = [];
  private _maskGraphics!: PIXI.Graphics;
  private _initialSymbols: Symbol[] = [];
  private readonly _symbSpacing: number = 65;
  private readonly _symbSize: number = 120;

  constructor() {
    super();

    this.createMask();
    this.addSymbols();
    this.pivot.set(0, 0);
    this.position.set(0, 0);
  }

  /**
   * Creates masking graphics to define the visible area of the reel
   */
  private createMask(): void {
    this._maskGraphics = new PIXI.Graphics();
    this._maskGraphics.beginFill(0xffffff);
    this._maskGraphics.drawRect(0, 108, 1000, 380);
    this._maskGraphics.endFill();
    this.mask = this._maskGraphics;
  }

  /**
   * Adds initial and virtual reel symbols to the container
   */

  private addSymbols(): void {
    this.initSandwich();
    this.virtualReels();
  }

  /**
   * Creates a random symbol with a specific vertical position.
   */
  private createRandomSymbol(y: number): Symbol {
    const index = Math.floor(Math.random() * this._symbolTextures.length);
    const texture = PIXI.Texture.from(this._symbolTextures[index]);
    const symbol = new Symbol(texture);
    symbol.y = y;
    return symbol;
  }

  /**
   * Creates the first 5 symbols, positioned on the reel
   */
  private initSandwich(): void {
    for (let i = 0; i < 5; i++) {
      const symbol = this.createRandomSymbol(
        548 - i * (this._symbSize / 2 + this._symbSpacing)
      );
      this._initialSymbols.push(symbol);
      this.addChild(symbol);
    }
  }

  /**
   *
   * Generates additional symbols for the spinning animation.
   */
  private virtualReels(): void {
    const baseY = this._initialSymbols[0].y;
    for (let i = 5; i < 20; i++) {
      const symbol = this.createRandomSymbol(
        baseY - i * (this._symbSize / 2 + this._symbSpacing)
      );

      this._symbols.push(symbol);
      this.addChild(symbol);
    }
  }

  /**
   * Resets symbols after the spinning animation.
   */
  private resetSymbols(): void {
    const lastFive = this._symbols.slice(-5);
    this._initialSymbols = [...lastFive];
    this.removeChildren();

    this._initialSymbols.forEach((symbol, i) => {
      symbol.y = 548 - i * (symbol.height / 2 + 65);
      this.addChild(symbol);
    });
    this.virtualReels();

    this.y = 0;
  }

  /**
   * Triggers the reel spin animation using GSAP Timeline:
   */
  public startSpin(): void {
    var tl = gsap.timeline();
    tl.to(this, {
      y: this.y - 50,
      duration: 0.3,
      ease: "power1.out",
    }).to(this, {
      y: 1875,
      duration: 2.7,
      ease: "power1.out",
      onComplete: () => {
        this.resetSymbols();
      },
    });
  }
}
