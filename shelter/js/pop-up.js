// pop-up
export function initPopUp() {
	const body = document.body
	const popUp = document.querySelector(".popup")
	const cardPets = document.querySelectorAll(".pets__card")
	

	function toggleClassesPopUp() {
		body.classList.toggle("scroll--stop")
		popUp.classList.toggle("popup--hidden")
	}

	cardPets.forEach(card => {
		card.addEventListener("click", () => {
			toggleClassesPopUp()
		})
	})

	popUp.addEventListener("click", event => {
		if (
			event.target.classList.contains("popup") ||
			event.target.classList.contains("popup__close-btn")
		) {
			toggleClassesPopUp()
		}
	})
}
