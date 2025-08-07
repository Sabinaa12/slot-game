import { Sprite, Container, Texture, Assets } from "pixi.js";

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
    this._buttonSprite = new Sprite(Assets.get("assets/PLAY.png"));
    this._buttonSprite.eventMode = "static";
    this._buttonSprite.cursor = "pointer";
    this.position.set(900, 290);
    this._buttonSprite.scale.x = 0.7;
    this._buttonSprite.scale.y = 0.7;

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
    this.disable(false);
    gsap.to(this._buttonSprite.scale, {
      x: 0.6,
      y: 0.6,
      duration: 0.1,
      ease: "power1.out",
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.enable(false);
        SpinButton.pressedButtonHandler();
      },
    });
  }

  /**
   * Disables the button
   */
  public disable(updateTexture: boolean = true): void {
    if (updateTexture) {
      this._buttonSprite.texture = Assets.get("assets/PLAY_DISABLED.png");
    }

    this.interactive = false;
    this._buttonSprite.eventMode = "none";
    this._buttonSprite.cursor = "default";
  }

  /**
   * Enables the button
   */
  public enable(updateTexture: boolean = true): void {
    if (updateTexture) {
      this._buttonSprite.texture = Assets.get("assets/PLAY.png");
    }
    this.interactive = true;
    this._buttonSprite.eventMode = "static";
    this._buttonSprite.cursor = "pointer";
  }
}
