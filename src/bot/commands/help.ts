import { Message, MessageEmbed } from "discord.js"

import { Channels } from "../constants"

export const help = (message: Message) => {
	const commands: MessageEmbed[] = [
		new MessageEmbed()
			.setTitle('MUTE')
			.setColor(0xCF40FA)
			.setDescription('Mutea a todos los usuarios del canal donde estás.')
			.addField('Uso', '!mute [role]')
			.addField('role (mención)', 'Solo aplica a los usuarios que pertenecen a dicho rol (puede usarse múltiples veces)'),
		new MessageEmbed()
			.setTitle('UNMUTE')
			.setColor(0xCF40FA)
			.setDescription('Desmutea a todos los usuarios del canal donde estás (tu incluido).')
			.addField('Uso', '!unmute [role]')
			.addField('role (mención)', 'Solo aplica a los usuarios que pertenecen a dicho rol (puede usarse múltiples veces)'),
		new MessageEmbed()
			.setTitle('MOVE')
			.setColor(0xCF40FA)
			.setDescription('Mueve todos los usuarios del canal donde estás (tu incluido) al canal especificado.')
			.addField('Uso', '!move [to]')
			.addField('to', Channels.filter(c => c.type === 'voice')
				.map(c => `${c.name} -> ${c.label}`)
				.join('\n')
			)
	];

	message.channel.send('Comandos disponibles');
	commands.forEach(c => message.channel.send({ embed: c }));
}
