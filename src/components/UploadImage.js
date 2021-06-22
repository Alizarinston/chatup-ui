import React from 'react';
import ImageUploading from 'react-images-uploading';
import {Segment} from "semantic-ui-react";
import {UploadImageForm} from "./UploadImageForm";

export function UploadImage() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
          <Segment>
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              &nbsp;
              <button onClick={onImageRemoveAll}>Remove all images</button>
              {imageList.map((image, index) => (
                  <UploadImageForm
                    key={image.file.name}
                    image={image}
                    onImageUpdate={() => onImageUpdate(index)}
                    onImageRemove={() => onImageRemove(index)}
                  />
              ))}
            </div>
          </Segment>
        )}
      </ImageUploading>
    </div>
  );
}