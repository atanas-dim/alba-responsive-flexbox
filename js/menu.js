// TOGGLE HAMBURGER MENU FOR MOBILE & ADD/REMOVE SHADOW

const headerTag = document.querySelector("header");
const toggleMenuTag = document.querySelector(".menu-icon");

toggleMenuTag.addEventListener("click", function() {
    
    let headerHeight = headerTag.offsetHeight;

    if(headerHeight <= 70) {
        headerTag.classList.add("header-open");
    } 
    else {
        headerTag.classList.remove("header-open");
    }
    
})

// CLOSE MENU ON LINK CLICK

const menuLink = document.querySelectorAll(".menu-link");

menuLink.forEach( function (link) {
    link.addEventListener("click", function() {
        headerTag.classList.remove("header-open");
    })
    
})

// CLOSE MENU ON SCROLL DOWN

let prevScroll = window.pageYOffset;
document.addEventListener("scroll", function() {
    const currentScroll = window.pageYOffset;

    if  (Math.abs(currentScroll - prevScroll) > 20) {
        headerTag.classList.remove("header-open");
    }

    prevScroll = currentScroll;

})