import { GuessThatFartGame } from "./game";
import { fartSounds } from "./sounds";
import { FartID } from "./types";

const statusEl = document.getElementById("status") as HTMLElement;
const scoreEl = document.getElementById("score") as HTMLElement;
const startBtn = document.getElementById("startBtn") as HTMLButtonElement;
const playBtn = document.getElementById("playBtn") as HTMLButtonElement;
const guessButtonsContainer = document.getElementById("guessButtons") as HTMLElement;

function updateStatus(msg: string): void {
  statusEl.textContent = msg;
}

function updateScore(score: number): void {
  scoreEl.textContent = `Score: ${score}`;
}

const game = new GuessThatFartGame(updateStatus, updateScore);

// Create guess buttons dynamically
fartSounds.forEach((fart: FartID) => {
  const btn = document.createElement("button");
  btn.textContent = fart;
  btn.addEventListener("click", () => game.makeGuess(fart));
  guessButtonsContainer.appendChild(btn);
});

startBtn.addEventListener("click", () => game.startGame());
playBtn.addEventListener("click", () => game.playCurrentFart());
