document.addEventListener("DOMContentLoaded", function() {
  let currentImageIndex = 0;
  const images = document.querySelectorAll('.hero-image');
  const navigationCircles = document.querySelectorAll('.navigation-circle');

  setInterval(() => {
    images[currentImageIndex].classList.remove('active');
    navigationCircles[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add('active');
    navigationCircles[currentImageIndex].classList.add('active');
  }, 5000); // Change the duration (in milliseconds) between transitions as needed

  // Add click event listeners to navigation circles
  navigationCircles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
      images[currentImageIndex].classList.remove('active');
      navigationCircles[currentImageIndex].classList.remove('active');
      currentImageIndex = index;
      images[currentImageIndex].classList.add('active');
      navigationCircles[currentImageIndex].classList.add('active');
    });
  });
});
 

/* for copy of div*/
/* var copy = document.querySelector(".logos-slide").cloneNode(true)
document.querySelector(".logos").appendChild(copy) */


/********************* For accordian Subproduct *********************/
    

/*
document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const isActive = header.classList.contains("active");
            const content = header.nextElementSibling;

            // Close all headers
            headers.forEach(h => {
                h.classList.remove("active");
                h.nextElementSibling.style.maxHeight = null;
                h.nextElementSibling.classList.remove("open");
            });

            // If not previously active, activate it
            if (!isActive) {
                header.classList.add("active");
                content.classList.add("open");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});  */

document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll(".accordion-header");
    const items = document.querySelectorAll(".accordion-item a");
    const dynamicContent = document.getElementById("dynamic-content");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const isActive = header.classList.contains("active");
            const content = header.nextElementSibling;

            // Close all headers
            headers.forEach(h => {
                h.classList.remove("active");
                h.nextElementSibling.style.maxHeight = null;
                h.nextElementSibling.classList.remove("open");
            });

            // If not previously active, activate it
            if (!isActive) {
                header.classList.add("active");
                content.classList.add("open");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    items.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const subcategory = e.target.dataset.subcategory;
            loadContent(subcategory);
        });
    });

    function loadContent(subcategory) {
        fetch(`content/${subcategory}.html`)
            .then(response => response.text())
            .then(data => {
                dynamicContent.innerHTML = data;
                setupPagination(subcategory);
            })
            .catch(error => console.error('Error loading content:', error));
    }

    function setupPagination(subcategory) {
        const paginationLinks = document.querySelectorAll('.pagination a');
        paginationLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                paginationLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                const page = e.target.dataset.page;
                loadPage(subcategory, page);
            });
        });
    }

    function loadPage(subcategory, page) {
        fetch(`content/${subcategory}-page${page}.html`)
            .then(response => response.text())
            .then(data => {
                document.querySelector('.subcategory-content').innerHTML = data;
                setupPagination(subcategory);
            })
            .catch(error => console.error('Error loading page:', error));
    }
});




  