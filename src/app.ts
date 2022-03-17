import Bot from "./bot"
import { KEY } from "./config"
import express from "express";
import cors from 'cors';
import bodyParser from "body-parser"
import { CustomRequest, Match } from "./types";
import { getTeamMessage } from "./bot/functions/get-team-message";
import { TextChannel } from "discord.js";
import { getTextChannel } from "./bot/functions";

const bot = new Bot(KEY);

bot.start();

var app = express();

app.use(bodyParser.json())
app.use(cors());

app.post('/team', async (req: CustomRequest<Match>, res) => {
  console.log(req.body);
  const FDFChannel = (await bot.client.channels.fetch(getTextChannel('fdf').id)) as TextChannel;

  const embed = getTeamMessage(req.body);

  await FDFChannel.send({ embed: embed });

  res.send(200);
});

app.listen(8080, () => console.log('express running'));
