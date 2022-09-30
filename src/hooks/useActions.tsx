import ArchiveOutlined from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";

import useMainContext, { PageToStatus, noteType } from "./useMainContext";

type actionType = {
  icon: React.ReactNode;
  label: noteType["status"];
  visibility: noteType["status"][];
  callback: (id: string, ...args: any) => void;
};

// Хук для получение действий, зависимые от контекста -
// текущей страницы
export default function useActions() {
  const { updateNote, curPage, deleteNote } = useMainContext();

  const actions: actionType[] = [
    {
      icon: <ArchiveOutlined />,
      label: "Архив",
      visibility: ["Активно", "Корзина"],
      callback: updateNote,
    },
    {
      icon: <DeleteOutlineOutlined />,
      label: "Корзина",
      visibility: ["Активно", "Архив"],
      callback: updateNote,
    },
    {
      icon: <DeleteOutlineOutlined />,
      label: "Корзина",
      visibility: ["Корзина"],
      callback: deleteNote,
    },
    {
      icon: <RestoreOutlinedIcon />,
      label: "Активно",
      visibility: ["Архив", "Корзина"],
      callback: updateNote,
    },
  ];

  const filteredActions = actions.filter(({ visibility }) =>
    visibility.includes(PageToStatus[curPage])
  );
  return { actions: filteredActions };
}
