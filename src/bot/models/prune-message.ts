import { Collection, GuildEmoji, GuildMember, MessageEmbed } from "discord.js"

export class PruneMessage {
	public message: MessageEmbed

	constructor(members: Collection<string, GuildMember>, emoji: GuildEmoji) {
		this.message = new MessageEmbed();

		this.message.title = `${emoji} CONTEMPT FOR THE WEAK ${emoji}`;
		this.message.description = 'The following users have been kicked from the server for membership reasons:';
		this.message.url = 'https://euw.leagueoflegends.com/es-es/champions/zed/';
		this.message.color = 15746887;

		members.forEach(m => this.addMember.bind(this)(m));
	}

	private addMember(member: GuildMember) {
		const hasAlias = PruneMessage.hasAlias(member);

		this.message.addField('User', member.user.username, hasAlias);

		if (hasAlias)
			this.message.addField('Alias', member.nickname, true);
	}

	private static hasAlias(member: GuildMember) {
		return !!member.nickname;
	}
}
