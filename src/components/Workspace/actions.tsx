import { noteType } from "../../hooks/useMainContext";

import ArchiveOutlined from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";

type actionType = { icon: React.ReactNode; label: noteType["status"] };
export const actions: actionType[] = [
  { icon: <ArchiveOutlined />, label: "Архив" },
  { icon: <DeleteOutlineOutlined />, label: "Корзина" },
];
