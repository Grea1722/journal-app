
import { ImageList, ImageListItem } from "@mui/material";


export const ImageGallery = ({images}) => {


  return (
    <ImageList sx={{ width: '80%', height: 400, margin:'auto', mt:5 }} cols={3}>
      {images.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={'Imagen de la nota'}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}