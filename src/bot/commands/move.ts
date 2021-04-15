import { Message, VoiceChannel } from "discord.js"

import { isUserInVoice, hasPermission, getVoiceChannel } from "../functions"

export const move = async (message: Message, destination: string) => {
	if (!isUserInVoice(message.member)) {
		message.channel.send('No estás conectado a ningún canal de voz.');
		return;
	}

	if (!hasPermission(message.member)) {
		message.channel.send('No tienes permisos para hacer esta acción.');
		return;
	}

	const destinationChannel = getVoiceChannel(destination);

	if (!destinationChannel) {
		message.channel.send('Canal desconocido.');
		return;
	}

	const currentChannel = message.member.voice.channel;

	if (currentChannel.id === destinationChannel.id) {
		message.channel.send('Ya estás en este canal.');
		return;
	}

	const newChannel = await message.client.channels.fetch(destinationChannel.id);

	currentChannel.members.forEach(member => member.voice.setChannel(newChannel));

	message.channel.send(`Movido a ${(newChannel as VoiceChannel).name}.`);
}
