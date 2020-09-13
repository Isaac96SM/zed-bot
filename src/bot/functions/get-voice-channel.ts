import { Channels } from "../constants"
import { Channel } from "../models"

export const getVoiceChannel = (name: string): Channel => {
	return Channels.find(c => c.name === name && c.type === 'voice');
}
