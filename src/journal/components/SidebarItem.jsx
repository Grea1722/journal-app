import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SidebarItem = ({title, body,id,date, imageUrls = []}) => {

    const dispatch = useDispatch()

    const onClickNote = () =>{
        dispatch(setActiveNote({id,body,title,date,imageUrls}))
    }

    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0,17) + '...' : title
    }, [title])

    
  return (
    <ListItem disablePadding onClick={onClickNote}>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText
            secondary={body}
          />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
