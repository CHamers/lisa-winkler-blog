const burger = document.querySelector(".burger");
const menuSidebar = document.querySelector(".menu-sidebar");
const closeMenu = document.querySelector(".close-menu");

burger.addEventListener("click", function () {
  menuSidebar.style.transform = "translate(0%)";
});
closeMenu.addEventListener("click", function () {
  menuSidebar.style.transform = "translate(-100%)";
});
