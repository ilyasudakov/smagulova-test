import InputBase from "@mui/material/InputBase";
import { Box, Modal, List, Typography } from "@mui/material";
import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";

import { MainContextType, noteType } from "../../hooks/useMainContext";
import Button from "@mui/material/Button/Button";

import useActions from "../../hooks/useActions";

import { fromNowTimeFormat } from "../../utils/time";

const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  min-width: 300px;
  max-width: 80%;
  min-height: 100px;
  height: fit-content;
  max-height: 80%;
  border-radius: 8px;
  outline: none;
  background-color: #fff;
  box-shadow: 24;
  padding: 4;
`;
const Input = styled(InputBase)`
  width: 100%;
  padding: 12px 16px;
`;
const IconButtonStyled = styled(IconButton)`
  svg {
    width: 20px;
    height: 20px;
    fill: #202124;
  }
`;
const EditedAtText = styled(Typography)`
  width: fit-content;
  margin-left: auto;
  padding: 0 12px;
  color: rgba(0, 0, 0, 0.8);
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
  const { actions } = useActions();
  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="окно-просмотр"
      aria-describedby="окно-просмотр"
    >
      <ModalBox>
        <Input
          value={note.title}
          placeholder="Заголовок"
          sx={{ fontSize: "22px" }}
          onChange={(e) =>
            updateNote(note.id, { ...note, title: e.target.value })
          }
        />
        <Input
          value={note.value}
          multiline
          placeholder="Заметка.."
          sx={{ paddingTop: "5px" }}
          autoFocus
          onChange={(e) =>
            updateNote(note.id, { ...note, value: e.target.value })
          }
        />
        <EditedAtText
          fontSize="12px"
          sx={{ marginLeft: "auto", width: "fit-content" }}
        >{`Редактировано ${fromNowTimeFormat(note.lastEdited)}`}</EditedAtText>
        <List sx={{ display: "flex", padding: "12px 16px" }}>
          {actions.map(({ icon, label, callback }) => (
            <IconButtonStyled
              key={label}
              size="small"
              edge="start"
              color="inherit"
              aria-label={label}
              onClick={() => {
                handleClose();
                callback(note.id, { ...note, status: label });
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
