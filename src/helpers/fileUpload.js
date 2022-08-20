


export const fileUpload = async (file) => {

    if (!file) throw new Error('No se ha seleccionado ningun archivo');
    const cloudinaryURL = 'https://api.cloudinary.com/v1_1/edmo777/upload';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'react-journalApp');

    try {
        const resp = await fetch(cloudinaryURL, {
            method: 'POST',
            body: formData
        });


        if (!resp.ok) throw new Error('Error al subir la imagen');

        const cloudinaryResp = await resp.json();
        return cloudinaryResp.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }


}