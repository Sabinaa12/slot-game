import * as PIXI from "pixi.js";
import { gsap } from "gsap";
import winSymbolImage from "../assets/WIN_BG.png";

/**
 * Symbol class
 */
export class Symbol extends PIXI.Container {
  private _winSprite!: PIXI.Sprite;
  private _symSprite!: PIXI.Sprite;
  private _tween: gsap.core.Tween | null = null;

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

    this._symSprite = new PIXI.Sprite(texture);
    this._winSprite = new PIXI.Sprite(winTexture);
    this._winSprite.visible = false;

    this.addChild(this._winSprite);
    this.addChild(this._symSprite);
  }

  /**
   *  Plays the win animation by scaling the symbol
   */
  public playSymbolAnimation(): void {
    this._winSprite.visible = true;
    this._tween = gsap.to(this.scale, {
      x: 1.2,
      y: 1.2,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }

  /**
   *  Stops the win animation and hides the win sprite.
   * */
  public stopSymbolAnimation(): void {
    if (this._tween) {
      this._tween.kill();
      this._tween = null;
    }
    this._winSprite.visible = false;
  }
}
