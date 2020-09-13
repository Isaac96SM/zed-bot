import { Message, VoiceChannel } from "discord.js"

import { isUserInVoice, hasPermission, getVoiceChannel } from "../functions"

export const move = async (message: Message, destination: string) => {
	if (!isUserInVoice(message.member)) {
		message.channel.send('You are not connected to any voice channel');
		return;
	}

	if (!hasPermission(message.member)) {
		message.channel.send('You are not allowed to use this command');
		return;
	}

	const destinationChannel = getVoiceChannel(destination);

	if (!destinationChannel) {
		message.channel.send('Unknown channel');
		return;
	}

	const currentChannel = message.member.voice.channel;

	if (currentChannel.id === destinationChannel.id) {
		message.channel.send('You are already joined to the channel');
		return;
	}

	const newChannel = await message.client.channels.fetch(destinationChannel.id);

	currentChannel.members.forEach(member => member.voice.setChannel(newChannel));

	message.channel.send(`Moved to ${(newChannel as VoiceChannel).name}`);
}
