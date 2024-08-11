export interface GameData {
  time: string;
  guess: string;
  result: number;
  color: string;
}

export enum AlertEnum {
  Lose = "lose",
  Win = "win",
}
