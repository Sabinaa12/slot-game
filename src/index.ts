import * as PIXI from "pixi.js";
import { MainApp } from "./MainApp";

/**
 * The main SlotGame class – responsible for initializing the Pixi application,
 * loading assets, and launching the core game logic.
 */
export class SlotGame {
  private app: PIXI.Application;

  constructor() {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xa7b2ef,
    });

    document.body.appendChild(this.app.view as HTMLCanvasElement);
    window.addEventListener("resize", this.onResize.bind(this));
  }

  /**
   * Starts the game logic by loading all required assets
   * and attaching the MainApp container to the stage.
   */
  public async start(): Promise<void> {
    await this.loadAssets();
    const mainApp = new MainApp();
    this.app.stage.addChild(mainApp);
  }

  /**
   * Loads all textures/sprites used in the game.
   */
  private async loadAssets(): Promise<void> {
    await PIXI.Assets.load([
      "assets/SYM01.png",
      "assets/SYM02.png",
      "assets/SYM03.png",
      "assets/SYM04.png",
      "assets/SYM05.png",
      "assets/SYM06.png",
      "assets/WIN_BG.png",
      "assets/REEL.png",
      "assets/PLAY_DISABLED.png",
      "assets/PLAY.png",
    ]);
  }

  private onResize(): void {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }
}

const game = new SlotGame();
game.start();
