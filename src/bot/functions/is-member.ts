import { GuildMember } from "discord.js"

export const isMember = (user: GuildMember) => user.roles.cache.some(role => role.name === 'Members');
