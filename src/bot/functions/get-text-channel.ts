import { Channels } from "../constants"
import { Channel } from "../models"

export const getTextChannel = (name: string): Channel => {
	return Channels.find(c => c.name === name && c.type === 'text');
}
