import { JournalLayout } from "../layout/JournalLayout";
import { NoteViews, NotingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";
import { useMemo } from "react";

export const JournalPages = () => {
  const { isSaving, active } = useSelector((state) => state.journal);

  const dispatch = useDispatch();

  const onSaving = useMemo(() => isSaving, [isSaving])

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>

      {
        (!!active ? <NoteViews /> :<NotingSelectedView />  )
      }
      
      <IconButton
        onClick={onClickNewNote}
        disabled={onSaving}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
