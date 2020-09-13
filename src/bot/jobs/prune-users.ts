import { Client, TextChannel } from "discord.js"

import { SERVER_ID } from "../../config"

import { getTextChannel } from "../functions"
import { PruneMessage } from "../models"

export async function pruneUsers(this: Client) {
	const server = await this.guilds.fetch(SERVER_ID);

	const members = await server.members.fetch();

	const membersToKick = members.filter(m => m.roles.cache.size === 1);

	if (membersToKick.size > 0) {
		const message = new PruneMessage(membersToKick);
		const zedChannel = await this.channels.fetch(getTextChannel('zed').id) as TextChannel;

		await Promise.all(membersToKick.map(m => m.kick()));

		zedChannel.send({ embed: message.message });
	}
}
