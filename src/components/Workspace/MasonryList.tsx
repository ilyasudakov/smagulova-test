import styled from "styled-components";

import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";

import { MainContextType } from "../../App";
import IconButton from "@mui/material/IconButton";
import ArchiveOutlined from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";

export default function MasonryList({
  notes,
  searchQuery,
  changeStatus,
}: {
  searchQuery: MainContextType["searchQuery"];
  notes: MainContextType["notes"];
  changeStatus: MainContextType["changeStatus"];
}) {
  return (
    <Masonry columns={{ xs: 3, sm: 4 }} spacing={2}>
      {notes
        .filter(({ value }) => value.includes(searchQuery))
        .map(({ id, value }) => (
          <CardItem
            id={id}
            key={id}
            value={value}
            changeStatus={changeStatus}
          />
        ))}
    </Masonry>
  );
}

const CardStyled = styled(Card)`
  border: 1px solid #e0e0e0;
  box-shadow: none !important;
`;
const CardItem = ({
  value,
  id,
  changeStatus,
}: {
  id: string;
  value: string;
  changeStatus: MainContextType["changeStatus"];
}) => {
  return (
    <CardStyled sx={{ width: "fit-content" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {value}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="Архив"
          onClick={() => changeStatus(id, "Архив")}
        >
          <ArchiveOutlined />
        </IconButton>
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="Удалить"
          onClick={() => changeStatus(id, "Корзина")}
        >
          <DeleteOutlineOutlined />
        </IconButton>
      </CardActions>
    </CardStyled>
  );
};
