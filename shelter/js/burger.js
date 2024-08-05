// burger

function initBurger() {
	const body = document.body
	const menuBtn = document.querySelector(".burger__btn");
	const menuMobile = document.querySelector(".header__list");
	const navItem = menuMobile.querySelectorAll(".header__item");

	function toggleClassesBurger() {
		body.classList.toggle("scroll--stop");
		menuBtn.classList.toggle("burger--transform");
		menuMobile.classList.toggle("burger--open");
		body.classList.toggle("body--overlay");
	}

	menuBtn.addEventListener("click", () => {
		toggleClassesBurger()
	})

	navItem.forEach(element => {
		element.addEventListener("click", () => {
			toggleClassesBurger()
		})
	})

	document.addEventListener("click", event => {
		console.log(event)
		if (
			event.target.classList.contains("body--overlay")
		) {
			toggleClassesBurger()
		}
	})
};

export { initBurger };
