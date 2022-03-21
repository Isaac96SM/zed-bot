import { Message } from "discord.js";
import { getCTTeam } from "../../services/ct.service";
import { hasPermission } from "../functions";
import { getTeamMessage } from "../functions/get-team-message";

export const team = async (message: Message, teamId: string) => {
	if (!hasPermission(message.member)) {
		message.channel.send('No tienes permisos para hacer esta acción.');
		return;
	}

	const team = await getCTTeam(teamId);

	const embed = getTeamMessage({ team });
  
	await message.channel.send({ embed: embed });
}