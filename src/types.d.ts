import { Request } from "express";

export interface CustomRequest<T> extends Request {
  body: T
}

export type Role = 'Top' | 'Jungler' | 'Mid' | 'Adc' | 'Support';

export type Player = {
  name: string;
  ign: string;
  roles: Role[];
};

export type Team = {
  name: string;
  link: string;
  players: Player[];
};

export type Match = {
  team: Team;
  date: Date;
};
