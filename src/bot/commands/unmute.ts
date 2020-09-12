import { Message } from "discord.js"

import { isUserInVoice, hasPermission } from "../functions"

export const unMute = (message: Message) => {
	if (!isUserInVoice(message.member)) {
		message.channel.send('You are not connected to any voice channel');
		return;
	}

	if (!hasPermission(message.member)) {
		message.channel.send('You are not allowed to use this command');
		return;
	}

	const channel = message.member.voice.channel;
	channel.members.forEach(member => member.voice.setMute(false));

	message.channel.send('Let\'s talk!');
}
