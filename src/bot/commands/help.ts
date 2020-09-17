import { Message, MessageEmbed } from "discord.js"

import { Channels } from "../constants"

export const help = (message: Message) => {
	const commands: MessageEmbed[] = [
		new MessageEmbed()
			.setTitle('MUTE')
			.setColor(0xCF40FA)
			.setDescription('Mute all the users in the voice channel where you are (self-included)')
			.addField('Syntax', '-mute'),
		new MessageEmbed()
			.setTitle('UNMUTE')
			.setColor(0xCF40FA)
			.setDescription('Unmute all the users in the voice channel where you are (self-included)')
			.addField('Syntax', '-mute'),
		new MessageEmbed()
			.setTitle('MOVE')
			.setColor(0xCF40FA)
			.setDescription('Move all the users in the voice channel where you are (self-included) to the voice channel specified')
			.addField('Syntax', '-move [to]')
			.addField('to', Channels.filter(c => c.type === 'voice')
				.map(c => `${c.name} -> ${c.label}`)
				.join('\n')
			)
	];

	message.channel.send('Available commands');
	commands.forEach(c => message.channel.send({ embed: c }));
}
