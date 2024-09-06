import { petsData } from "./arr-pets.js"
import { initModal } from "./modal.js"

const getImagePets = event => {
	const target = event.target
	const petsCard = target.closest(".pets__card")
	const imageElement = petsCard.querySelector("img")
	return imageElement
}

function initPopUp() {
	document.addEventListener("DOMContentLoaded", () => {
		const body = document.body
		const popUp = document.querySelector(".popup")
		const cardPets = document.querySelectorAll(".pets__btn-more")

		function toggleClassesPopUp() {
			const scrollbarWidth = getScrollbarWidth()
			if (popUp.classList.contains("popup--hidden")) {
				body.style.paddingRight = `${scrollbarWidth}px`
				body.classList.add("scroll--stop")
			} else {
				body.style.paddingRight = "0px"
				body.classList.remove("scroll--stop")
			}

			popUp.classList.toggle("popup--hidden")
		}

		function getScrollbarWidth() {
			return window.innerWidth - document.documentElement.clientWidth
		}

		cardPets.forEach(card => {
			card.addEventListener("click", event => {
				const imagePetElement = getImagePets(event)
				const data = petsData.find(
					objectPet => objectPet.name === imagePetElement.alt
				)
				initModal(data)
				toggleClassesPopUp()
			})
		})

		popUp.addEventListener("click", event => {
			if (
				event.target.classList.contains("popup") ||
				event.target.classList.contains("popup__close-btn") ||
				event.target.classList.contains("close__line")
			) {
				toggleClassesPopUp()
			}
		})
	})
}

export { initPopUp }
