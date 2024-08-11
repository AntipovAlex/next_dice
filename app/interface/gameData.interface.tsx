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
export enum RadioEnum {
  Under = "under",
  Over = "over",
}

export enum ColorEnum {
  Green = "green",
  Red = "red",
}
