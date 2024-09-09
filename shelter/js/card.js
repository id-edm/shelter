import { petsData } from './arr-pets.js';

function getRandomCard(arr, size) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
}

function initCard() {
  document.addEventListener("DOMContentLoaded", () => {
      const petsCardInner = document.querySelector(".pets__card-inner");
      const randomPets = getRandomCard(petsData, 3);
      
      let cardPets = petsData.map(pets => {
          return `
              <article class="pets__card">
                  <div class="pets__card-image">
                      <img class="image" src="${pets.img}" alt="${pets.name}">
                  </div>
                  <div class="pets__content">
                      <h3 class="pets__content-title">${pets.name}</h3>
                      <button class="pets__btn-more" type="button">Learn more</button>
                  </div>
              </article>
          `;
      }).join('');
      
      petsCardInner.innerHTML = cardPets;
  });
};

export { initCard };
export { getRandomCard };