const modalOverlay = document.querySelector('.modal_overlay');
const cards = document.querySelectorAll('.card');

for (let card of cards) {
    card.addEventListener("click",function(){
        const id = card.getAttribute("id");
        const h1 = card.querySelector('.card-content h1').textContent
        const p = card.querySelector('.card-info p').textContent
        modalOverlay.classList.add('active');
        modalOverlay.querySelector("img").src = id;
        modalOverlay.querySelector("h1").textContent = h1;
        modalOverlay.querySelector("p").textContent = p;
    })
}

document.querySelector('.close_modal').addEventListener("click",function(){
    modalOverlay.classList.remove('active');
})

