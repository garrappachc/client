import { PlayerRole } from './player-role';

export interface Player {
  id: string;
  name: string;
  joinedAt: Date;
  steamId: string;
  avatarUrl: string;
  gameCount: number;
  role?: PlayerRole;
  etf2lProfileId?: number;
  skill?: { [gameClass: string]: number };
}
