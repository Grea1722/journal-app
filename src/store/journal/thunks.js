import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote,creatingNewNote, deleteNoteById, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        dispatch(creatingNewNote())

        const {uid} = getState().auth;

        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime(),
            imageUrls: [],
        }
        
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`));
        await setDoc( newDoc, newNote)

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote( newNote ));
        dispatch(setActiveNote(newNote))
    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        if(!uid) throw new Error("El Id de usuario no existe");

       const notes = await loadNotes(uid);

       dispatch( setNotes(notes) );
    }
}

export const startSaveNote = () => {
    return async ( dispatch, getState) => {
        dispatch(setSaving())

        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        const noteToFireStore = {...note};
        //& eliminamos el id de la nota activa para que no se cree una nueva nota;
        delete noteToFireStore.id;

        //^referencia al documento, de esta manera sabemos que documento vamos a guardar.
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        //*Merge en true es para que si se mandan campos que no existen en la base de datos se unan.
        await setDoc(docRef, noteToFireStore,{merge:true})

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files=[]) => {
    return async(dispatch) => {
        dispatch(setSaving());

        // await fileUpload(files[0]);
        const fileUploadPromises = [];

        for(const file of files){
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNotes = () => {
    return async(dispatch, getState) => {

        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}` )
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}