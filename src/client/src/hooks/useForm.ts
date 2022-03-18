import { useReducer } from "react";
import { Match, Role } from "../types";

type Actions =
  | { type: "TEAM_NAME"; payload: string }
  | { type: "TEAM_LINK"; payload: string }
  | { type: "DATE"; payload: Date }
  | { type: "NEW_PLAYER" }
  | { type: "ROLES"; payload: { idx: number; roles: Role[] } }
  | { type: "DELETE_PLAYER"; payload: number }
  | { type: "PLAYER_NAME"; payload: { idx: number; name: string } }
  | { type: "PLAYER_IGN"; payload: { idx: number; ign: string } };

const initialState: Match = {
  team: {
    name: "",
    link: "",
    players: [0, 1, 2, 3, 4].map(() => ({
      name: "",
      ign: "",
      roles: [],
    })),
  },
  date: new Date(),
};

const reducer = (state: Match, action: Actions) => {
  switch (action.type) {
    case "TEAM_NAME":
      return {
        ...state,
        team: {
          ...state.team,
          name: action.payload,
        },
      };
    case "TEAM_LINK":
      return {
        ...state,
        team: {
          ...state.team,
          link: action.payload,
        },
        };
    case "DATE":
      return {
        ...state,
        date: action.payload,
      };
    case "NEW_PLAYER":
      return {
        ...state,
        team: {
          ...state.team,
          players: [
            ...state.team.players,
            {
              name: "",
              ign: "",
              roles: [],
            },
          ],
        },
      };
    case "DELETE_PLAYER":
      return {
        ...state,
        team: {
          ...state.team,
          players: state.team.players.filter(
            (player, idx) => idx !== action.payload
          ),
        },
      };
    case "ROLES":
      return {
        ...state,
        team: {
          ...state.team,
          players: state.team.players.map((player, idx) => ({
            ...player,
            roles:
              idx === action.payload.idx ? action.payload.roles : player.roles,
          })),
        },
      };
    case "PLAYER_NAME":
      return {
        ...state,
        team: {
          ...state.team,
          players: state.team.players.map((player, idx) => ({
            ...player,
            name:
              idx === action.payload.idx ? action.payload.name : player.name,
          })),
        },
      };
    case "PLAYER_IGN":
      return {
        ...state,
        team: {
          ...state.team,
          players: state.team.players.map((player, idx) => ({
            ...player,
            ign: idx === action.payload.idx ? action.payload.ign : player.ign,
          })),
        },
      };
    default:
      throw new Error("Invalid action");
  }
};

export const useForm = () => {
  const [match, dispatch] = useReducer(reducer, initialState);

  const isValid = () => {
    if (match.team.name) {
      return match.team.players.every((player) => player.name && player.ign && player.roles.length);
    }

    return false;
  };

  return {
    form: match,
    actions: {
      setTeamName: (payload: string) =>
        dispatch({ type: "TEAM_NAME", payload }),
      setTeamLink: (payload: string) =>
        dispatch({ type: "TEAM_LINK", payload }),
      setDate: (payload: Date | null) =>
        dispatch({ type: "DATE", payload: payload || new Date() }),
      addPlayer: () => dispatch({ type: "NEW_PLAYER" }),
      setRoles: (idx: number, roles: Role[]) =>
        dispatch({ type: "ROLES", payload: { idx, roles } }),
      deletePlayer: (payload: number) =>
        dispatch({ type: "DELETE_PLAYER", payload }),
      setPlayerName: (idx: number, name: string) =>
        dispatch({ type: "PLAYER_NAME", payload: { idx, name } }),
      setPlayerIGN: (idx: number, ign: string) =>
        dispatch({ type: "PLAYER_IGN", payload: { idx, ign } }),
    },
    isValid
  };
};
