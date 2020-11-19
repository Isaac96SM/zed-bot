import { Client, Intents } from "discord.js"

import { JobInterval } from "./constants"
import { onMessage } from "./events"
import { pruneUsers } from "./jobs"

export default class Bot {
	public client: Client
    private key: string
    
    public lastExecution: Date = null;

	constructor(key: string) {
        const intents: Intents = new Intents([
            Intents.NON_PRIVILEGED,
            "GUILD_MEMBERS"
        ]);

		this.client = new Client({ ws: { intents } });
		this.key = key;
	}

	start() {
		this.initEvents();

		this.login();
	}

	private initEvents() {
		this.client.on("message", onMessage);
		this.client.setInterval(pruneUsers.bind(this), JobInterval);
	}

	private login() {
		this.client.once('ready', () => console.log('bot is running'));

		this.client.login(this.key);
	}
}
