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

export default function MasonryList({
  notes,
}: {
  notes: MainContextType["notes"];
}) {
  return (
    <Masonry columns={4} spacing={2}>
      {notes.map(({ id, value }) => (
        <CardItem key={id} value={value} />
      ))}
    </Masonry>
  );
}

const CardStyled = styled(Card)`
  border: 1px solid #e0e0e0;
  box-shadow: none !important;
`;
const CardItem = ({ value }: { value: string }) => {
  return (
    <CardStyled sx={{ width: "fit-content" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {value}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Удалить</Button>
      </CardActions>
    </CardStyled>
  );
};
