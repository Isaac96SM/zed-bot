import { GuildMember } from "discord.js"

export const hasPermission = (user: GuildMember) => {
	return user.roles.highest.name === 'Mods' || user.roles.highest.name === 'Admins';
}
