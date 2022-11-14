import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";


describe('journal thunks test', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startNewNote should create a new blank note', async () => {

        const uid = 'TEST-UID';
        getState.mockReturnValue({
            auth: {
                uid: uid
            }
        });
        const newNote = {
            id: expect.any(String),
            title: '',
            body: '',
            date: expect.any(Number)
        }

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(newNote));
        expect(dispatch).toHaveBeenCalledWith(setActiveNote(newNote));

        //delete in firestore
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach(doc => {
            deletePromises.push(deleteDoc(doc.ref));
        });
        await Promise.all(deletePromises);

    }, 10000);
});