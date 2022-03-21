import { format } from "date-fns";
import { MessageEmbed } from "discord.js";
import { Match } from "../../types";

export const getTeamMessage = (match: Match) => {
  const message = new MessageEmbed();

  message.title = match.team.name;
  message.url = `https://circuitotormenta.com/team/${match.team.link}`;
  if (match.date) {
    message.description = format(new Date(match.date), "dd/MM/yyyy");
  }
  message.color = 15746887;
  message.footer = {
    text: "Da igual lo buenos que sean, nosotros somos mejores",
  };

  message.addFields(
    match.team.players.map(({ name, ign, roles }) => ({
      name: roles.length ? `${name} (${roles.join(", ")})` : name,
      value: ign ? `[op.gg](https://euw.op.gg/summoners/euw/${encodeURIComponent(
        ign
      )})\u200B\n[porofessor](https://www.leagueofgraphs.com/es/summoner/euw/${encodeURIComponent(
        ign
      )})` : 'Invocador no encontrado',
    }))
  );

  return message;
};
