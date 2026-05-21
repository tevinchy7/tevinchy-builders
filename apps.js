// 1. Project Catalog Data (Your completed house projects)
const projectData = [
    {
        id: 1,
        title: "The Scandinavian Minimalist",
        style: "Modern Nordic",
        price: 385000,
        beds: 3,
        baths: 2.5,
        sqft: 2100,
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Modern Industrial Loft-House",
        style: "Industrial",
        price: 520000,
        beds: 4,
        baths: 3,
        sqft: 2850,
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Pacific Northwest Eco-Villa",
        style: "Contemporary Coastal",
        price: 745000,
        beds: 5,
        baths: 4.5,
        sqft: 4200,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Desert Modernist Pavillion",
        style: "Mid-Century Modern",
        price: 495000,
        beds: 3,
        baths: 3,
        sqft: 2400,
        image: "https://images.unsplash.com/photo-160096542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "The Urban Compact",
        style: "Modern Minimalist",
        price: 320000,
        beds: 2,
        baths: 2,
        sqft: 1450,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "The Glass Heights Estate",
        style: "Luxury Contemporary",
        price: 890000,
        beds: 5,
        baths: 6,
        sqft: 5100,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
    }
];

// Building Materials Slideshow Data
const materialsSlides = [
    {
        title: "Premium Hardwood Flooring",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80"
    },
    {
        title: "Natural Stone & Marble",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80"
    },
    {
        title: "Architectural Glass & Steel",
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80"
    },
    {
        title: "Premium Concrete & Masonry",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80"
    },
    {
        title: "Sustainable Eco-Materials",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"
    }
];

// 2. Select DOM elements from index.html
const projectsGrid = document.getElementById('projectsGrid');
const searchBar = document.getElementById('searchBar');
const priceFilter = document.getElementById('priceFilter');

// 3. Function to render project elements to the screen
function displayProjects(projects) {
    if (projects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                <p class="text-base font-medium">No completed builds match your criteria.</p>
                <p class="text-xs mt-1">Try broadening your search or price range parameters.</p>
            </div>`;
        return;
    }

    projectsGrid.innerHTML = projects.map(project => `
        <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition duration-300 flex flex-col group">
            <div class="relative overflow-hidden bg-gray-200 h-56">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <span class="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    ${project.style}
                </span>
            </div>
            
            <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                    <h3 class="text-lg font-bold text-gray-800 tracking-tight group-hover:text-amber-600 transition">${project.title}</h3>
                    <div class="flex items-center gap-4 text-xs font-medium text-gray-500 mt-2">
                        <span><strong>${project.beds}</strong> Beds</span>
                        <span>•</span>
                        <span><strong>${project.baths}</strong> Baths</span>
                        <span>•</span>
                        <span><strong>${project.sqft.toLocaleString()}</strong> Sq Ft</span>
                    </div>
                </div>

                <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <span class="text-xs text-gray-400 block uppercase font-bold tracking-wider">Est. Build Price</span>
                        <span class="text-xl font-extrabold text-slate-900">$${project.price.toLocaleString()}</span>
                    </div>
                    <button class="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm">
                        View Blueprint
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 4. Filtering Engine Logic
function filterProjects() {
    const searchString = searchBar.value.toLowerCase().trim();
    const selectedPriceBracket = priceFilter.value;

    const filtered = projectData.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchString) || 
                              project.style.toLowerCase().includes(searchString);

        let matchesPrice = true;
        if (selectedPriceBracket === "under-400") {
            matchesPrice = project.price < 400000;
        } else if (selectedPriceBracket === "400-600") {
            matchesPrice = project.price >= 400000 && project.price <= 600000;
        } else if (selectedPriceBracket === "above-600") {
            matchesPrice = project.price > 600000;
        }

        return matchesSearch && matchesPrice;
    });

    displayProjects(filtered);
}

// 5. Reactive Event Listeners
searchBar.addEventListener('input', filterProjects);
priceFilter.addEventListener('change', filterProjects);

displayProjects(projectData);

// ==================== SLIDESHOW FUNCTIONALITY ====================

let currentSlideIndex = 0;
const slideshowContainer = document.getElementById('slideshowContainer');
const slideIndicators = document.getElementById('slideIndicators');
const prevButton = document.getElementById('prevSlide');
const nextButton = document.getElementById('nextSlide');

function initSlideshow() {
    // FIX: Automatically sort building items alphabetically by their title layout
    materialsSlides.sort((a, b) => a.title.localeCompare(b.title));

    // Create slide indicators (dots) based on sorted array
    materialsSlides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `w-3 h-3 rounded-full transition ${index === 0 ? 'bg-amber-500' : 'bg-white/50'}`;
        dot.addEventListener('click', () => goToSlide(index));
        slideIndicators.appendChild(dot);
    });

    // Create slides based on sorted array
    materialsSlides.forEach((slide, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = `absolute w-full h-full transition-opacity duration-1000 ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
        slideDiv.innerHTML = `
            <img src="${slide.image}" alt="${slide.title}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent flex items-end">
                <p class="text-white text-2xl font-bold p-8">${slide.title}</p>
            </div>
        `;
        slideshowContainer.appendChild(slideDiv);
    });

    startAutoSlideshow();
}

function showSlide(index) {
    const slides = slideshowContainer.querySelectorAll('div');
    const dots = slideIndicators.querySelectorAll('button');

    slides.forEach((slide, i) => {
        slide.classList.toggle('opacity-100', i === index);
        slide.classList.toggle('opacity-0', i !== index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('bg-amber-500', i === index);
        dot.classList.toggle('bg-white/50', i !== index);
    });
}

function goToSlide(index) {
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
    resetAutoSlideshow();
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % materialsSlides.length;
    showSlide(currentSlideIndex);
    resetAutoSlideshow();
}

function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + materialsSlides.length) % materialsSlides.length;
    showSlide(currentSlideIndex);
    resetAutoSlideshow();
}

let autoSlideshowTimer;

function startAutoSlideshow() {
    autoSlideshowTimer = setInterval(nextSlide, 5000);
}

function resetAutoSlideshow() {
    clearInterval(autoSlideshowTimer);
    startAutoSlideshow();
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

initSlideshow();