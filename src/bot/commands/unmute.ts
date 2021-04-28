import { Message, Role } from "discord.js"

import { isUserInVoice, hasPermission } from "../functions"

export const unMute = (message: Message) => {
	if (!isUserInVoice(message.member)) {
		message.channel.send('No estás conectado a ningún canal de voz.');
		return;
	}

	if (!hasPermission(message.member)) {
		message.channel.send('No tienes permisos para hacer esta acción.');
		return;
	}

	const channel = message.member.voice.channel;
	const roles: Role[] = message.mentions.roles.array();

	if (roles.length > 0) {
		channel.members
			.filter(member => roles.some(role => member.roles.cache.has(role.id)))
			.forEach(member => member.voice.setMute(false));
	} else {
		channel.members.forEach(member => member.voice.setMute(false));
	}

	message.channel.send('A hablar se ha dicho');
}
