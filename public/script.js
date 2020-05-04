           
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

        Array.from(fileList).forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                const image = new Image();
                image.src = String(reader.result);

                const container = document.createElement('div');
            }

            reader.readAsDataURL(file);
        })
    }

    
}


