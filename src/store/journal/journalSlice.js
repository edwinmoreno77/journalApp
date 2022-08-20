import { createSlice } from '@reduxjs/toolkit';


export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        MessageSave: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234556,
        //     imageUrls: [],//https://foto-1.png, https://foto-2.png, https://foto-3.png
        // }
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;

        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.MessageSave = '';

        },
        setNotes: (state, action) => {
            state.notes = action.payload;

        },
        setSaving: (state) => {
            state.isSaving = true;
            state.MessageSave = '';

        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload;
                } else {
                    return note;
                }
            })

            state.MessageSave = `${action.payload.title} actualizada correctamente`;

        },

        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },

        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.MessageSave = '';
            state.notes = [];
            state.active = null;

        },

        deleteNoteById: (state, action) => {

        }

    },
})

// Action creators are generated for each case reducer function
export const {

    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote,
    setPhotosToActiveNote,
    clearNotesLogout,

} = journalSlice.actions
