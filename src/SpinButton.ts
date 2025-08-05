import { Sprite, Container, Texture } from "pixi.js";
import playButton from "../assets/PLAY.png";
import disabledButton from "../assets/PLAY_DISABLED.png";

export class SpinButton extends Container {
  private _playSprite!: Sprite;
  private _playDisabledSprite!: Sprite;
  public static pressedButtonHandler: Function;
  constructor() {
    super();
    this.addButton();
    this.setupEvents();
  }

  /**
   * Creates the play button
   */
  private addButton(): void {
    this._playSprite = new Sprite(Texture.from(playButton));
    this.addChild(this._playSprite);
    this._playSprite.eventMode = "static";
    this._playSprite.cursor = "pointer";
    this.x = 500;
    this.y = 200;
  }
  /**
   * Attaches pointerdown event to trigger onPress
   */
  private setupEvents(): void {
    this._playSprite.on("pointerdown", () => this.onPress());
  }

  /**
   * Handler invoked when the button is pressed
   */
  public onPress(): void {
    SpinButton.pressedButtonHandler();
  }
}
