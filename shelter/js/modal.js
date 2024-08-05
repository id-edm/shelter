
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
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.42618 6.00003L11.7046 1.72158C12.0985 1.32775 12.0985 0.689213 11.7046 0.295433C11.3108 -0.0984027 10.6723 -0.0984027 10.2785 0.295433L5.99998 4.57394L1.72148 0.295377C1.32765 -0.098459 0.68917 -0.098459 0.295334 0.295377C-0.0984448 0.689213 -0.0984448 1.32775 0.295334 1.72153L4.57383 5.99997L0.295334 10.2785C-0.0984448 10.6723 -0.0984448 11.3108 0.295334 11.7046C0.68917 12.0985 1.32765 12.0985 1.72148 11.7046L5.99998 7.42612L10.2785 11.7046C10.6723 12.0985 11.3108 12.0985 11.7046 11.7046C12.0985 11.3108 12.0985 10.6723 11.7046 10.2785L7.42618 6.00003Z" fill="#292929" />
            </svg> 
          </button>
        `;

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