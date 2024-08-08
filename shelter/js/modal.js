
function initModal() {
    document.addEventListener('DOMContentLoaded', () => {
        const petData = {
            name: 'Jennifer',
            species: 'Dog - Labrador',
            description: 'Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won\'t hesitate to play up a storm in the house if she has all of her favorite toys.',
            imageSrc: '../images/pets/pets-jennifer.png',
            options: [
                { title: 'Age:', subtitle: '2 months' },
                { title: 'Inoculations:', subtitle: 'none' },
                { title: 'Diseases:', subtitle: 'none' },
                { title: 'Parasites:', subtitle: 'none' }
            ]
        };

        const popupContainer = document.querySelector('.popup')

        const popupContent = document.createElement('div');
        popupContent.className = 'popup__content';

        popupContent.innerHTML = `
          <div class="popup__content-image">
            <img class="img" src="${petData.imageSrc}" alt="${petData.name}">
          </div>
          <div class="popup__wrapper">
            <div class="popup__content-description">
              <h3 class="popup__pets-title">${petData.name}</h3>
              <h4 class="popup__content-subtitle">${petData.species}</h4>
              <p class="popup__content-description">${petData.description}</p>
              <div class="options" id="options"></div>
            </div>
          </div>
          <button class="popup__close-btn">
            <div class="close__line popup__close-left"></div>
            <div class="close__line popup__close-right"></div>
          </button>
        `

        popupContainer.appendChild(popupContent);

        const optionsContainer = document.getElementById('options');
        petData.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'popup__content-options';

            optionElement.innerHTML = `
            <span class="option__container">
              <span class="point-svg"></span>
              <span class="option__title">${option.title}</span> 
              <span class="option__subtitle">${option.subtitle}</span>
            </span>
          `;

            optionsContainer.appendChild(optionElement);
        });
    });
};

export { initModal };