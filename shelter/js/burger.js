const body = document.body;
const menuBtn = document.querySelector('.burger__btn');
const menuMobile = document.querySelector('.header__list');
const navItem = menuMobile.querySelectorAll('.header__item');

menuBtn.addEventListener('click',()=> {
	body.classList.toggle('scroll--stop')
	menuBtn.classList.toggle('burger--transform');
	menuMobile.classList.toggle('burger--open');
	body.classList.toggle('body--overlay');
});

navItem.forEach(element => {
	element.addEventListener("click",()=> {
		body.classList.remove('scroll--stop')
		menuBtn.classList.remove('burger--transform');
		menuMobile.classList.remove('burger--open');
		body.classList.remove('body--overlay');
	});
});

document.addEventListener('click', (event) => {
	const target = event.target;
	if (!menuMobile.contains(target) && !menuBtn.contains(target)) {
			body.classList.remove('scroll--stop');
			menuBtn.classList.remove('burger--transform');
			menuMobile.classList.remove('burger--open');
			body.classList.remove('body--overlay');
	}
});