import axios from "axios";
import { CTTeamResponse } from "./ct";
import { Team } from "../types";

export const getCTTeam = async (teamId: string) => {
  try {
    const { data } = await axios.get<CTTeamResponse>(
      `https://api.circuitotormenta.com/api/v001/showcase/circuito-tormenta/equipo/${teamId}`
    );

    if (data?.returnData) {
      return {
        name: data.returnData.equipo.name,
        link: teamId,
        players: data.returnData.miembros.map((m) => ({
          name: m.username,
          roles: [],
          ign:
            m.profile.gameNicks.find((nick) => nick.id === "DSqvAwvMpYtH9Ccdj")
              ?.nick || "",
        })),
      } as Team;
    }
  } catch {
    return undefined;
  }
};
