import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';
import { fileUpload, loadNotes } from '../../helpers';


export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        if (!uid) throw new Error('El usuario no esta logeado');

        const notas = await loadNotes(uid);

        dispatch(setNotes(notas));

    }
}


export const startSavingNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };
        //eliminar propiedades que no se guardan en firestore con javascript
        delete noteToFireStore.id;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(note));

    }
}

export const startUploadingFile = (files = []) => {

    return async (dispatch) => {
        dispatch(setSaving());

        //subir  un archivo 
        // await fileUpload(file[0]);


        //subir varios archivos 
        const fileUploadPromise = [];
        for (const file of files) {
            fileUploadPromise.push(fileUpload(file));
        }

        const photosUrls = await Promise.all(fileUploadPromise);

        dispatch(setPhotosToActiveNote(photosUrls));
    }

}

export const startDeletingNote = () => {

    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));

    }

}