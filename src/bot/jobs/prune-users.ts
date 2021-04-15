import { TextChannel } from "discord.js"
import Bot from "..";

import { SERVER_ID } from "../../config"

import { getTextChannel } from "../functions"
import { PruneMessage } from "../models"

export async function pruneUsers(this: Bot) {
    const now = new Date();

    // Is not Saturday or already executed today
	if (now.getDay() !== 4 || (this.lastExecution && now.toDateString() === this.lastExecution.toDateString()))
        return console.log("No execute");

    try {
        console.log("Start prune");

		console.log("0");

		const server = await this.client.guilds.cache.get(SERVER_ID);
		
		console.log("1");

		const members = await server.members.fetch();
		
		console.log("2");

        const membersToKick = members.filter(m => m.roles.cache.size === 1);

        if (membersToKick.size > 0) {
			const message = new PruneMessage(membersToKick);
			
			console.log("3");

			const zedChannel = await this.client.channels.fetch(getTextChannel('zed').id) as TextChannel;
			
			console.log("4");

			await Promise.all(membersToKick.map(m => m.kick()));
			
			console.log("5");

			await zedChannel.send({ embed: message.message });
			
			console.log("6");
        }

        this.lastExecution = now;

        console.log(`Finish prune at ${this.lastExecution}. users pruned: ${membersToKick.size}`);

    } catch (err) {
        const ex: Error = err;

        console.log(`Prune users failed: ${ex.message}`);
        console.log(`stack: ${ex.stack}`);
    }
}
