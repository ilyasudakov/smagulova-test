import styled from "styled-components";

import { Card, CardContent, CardActions, Typography } from "@mui/material";

import { MainContextType } from "../../App";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import { actions } from "./actions";

const CardStyled = styled(Card)`
  width: fit-content;
  border-radius: 8px !important;
  border: 1px solid #e0e0e0;
  box-shadow: none !important;
`;
const IconButtonStyled = styled(IconButton)`
  svg {
    width: 20px;
    height: 20px;
    fill: #202124;
  }
`;

export default function ListItem({
  value,
  id,
  changeStatus,
  onClick,
}: {
  id: string;
  value: string;
  changeStatus: MainContextType["changeStatus"];
  onClick: () => void;
}) {
  return (
    <CardStyled onClick={onClick}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {value}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ flex: 1 }} />
        {actions.map(({ icon, label }) => (
          <IconButtonStyled
            key={label}
            size="small"
            edge="start"
            color="inherit"
            aria-label={label}
            onClick={() => changeStatus(id, label)}
          >
            {icon}
          </IconButtonStyled>
        ))}
      </CardActions>
    </CardStyled>
  );
}
