import { TextChannel } from "discord.js"
import Bot from "..";

import { SERVER_ID } from "../../config"

import { getTextChannel } from "../functions"
import { PruneMessage } from "../models"

export async function pruneUsers(this: Bot) {
    const now = new Date();

    // Is not Saturday or already executed today
    if (now.getDay() !== 6 || !!this.lastExecution)
        return console.log("No execute");

    try {
        console.log("Start prune");

        const server = await this.client.guilds.fetch(SERVER_ID);

        const members = await server.members.fetch();

        const membersToKick = members.filter(m => m.roles.cache.size === 1);

        if (membersToKick.size > 0) {
            const emoji = this.client.emojis.cache.find(emoji => emoji.name === "contempt");
            const message = new PruneMessage(membersToKick, emoji);

            const zedChannel = await this.client.channels.fetch(getTextChannel('zed').id) as TextChannel;

            await Promise.all(membersToKick.map(m => m.kick()));

            zedChannel.send({ embed: message.message });
        }

        this.lastExecution = now;
        
        console.log(`Finish prune at ${this.lastExecution}. users pruned: ${membersToKick.size}`);

    } catch (err) {
        const ex: Error = err;

        console.log(`Prune users failed: ${ex.message}`);
    }
}
