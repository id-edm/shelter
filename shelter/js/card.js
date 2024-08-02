import { petsData } from './arr-pets.js';

export function initCard() {
	document.addEventListener("DOMContentLoaded", () => {
    const petsCardInner = document.querySelector(".pets__card-inner");

    petsData.forEach(pet => {
        const petCard = document.createElement("article");
        petCard.classList.add("pets__card");

        const petImageContainer = document.createElement("div");
        petImageContainer.classList.add("pets__card-image");

        const petImage = document.createElement("img");
        petImage.classList.add("image");
        petImage.src = pet.img;
        petImage.alt = pet.name;

        petImageContainer.appendChild(petImage);

        const petContent = document.createElement("div");
        petContent.classList.add("pets__content");

        const petName = document.createElement("h3");
        petName.classList.add("pets__content-title");
        petName.textContent = pet.name;

        const petButton = document.createElement("button");
        petButton.classList.add("pets__btn-more");
        petButton.type = "button";
        petButton.textContent = "Learn more";

        petContent.appendChild(petName);
        petContent.appendChild(petButton);

        petCard.appendChild(petImageContainer);
        petCard.appendChild(petContent);

        petsCardInner.appendChild(petCard);
    });
	});
}