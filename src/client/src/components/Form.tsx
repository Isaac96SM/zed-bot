import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
} from "@mui/material";
import { useForm } from "../hooks/useForm";
import DatePicker from "@mui/lab/DatePicker";
import { LoadingButton, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import locale from "date-fns/locale/es";
import Row from "./Row";
import Roles from "./Roles";
import { sendMatch } from "../services/discord";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Form: FC = () => {
  const { form, actions, isValid } = useForm();
  const [sending, setSending] = useState(false);

  const submit = async () => {
    setSending(true);

    const result = await sendMatch(form);

    console.log(result);

    setSending(false);
  }

  return (
    <Container
      style={{
        padding: "20px",
      }}
      maxWidth={false}
    >
      <Box display="grid" gap="20px">
        <Row>
          <TextField
            label="Equipo"
            variant="outlined"
            value={form.team.name}
            onChange={(e) => actions.setTeamName(e.currentTarget.value)}
          />
          <TextField
            label="Link"
            variant="outlined"
            value={form.team.link}
            onChange={(e) => actions.setTeamLink(e.currentTarget.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
            <DatePicker
              label="Fecha"
              onChange={actions.setDate}
              renderInput={(params) => <TextField {...params} />}
              value={form.date}
            />
          </LocalizationProvider>
        </Row>
        <Box
          display="grid"
          gap="10px"
          style={{
            border: "1px solid black",
            borderRadius: "4px",
            padding: "10px",
          }}
        >
          {form.team.players.map((player, idx) => (
            <Row key={idx}>
              <TextField
                label="Nombre"
                variant="outlined"
                value={player.name}
                onChange={(e) =>
                  actions.setPlayerName(idx, e.currentTarget.value)
                }
              />
              <TextField
                label="IGN"
                variant="outlined"
                value={player.ign}
                onChange={(e) =>
                  actions.setPlayerIGN(idx, e.currentTarget.value)
                }
              />
              <Roles
                roles={player.roles}
                setRoles={(newRoles) => actions.setRoles(idx, newRoles)}
              />
              <Button
                color="error"
                disabled={form.team.players.length === 1}
                onClick={() => actions.deletePlayer(idx)}
                startIcon={<DeleteIcon />}
                variant="outlined"
              >
                Borrar
              </Button>
            </Row>
          ))}
          <Row>
            <Button
              disabled={form.team.players.length === 9}
              onClick={actions.addPlayer}
              variant="outlined"
              startIcon={<AddIcon />}
            >
              Añadir jugador
            </Button>
          </Row>
        </Box>
        <Row>
          <LoadingButton
            color="success"
            endIcon={<SendIcon />}
            loading={sending}
            loadingPosition="end"
            disabled={!isValid()}
            onClick={submit}
            variant="outlined"
          >
            Enviar
          </LoadingButton>
        </Row>
      </Box>
    </Container>
  );
};

export default Form;
