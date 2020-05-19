           
const PhotosUpload = {
    input:"",
    limitChef:1,
    limitReceipt:6,
    files:[],
    preview:document.querySelector('#photos-upload'),

    handleInputChef(event) {
       
        const {limitChef} = PhotosUpload;

        PhotosUpload.input = event.target;

       if (PhotosUpload.hasLimit(event,limitChef)); return

    },


    handleInputReceipt(event) {

        const {files: fileList} = event.target;
        const {limitReceipt,preview} = PhotosUpload;

        PhotosUpload.input = event.target;

        if (PhotosUpload.hasLimit(event,limitReceipt)) return;

        Array.from(fileList).forEach(file => {
            PhotosUpload.files.push(file);

            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => {
                const image = new Image();
                image.src = String(reader.result);
            
               const div = PhotosUpload.getContainer(image);
                
               preview.appendChild(div);
            }

            PhotosUpload.input.files = PhotosUpload.getAllFiles();

        })
    },
    hasLimit(event,limit) {
        const {files: fileList} = event.target;

        if(fileList.length > limit) {
            alert(`Envie no máximo ${limit} fotos`);
            event.preventDefault();
            return true
        }

        const photosDiv = [];
        console.log(PhotosUpload.preview.childNodes);
        PhotosUpload.preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "photo")
            photosDiv.push(item)
        
        });

        const totalPhotos = fileList.length + photosDiv.length;
        if (totalPhotos > limit) {
            alert(`Você atingiu o limite máximo de ${limit}`);
            event.preventDefault();
            return true;
        }

        return false;
        
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();
        PhotosUpload.files.forEach(file => dataTransfer.items.add(file));

        
        return dataTransfer.files;
    },
    getContainer(image){

        const div = document.createElement('div');
        div.classList.add('photo');

        div.onclick = PhotosUpload.removePhoto;

        div.appendChild(image);

        div.appendChild(PhotosUpload.getRemoveButton());

        return div;
    },
    getRemoveButton(){
        const button = document.createElement('i');
        button.classList.add('material-icons');
        button.innerHTML = "close";
        return button;
    },
    removePhoto(event) {
        const photodiv = event.target.parentNode;
        const photosArray = Array.from(PhotosUpload.preview.children);
        const index = photosArray.indexOf(photodiv) -1 ;


        PhotosUpload.files.splice(index, 1);

        PhotosUpload.input.files = PhotosUpload.getAllFiles();

        photodiv.remove();
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode;

        if (photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]');
            if (removedFiles) {
                removedFiles.value += `${photoDiv.id},`
            }
        }

        photoDiv.remove();
    }

}

const ImageGallery = {
    highlight: document.querySelector('.card-image.recipe img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(event) {
        const {target} = event;
        console.log(target.src);

        ImageGallery.previews.forEach(preview => preview.classList.remove('active'));
        target.classList.add('active');

        ImageGallery.highlight.src = target.src;
        console.log(ImageGallery.highlight.src);
        
    }
}
const Validate = {
    apply(input, func) {

        Validate.clearError(input);
        
        let results = Validate[func](input.value);

        input.value = results.value;
        

        if(results.error) Validate.displayError(input);
  
    },
    displayError(input) {
        input.style.border = "2px solid #DC4747";
        input.classList.add('erro');
        input.focus();
  
    },
    clearError(input) {
        input.style.border = "1px solid #DDDDDD"
        input.classList.remove('erro');

    },
    isEmail(value) {
        let error = null;
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!value.match(mailFormat)) error ="Email inválido";
        return {
            error,
            value
        }
    }
   


}

function  send(event) {
    const fieldError = document.querySelectorAll(".erro");
    if (fieldError.length > 0) {
        alert('Atente para os campos que estão em vermelho!')
        event.preventDefault();
    }
}
