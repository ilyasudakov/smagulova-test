import InputBase from "@mui/material/InputBase";
import { Box, Modal, List } from "@mui/material";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";

import { MainContextType, noteType } from "../../App";
import { actions } from "./actions";
import Button from "@mui/material/Button/Button";

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  border-radius: 8px;
  outline: none;
  background-color: #fff;
  box-shadow: 24;
  padding: 4;
`;
const Input = styled(InputBase)`
  padding: 12px 16px;
`;
const IconButtonStyled = styled(IconButton)`
  svg {
    width: 20px;
    height: 20px;
    fill: #202124;
  }
`;

export default function ModalNote({
  handleClose,
  showModal,
  note,
  updateNote,
}: {
  handleClose: () => void;
  showModal: boolean;
  note: noteType;
  updateNote: MainContextType["updateNote"];
}) {
  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <Input
          value={note.value}
          autoFocus
          onChange={(e) =>
            updateNote(note.id, { ...note, value: e.target.value })
          }
        />
        <List sx={{ display: "flex", padding: "12px 16px" }}>
          {actions.map(({ icon, label }) => (
            <IconButtonStyled
              key={label}
              size="small"
              edge="start"
              color="inherit"
              aria-label={label}
              onClick={() => {
                handleClose();
                updateNote(note.id, { ...note, status: label });
              }}
            >
              {icon}
            </IconButtonStyled>
          ))}
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="primary"
            sx={{ color: "#333", textTransform: "initial" }}
            onClick={handleClose}
          >
            Закрыть
          </Button>
        </List>
      </ModalBox>
    </Modal>
  );
}
