import { Client } from "discord.js";

import { onMessage } from "./events"

export default class Bot {
	private client: Client
	private key: string

	constructor(key: string) {
		this.client = new Client();
		this.key = key;
	}

	start() {
		this.initEvents();

		this.login();
	}

	private initEvents() {
		this.client.on("message", onMessage);
	}

	private login() {
		this.client.once('ready', () => console.log('bot is running'));

		this.client.login(this.key);
	}
}
