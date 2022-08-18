import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../views";
import { startNewNote } from "../../store/journal";



export const JournalPage = () => {

    const { isSaving, active: notas } = useSelector(state => state.journal);

    const dispatch = useDispatch();

    const onClickNewNote = () => {
        dispatch(startNewNote())
    }

    return (
        <JournalLayout>
            {
                (!!notas)
                    ? <NoteView />
                    : <NothingSelectedView />
            }
            <IconButton
                disabled={isSaving}
                onClick={onClickNewNote}
                size="large"
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.8 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50,
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
        </JournalLayout>
    )
}
