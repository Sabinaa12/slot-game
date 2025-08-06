import { Sprite, Container, Texture } from "pixi.js";
import playButton from "../assets/PLAY.png";
import disabledButton from "../assets/PLAY_DISABLED.png";
import { gsap } from "gsap";

/**
 * Spin Button class
 */
export class SpinButton extends Container {
  private _buttonSprite!: Sprite;
  public static pressedButtonHandler: Function;
  constructor() {
    super();
    this.initButton();
    this.setupEvents();
  }

  /**
   * Creates the play button
   */
  private initButton(): void {
    this._buttonSprite = new Sprite(Texture.from(playButton));
    this._buttonSprite.eventMode = "static";
    this._buttonSprite.cursor = "pointer";
    this.position.set(500, 200);
    this._buttonSprite.anchor.set(0.5);

    this.addChild(this._buttonSprite);
  }

  /**
   * Registers pointer event for button press
   */
  private setupEvents(): void {
    this._buttonSprite.on("pointerdown", () => this.onPress());
  }

  /**
   * Plays button press animation and triggers handler
   */
  public onPress(): void {
    gsap.to(this._buttonSprite.scale, {
      x: 0.9,
      y: 0.9,
      duration: 0.1,
      ease: "power1.out",
      yoyo: true,
      repeat: 1,
    });

    SpinButton.pressedButtonHandler();
  }

  /**
   * Disables the button
   */
  public disable(): void {
    this._buttonSprite.texture = Texture.from(disabledButton);
    this.interactive = false;
    this._buttonSprite.eventMode = "none";
    this._buttonSprite.cursor = "default";
  }

  /**
   * Enables the button
   */
  public enable(): void {
    this._buttonSprite.texture = Texture.from(playButton);
    this.interactive = true;
    this._buttonSprite.eventMode = "static";
    this._buttonSprite.cursor = "pointer";
  }
}
