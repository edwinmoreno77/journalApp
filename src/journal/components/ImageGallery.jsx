import { ImageList, ImageListItem } from "@mui/material";


export const ImageGallery = ({ images }) => {
    if (!images) return null;

    return (
        <ImageList sx={{ width: '100%', height: '100%' }} cols={4} rowHeight={400}>
            {images.map((image) => (
                <ImageListItem key={image}>
                    <img
                        src={`${image}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt="imagen de la nota"
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

