import { GuildMember } from "discord.js"

export const isUserInVoice = (user: GuildMember) => {
	const channel = user.voice.channel

	return channel && channel.type === 'voice';
}
