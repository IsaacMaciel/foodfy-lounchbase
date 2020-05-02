const modalOverlay = document.querySelector('.modal_overlay');
const cards = document.querySelectorAll('.card');
const shows = document.querySelectorAll('.show');

const content_ingredients = document.querySelector('.content-ingredients');
const content_preparation = document.querySelector('.content-preparation');
const content_information = document.querySelector('.content-information');

const show_ingredients = document.querySelector('.show_ingredients');
const show_preparation = document.querySelector('.show_preparation');
const show_information = document.querySelector('.show_information');


for (let card of cards) {
    card.addEventListener("click",function(){
    const id = card.getAttribute("id");
    window.location.href = `/receitas/${id}`;   
    })
}


 show_ingredients.addEventListener("click",function(){
    if (content_ingredients.classList.contains('hidden')){
         content_ingredients.classList.remove('hidden');
        show_ingredients.innerHTML = "ESCONDER";
     } else {
            content_ingredients.classList.add('hidden');
            show_ingredients.innerHTML = "MOSTRAR";
            }
        })


show_preparation.addEventListener("click",function(){

    if (content_preparation.classList.contains('hidden')){
        content_preparation.classList.remove('hidden');
        show_preparation.innerHTML = "ESCONDER";
    } else {
        content_preparation.classList.add('hidden');
        show_preparation.innerHTML = "MOSTRAR";
    }
    }
)
                
 
show_information.addEventListener("click",function(){

    if (content_information.classList.contains('hidden')){
        content_information.classList.remove('hidden');
        show_information.innerHTML = "ESCONDER";
    } else {
        content_information.classList.add('hidden');
        show_information.innerHTML = "MOSTRAR";
     }
})                


const upload = document.querySelector('#photos-input');
console.log(upload);
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


