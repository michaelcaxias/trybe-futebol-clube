import ILeaderboard from '../interfaces/ILeaderboard';

export default class Leaderboard {
  static sortClubsLeaderboard(clubs: ILeaderboard[]) {
    return clubs.sort((a, b) => {
      let sortingTiebreaker = b.totalPoints - a.totalPoints;
      if (sortingTiebreaker === 0) {
        sortingTiebreaker = b.goalsBalance - a.goalsBalance;
        if (sortingTiebreaker === 0) {
          sortingTiebreaker = b.goalsFavor - a.goalsFavor;
          if (sortingTiebreaker === 0) {
            sortingTiebreaker = a.goalsOwn - b.goalsOwn;
          }
        }
      }
      return sortingTiebreaker;
    });
  }
}
