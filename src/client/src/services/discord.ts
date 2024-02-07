import axios from "axios";
import { Match } from "../types";

export const sendMatch = (match: Match) => axios.post("/team", match);
