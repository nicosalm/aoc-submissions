export type PartType = "A" | "B";

export interface User {
  username: string;
  nickname?: string;
  language: string;
  repo: string;
  branch?: string;
  mapToPath(day: number, part: PartType): string;
}

export const USERS: User[] = [
  {
    username: "fallow64",
    nickname: "Austin",
    language: "Rust",
    repo: "aoc25",
    branch: "main",
    mapToPath: (day, _part) => `src/day${day}.rs`,
  },
  {
    username: "spaceybread",
    language: "Python",
    repo: "urban-winner",
    branch: "main",
    mapToPath: (day, part) =>
      `2025/day${day}/part${part === "A" ? "1" : "2"}.py`,
  },
];
