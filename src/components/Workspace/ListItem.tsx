import styled from "styled-components";

import { Card, CardContent, CardActions, Typography } from "@mui/material";

import { MainContextType, noteType } from "../../hooks/useMainContext";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import { actions } from "./actions";

const CardStyled = styled(Card)`
  width: fit-content;
  border-radius: 8px !important;
  border: 1px solid #e0e0e0;
  box-shadow: none !important;

  .MuiCardActions-root {
    transition: 0.1s ease-in-out;
    opacity: 0 !important;
    pointer-events: none;
  }
  &:hover .MuiCardActions-root {
    opacity: 1 !important;
    pointer-events: all;
  }
`;
const IconButtonStyled = styled(IconButton)`
  svg {
    width: 20px;
    height: 20px;
    fill: #202124;
  }
`;

export default function ListItem({
  note,
  updateNote,
  onClick,
}: {
  note: noteType;
  updateNote: MainContextType["updateNote"];
  onClick: () => void;
}) {
  return (
    <CardStyled onClick={onClick}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {note.value}
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
            onClick={(e) => {
              e.stopPropagation();
              updateNote(note.id, { ...note, status: label });
            }}
          >
            {icon}
          </IconButtonStyled>
        ))}
      </CardActions>
    </CardStyled>
  );
}
