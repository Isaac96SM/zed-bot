import { MessageReaction, PartialUser, User } from "discord.js";
import Bot from "..";
import { ROLE_MESSAGE_ID, SERVER_ID } from "../../config";
import { ROLE_ID } from "../../config/role-id";
import { isMember } from "../functions";

export async function onReact(this: Bot, { message }: MessageReaction, user: User | PartialUser) {
	if (message.id === ROLE_MESSAGE_ID && message.channel.type === 'text') {
		const server = await this.client.guilds.fetch(SERVER_ID);
		const members = await server.members.fetch();
		
		const member = members.find(member => member.id === user.id);
		
		if (!isMember(member)) {
			await member.roles.add(ROLE_ID);	
		}
	}
};
