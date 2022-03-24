export default interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  totalGames: number;
  efficiency: number;
}
