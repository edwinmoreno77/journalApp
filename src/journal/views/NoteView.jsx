import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button, Grid, TextField, Typography } from "@mui/material";
import { SaveOutlined } from '@mui/icons-material'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from "../components";
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startSavingNote } from '../../store/journal';

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note, MessageSave, isSaving } = useSelector(state => state.journal);

    const { formState, onInputChange, body, title, date } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (MessageSave.length > 0) {
            Swal.fire('Nota actualizada', MessageSave, 'success');

        }
    }, [MessageSave])


    const onSaveNote = () => {
        dispatch(startSavingNote())
    }

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;

        // dispatch(startUploadingFile(target.files));

    }
    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            direccion='row'
            justifyContent='space-between'
            alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={25} fontWeight='ligth'>{dateString}</Typography>
            </Grid>
            <Grid item >

                <input
                    multiple
                    type="file"
                    onChange={onFileInputChange}
                />
                <Button
                    disabled={isSaving}
                    onClick={onSaveNote}
                    color="primary"
                    sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type='text'
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Titulo"
                    sx={{ border: 'none', mb: 1 }}
                    name='title'
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type='text'
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que sucedío en el dia de hoy?"
                    minRows={5}
                    name='body'
                    value={body}
                    onChange={onInputChange}
                />


            </Grid>
            <ImageGallery />

        </Grid>
    )
}
