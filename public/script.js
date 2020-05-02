           
const PhotosUpload = {
    input:"",
    limitChef:1,
    files:[],

    handleInputChef(event) {
        const {files: fileList} = event.target;
        const {limitChef} = PhotosUpload;

        PhotosUpload.input = event.target;

        if(fileList.length > limitChef) {
            alert(`Envie no máximo ${limitChef} fotos`);
            event.preventDefault();
            return;
        }
    }

    
}


