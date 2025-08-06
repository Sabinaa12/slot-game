import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import winSymbolImage from "../assets/WIN_BG.png";

/**
 * Symbol class
 */
export class Symbol extends PIXI.Container {
  private _winSprite!: PIXI.Sprite;
  private _symSprite!: PIXI.Sprite;
  private _winAnimationTween: gsap.core.Tween | null = null;
  private _symbolName: string = "";

  constructor(texture: PIXI.Texture) {
    super();
    this.createSprites(texture);
  }

  /**
   * Initializes the main and win sprites.
   * @param texture
   */
  private createSprites(texture: PIXI.Texture): void {
    const winTexture = PIXI.Texture.from(winSymbolImage);
    const symbolSize: number = 120;

    this._symSprite = new PIXI.Sprite(texture);
    this._winSprite = new PIXI.Sprite(winTexture);
    this._winSprite.visible = false;

    this._symbolName =
      this._symSprite.texture.textureCacheIds?.[0] ?? "unknown";

    [this._symSprite, this._winSprite].forEach((sprite) => {
      sprite.width = symbolSize;
      sprite.height = symbolSize;
      sprite.anchor.set(0.5);
    });

    this.width = symbolSize;
    this.height = symbolSize;

    this.addChild(this._winSprite);
    this.addChild(this._symSprite);
  }

  /**
   * Returns the symbol's name
   */
  public getSymbolName(): string {
    return this._symbolName;
  }

  /**
   *  Plays the win animation by scaling the symbol
   */
  public playSymbolAnimation(): void {
    this._winSprite.visible = true;
    this._winAnimationTween = gsap.to(this.scale, {
      x: 1.1,
      y: 1.1,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  /**
   *  Stops the win animation and hides the win sprite.
   */
  public stopSymbolAnimation(): void {
    if (this._winAnimationTween) {
      this._winAnimationTween.kill();
      this._winAnimationTween = null;
    }
    this._winSprite.visible = false;
  }
}
