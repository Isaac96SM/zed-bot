import { Collection, GuildMember, MessageEmbed } from "discord.js"

export class PruneMessage {
	public message: MessageEmbed

	constructor(members: Collection<string, GuildMember>) {
		this.message = new MessageEmbed();

		this.message.title = `Usuarios expulsados`;
		this.message.description = 'Los siguientes usuarios han sido expulsados del servidor por jugar Yasuo:';
		this.message.color = 15746887;

		members.forEach(m => this.addMember.bind(this)(m));
	}

	private addMember(member: GuildMember) {
		const hasAlias = PruneMessage.hasAlias(member);

		this.message.addField('Usuario', member.user.username, hasAlias);

		if (hasAlias)
			this.message.addField('Alias', member.nickname, true);
	}

	private static hasAlias(member: GuildMember) {
		return !!member.nickname;
	}
}
