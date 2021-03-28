// 1. Save all galleries in a variable
// 2. Declare functions that fades in/out each slide
// 3. Declare function that checks the current slide number and rewind it at the beginning and at the end of the slides.
// 4. Declare function that updates the curent and total slides number on screen
// 5. Grab each gallery and call the previously declared functions according to the control link clicked.
// 6. Next on click show next slide - if last slide then show first slide
// 7. Prev on click show prev slide - if first slide then show last slide

const galleries = document.querySelectorAll('.project-gallery');
const galleriesArr = Array.from(galleries); // Array is needed in order to use forEach later.

const showSlide = function (slide) {
    slide.style.opacity = 1;
} 

const hideSlide = function (slide) {
    slide.style.opacity = 0;
} 

// If the control link has class Next, then increase the slide counter. Check if it has reached the last slide of the gallery, then rewind to the first slide
// If the control link has class Prev, then decrease the slide counter. Check if it has reached the first slide of the gallery, then rewind to the last slide
function checkCounter (counter, link, totalNum) {
    if (link.classList.contains('next')) {
        counter ++;
        if (counter >= totalNum) {
            counter = 0;
        }
    } else if (link.classList.contains('prev')) {
        counter--;
        if (counter < 0) {
            counter = totalNum - 1;
        }
    }
    return counter;
}

// Function that show the current and total slides below each gallery
function updateSteps (htmlElem, current, total) {
    htmlElem.innerHTML = `${current + 1} / ${total}`;
}

//  Grab each gallery. This is needed in order to avoid all of the galleries updating slides at the same time. That way each gallery works separately
galleriesArr.forEach(gallery => {

    const allSlidesArr = Array.from(gallery.querySelectorAll('.slide-holder')); //Array is needed in order to call show/hide function for a specific slide with Array[]
    const totalSlidesNum = allSlidesArr.length;
    let currentSlide = 0; //This is a counter which is used to change to prev/next slide and update the steps text in index.html. It has to be individual for each gallery.

    const controlLinksArr  = Array.from(gallery.querySelectorAll('.control-link')); // Grabbing the two control links together to avoid repetitive code and only apply changes to the currentSlide counter
    const steps = gallery.querySelector('.steps');

    updateSteps(steps, currentSlide, totalSlidesNum); // Steps have to be updated before click so that it shows correct info on page load

    // Apply event listener on Click to each control link
    controlLinksArr.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Call the counter checker function to see if the currentSlide counter has reached 
            // the end or the beginning of the slides. And rewind the currentSlide number accordingly. 
            // Save this as the value of the currentSlide variable
            currentSlide = checkCounter(currentSlide, link, totalSlidesNum);

            // Hide all slides on click
            allSlidesArr.forEach(slide => {
                hideSlide(slide)
            })

            // Then show only the next slide and update steps text in index.html
            showSlide(allSlidesArr[currentSlide]);
            updateSteps(steps, currentSlide, totalSlidesNum);

        })
    })

})