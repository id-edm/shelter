
function initPopUp() {
  document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const popUp = document.querySelector(".popup");
    const cardPets = document.querySelectorAll(".pets__btn-more");

    function toggleClassesPopUp() {
      const scrollbarWidth = getScrollbarWidth();
        if (popUp.classList.contains("popup--hidden")) {
          body.style.paddingRight = `${scrollbarWidth}px`;
          body.classList.add("scroll--stop");
        } else {
          body.style.paddingRight = "0px";
          body.classList.remove("scroll--stop");
        };

      popUp.classList.toggle("popup--hidden");
    };

    function getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth;
    };

    cardPets.forEach(card => {
      card.addEventListener("click", () => {
        toggleClassesPopUp()
      });
    });

    popUp.addEventListener("click", event => {
      if (
        event.target.classList.contains("popup") ||
        event.target.classList.contains("popup__close-btn") ||
        event.target.classList.contains("close__line")
      ) {
        toggleClassesPopUp()
      }
    });
  });
};

export { initPopUp };
