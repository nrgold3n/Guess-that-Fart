import { fartSounds, playFartSound } from "./sounds";
import { FartID } from "./types";

export class GuessThatFartGame {
  private currentFart: FartID | null = null;
  private score = 0;

  constructor(
    private updateStatus: (msg: string) => void,
    private updateScore: (score: number) => void
  ) {}

  startGame(): void {
    this.updateStatus("Game started! Press play to hear a fart.");
    this.pickRandomFart();
  }

  private pickRandomFart(): void {
    const index = Math.floor(Math.random() * fartSounds.length);
    this.currentFart = fartSounds[index];
    console.log("DEBUG: Selected fart =", this.currentFart);
  }

  playCurrentFart(): void {
    if (!this.currentFart) {
      this.updateStatus("No fart selected yet. Press Start Game first!");
      return;
    }
    playFartSound(this.currentFart);
    this.updateStatus("Fart played! Now guess!");
  }

  makeGuess(guess: FartID): void {
    if (!this.currentFart) {
      this.updateStatus("Start the game first!");
      return;
    }

    if (guess === this.currentFart) {
      this.score++;
      this.updateStatus("Correct! 🎉 A new fart has been selected.");
    } else {
      this.updateStatus(`Incorrect! It was: ${this.currentFart}. Try the next one.`);
    }

    this.updateScore(this.score);
    this.pickRandomFart();
  }
}
