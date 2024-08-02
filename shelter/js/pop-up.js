// pop-up
export function initPopUp() {
	document.addEventListener("DOMContentLoaded", () => {
		const body = document.body
		const popUp = document.querySelector(".popup")
		const cardPets = document.querySelectorAll(".pets__btn-more")

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
		});
	});
}
