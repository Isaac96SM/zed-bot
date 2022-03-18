import React, { FC } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { Role } from "../types";

const ROLES: Role[] = ["Top", "Jungler", "Mid", "Adc", "Support"];

type Props = {
  roles: Role[];
  setRoles: (newRoles: Role[]) => void;
};

const Roles: FC<Props> = ({ setRoles, roles }) => {
  const handleChange = (event: SelectChangeEvent<Role[]>) => {
    const {
      target: { value },
    } = event;

    setRoles(typeof value === "string" ? (value.split(",") as Role[]) : value);
  };

  return (
    <div>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
        <Select
          multiple
          value={roles}
          onChange={handleChange}
          input={<OutlinedInput label="Roles" />}
          renderValue={(selected) => selected.join(", ")}
        >
          {ROLES.map((role) => (
            <MenuItem key={role} value={role}>
              <Checkbox checked={roles.indexOf(role) > -1} />
              <ListItemText primary={role} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Roles;
