// 1. Grab each gallery
// 2. Take total number of slides
// 3. Define function that fades in/out each slide
// 4. Next on click show next slide - if last slide then show first slide
// 5. Prev on click show prev slide - if first slide then show last slide

const galleries = document.querySelectorAll('.project-gallery');
const galleriesArr = Array.from(galleries); // Array is needed in order to use forEach later.

const showSlide = function (slide) {
    slide.style.opacity = 1;
} 

const hideSlide = function (slide) {
    slide.style.opacity = 0;
} 

//  Grab each gallery. This is needed in order to avoid all of the galleries updating slides at the same time. That way each gallery works separately
galleriesArr.forEach(gallery => {

    const allSlidesArr = Array.from(gallery.querySelectorAll('.slide-holder')); //Array is needed in order to call show/hide function for a specific slide with Array[]
    const totalSlidesNum = allSlidesArr.length;
    let currentSlide = 0; //This is a counter which is used to change to prev/next slide and update the steps text in index.html

    const controlLinksArr  = Array.from(gallery.querySelectorAll('.control-link')); // Grabbing the two control links together to avoid repetitive code and only apply changes to the currentSlide counter
    const steps = gallery.querySelector('.steps');

    steps.innerHTML = `${currentSlide + 1} / ${totalSlidesNum}`; // Steps have to be updated before click so that it shows corrent info on page load

    // Apply event listener on Click to each control link
    controlLinksArr.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // If the link has class Next, then increase currentSlide counter. Check if it has reached the last slide of the gallery, then rewind to the first slide
            if (link.classList.contains('next')) {
                currentSlide++;
                if (currentSlide >= totalSlidesNum) {
                    currentSlide = 0;
                }   
            // If the link has class Prev, then decrease the currentSLide counter. Check if it has reached the first slide of the gallery, then rewind to the last slide 
            } else if (link.classList.contains('prev')) {
                currentSlide--;   
                if (currentSlide < 0) {
                    currentSlide = totalSlidesNum - 1;
                }
            }

            // Hide all slides on click
            allSlidesArr.forEach(slide => {
                hideSlide(slide)
            })

            // Then show only the next slide and update steps text in index.html
            showSlide(allSlidesArr[currentSlide]);
            steps.innerHTML = `${currentSlide + 1} / ${totalSlidesNum}`;

        })
    })

})