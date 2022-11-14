import { journalSlice, savingNewNote } from "../../../src/store/journal/journalSlice";
import { initialState } from "../../fixtures/authFixtures";
import { savingNewNoteFixtures } from "../../fixtures/journalFixtures";

jest.mock('firebase/firestore/lite');



describe('journalSlice test', () => {

    test('it should return the initial state and be called jorunal', () => {
        const state = journalSlice.reducer(initialState, {});
        expect(state).toEqual(initialState);
        expect(journalSlice.name).toBe('journal');
    });

    test('savingNewNote test, it should return isSaving in true', () => {
        const state = journalSlice.reducer(initialState, savingNewNote());
        expect(state.isSaving).toEqual(savingNewNoteFixtures.isSaving);
    });

    test('addNewEmptyNote test', () => {

    })

});