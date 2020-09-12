import { VoiceChannels } from "../constants"
import { Channel } from "../models"

export const getVoiceChannel = (name: string): Channel => {
	return VoiceChannels.find(vc => vc.name === name);
}
