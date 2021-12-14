import { Client } from "discord.js"

import { JobInterval } from "./constants"
import { onMessage, onReact } from "./events"
import { pruneUsers } from "./jobs"

export default class Bot {
	public client: Client
    private key: string

    public lastExecution: Date = null;

	constructor(key: string) {
		this.client = new Client({ partials: ['USER', 'REACTION', 'MESSAGE'] });
		this.key = key;
	}

	start() {
		this.login();
		this.initEvents();
	}

	private initEvents() {
		this.client
			.on("messageReactionAdd", onReact.bind(this))
			.on("message", onMessage)
			.setInterval(pruneUsers.bind(this), JobInterval);
	}

	private login() {
		this.client.once('ready', () => console.log('bot is running'));

		this.client.login(this.key);
	}
}
