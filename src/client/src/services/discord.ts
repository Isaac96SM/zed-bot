import axios from "axios";
import { Match } from "../types";

export const sendMatch = async (match: Match) => {
  await axios.post('https://silence-bot-zorkak.herokuapp.com/team', match);
};
