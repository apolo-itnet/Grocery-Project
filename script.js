/* const carousel = document.getElementById("carousel");
let index = 0;
const totalSlides = document.querySelectorAll("#carousel div").length - 1;

function nextSlide() {
    index++;
    carousel.style.transition = "transform 0.5s ease-in-out";
    carousel.style.transform = `translateX(-${index * 100}%)`;
    
    if (index === totalSlides) {
        setTimeout(() => {
            carousel.style.transition = "none";
            carousel.style.transform = "translateX(0%)";
            index = 0;
        }, 500);
    }
}
setInterval(nextSlide, 4000); */

const carousel = document.getElementById("carousel");
const totalSlides = document.querySelectorAll(".carousel-item").length;
let index = 0;
let autoSlideInterval; // Variable to store the interval ID

// Function to change slides
function changeSlide() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Function to go to the next slide
function nextSlide() {
  index = (index + 1) % totalSlides; // Loop back to the first slide after the last
  changeSlide();
  resetAutoSlide(); // Restart the auto-slide after manual slide change
}

// Function to go to the previous slide
function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides; // Loop back to the last slide if moving back
  changeSlide();
  resetAutoSlide(); // Restart the auto-slide after manual slide change
}

// Function to reset the auto-slide interval
function resetAutoSlide() {
  clearInterval(autoSlideInterval); // Clear the existing interval
  autoSlideInterval = setInterval(nextSlide, 4000); // Start a new interval
}

// Set up the interval for auto-sliding every 4 seconds
autoSlideInterval = setInterval(nextSlide, 4000);

// Event listeners for buttons
document.querySelectorAll('.btn-circle').forEach(button => {
  button.addEventListener('click', function() {
    if (this.innerText === '❮') {
      prevSlide();
    } else if (this.innerText === '❯') {
      nextSlide();
    }
  });
});




