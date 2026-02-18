const btnHamburger = document.querySelector(".menu-hamburger")
const btnClose = document.querySelector(".menu-close")

const navBar = document.querySelector(".menu-container")
const blurBar = document.querySelector(".bg-menu-blur")

btnHamburger.onclick = () => {
    navBar.classList.remove("move-right")
    blurBar.classList.remove("hidden")
}
btnClose.onclick = () => {
    navBar.classList.add("move-right")
    blurBar.classList.add("hidden")
}

