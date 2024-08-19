function initModal(petData) {
	console.log(petData)
	const popupContainer = document.querySelector(".popup")

	while (popupContainer.firstChild) {
		popupContainer.removeChild(popupContainer.firstChild)
	}

	const popupContent = document.createElement("div")
	popupContent.className = "popup__content"
	popupContent.innerHTML = `
	        <div class="popup__content-image">
	          <img class="img" src="${petData.img}" alt="${petData.name}">
	        </div>
					<div class="popup__wrapper">
					<div class="popup__content-description">
						<h3 class="popup__pets-title">${petData.name}</h3>
						<h4 class="popup__content-subtitle">${petData.type} - ${petData.breed}</h4>
						<p class="popup__content-description">${petData.description}</p>
						<div class="options" id="options"></div>
					</div>
					</div>
					<button class="popup__close-btn">
					<div class="close__line popup__close-left"></div>
					<div class="close__line popup__close-right"></div>
					</button>
	      `

	popupContainer.appendChild(popupContent)

	const optionsContainer = document.getElementById("options")
	const optionElement = document.createElement("div")
	optionElement.className = "popup__content-options"

	optionElement.innerHTML = `
	        <span class="option__container">
	          <span class="point-svg"></span>
	          <span class="option__title">Age: </span>
	          <span class="option__subtitle">${petData.age}</span>
	        </span>
	        <span class="option__container">
	          <span class="point-svg"></span>
	          <span class="option__title">Inoculations: </span>
	          <span class="option__subtitle">${petData.inoculations.join(
							", "
						)}</span>
	        </span>
	        <span class="option__container">
	          <span class="point-svg"></span>
	          <span class="option__title">Diseases: </span>
	          <span class="option__subtitle">${petData.diseases.join(", ")}</span>
	        </span>
	        <span class="option__container">
	          <span class="point-svg"></span>
	          <span class="option__title">Parasites: </span>
	          <span class="option__subtitle">${petData.parasites.join(", ")}</span>
	        </span>
	      `

	optionsContainer.appendChild(optionElement)
}

export { initModal }
