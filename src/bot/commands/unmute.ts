import { Message } from "discord.js"

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
	channel.members.forEach(member => member.voice.setMute(false));

	message.channel.send('A hablar se ha dicho');
}
