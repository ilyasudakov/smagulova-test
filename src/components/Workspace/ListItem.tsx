import styled from "styled-components";

import { Card, CardContent, CardActions, Typography } from "@mui/material";

import { noteType } from "../../hooks/useMainContext";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import useActions from "../../hooks/useActions";

const CardStyled = styled(Card)`
  width: 100%;
  border-radius: 8px !important;
  border: 1px solid #e0e0e0;
  box-shadow: none !important;
  max-width: 600px;

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
  onClick,
}: {
  note: noteType;
  onClick: () => void;
}) {
  const { actions } = useActions();
  return (
    <CardStyled onClick={onClick}>
      <CardContent>
        {note.title !== "" ? (
          <Typography sx={{ fontSize: 16, fontWeight: 500 }} gutterBottom>
            {note.title}
          </Typography>
        ) : null}
        <Typography sx={{ fontSize: 18 }} gutterBottom>
          {note.value}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{ flex: 1 }} />
        {/* Отображаем только те действия которые подходят по контексту */}
        {actions.map(({ icon, label, callback }) => (
          <IconButtonStyled
            key={label}
            size="small"
            edge="start"
            color="inherit"
            aria-label={label}
            onClick={(e) => {
              e.stopPropagation();
              callback(note.id, { ...note, status: label });
            }}
          >
            {icon}
          </IconButtonStyled>
        ))}
      </CardActions>
    </CardStyled>
  );
}
