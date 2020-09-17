import { Message } from "discord.js"

import { PREFIX } from "../../config"
import { Command } from "../models"
import * as Commands from "../commands"

export const onMessage = (message: Message) => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const args = message.content.slice(PREFIX.length).split(' ').map(arg => arg.toLowerCase());
	const command = args.shift();

	switch (command) {
		case Command.Mute:
			Commands.mute(message);
			break;
		case Command.Unmute:
			Commands.unMute(message);
			break;
		case Command.Move:
			Commands.move(message, args[0]);
			break;
		case Command.Help:
			Commands.help(message);
			break;
		default:
			message.channel.send('Unknown command');
			break;
	}
}
