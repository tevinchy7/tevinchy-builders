// 1. Unified Project Registry (Completed and Active construction site metrics in KSh)
const portfolioData = [
    {
        id: 1,
        title: "The Obsidian Ridge Villa",
        status: "completed",
        price: 106600000,
        timeline: "Completed 2025",
        progress: 100,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Sunset Timber Ridge Frame",
        status: "ongoing",
        price: 53300000,
        timeline: "Est. Delivery: Aug 2026",
        progress: 45,
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "The Emerald Coast Pavilion",
        status: "completed",
        price: 83200000,
        timeline: "Completed 2026",
        progress: 100,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Metro Heights Complex - Phase 1",
        status: "ongoing",
        price: 123500000,
        timeline: "Est. Delivery: Nov 2026",
        progress: 75,
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "The Birchwood Suburban Modern",
        status: "completed",
        price: 45500000,
        timeline: "Completed 2025",
        progress: 100,
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "Lakeside Concrete Residence",
        status: "ongoing",
        price: 75400000,
        timeline: "Est. Delivery: Jan 2027",
        progress: 15,
        image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80"
    }
];

const portfolioGrid = document.getElementById('portfolioGrid');
const buttons = {
    all: document.getElementById('btnAll'),
    completed: document.getElementById('btnCompleted'),
    ongoing: document.getElementById('btnOngoing')
};

const imageModal = document.getElementById('imageModal');
const modalTargetImg = document.getElementById('modalTargetImg');
const modalTargetCaption = document.getElementById('modalTargetCaption');
const closeModalBtn = document.getElementById('closeModalBtn');

function renderPortfolio(filterType) {
    const finalData = portfolioData.filter(item => filterType === 'all' || item.status === filterType);

    portfolioGrid.innerHTML = finalData.map(item => {
        const isCompleted = item.status === 'completed';
        const displayStatus = isCompleted ? 'Completed House' : 'Ongoing House';
        const badgeClass = isCompleted ? 'bg-emerald-500/90 text-white' : 'bg-blue-600/90 text-white';
        
        return `
            <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition duration-300">
                <div class="relative overflow-hidden h-52 bg-gray-100 cursor-zoom-in">
                    <img src="${item.image}" alt="${item.title}" class="open-modal w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    <span class="absolute top-4 left-4 text-[11px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider ${badgeClass}">
                        ${displayStatus}
                    </span>
                </div>
                
                <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                        <h3 class="font-bold text-slate-800 text-lg leading-snug">${item.title}</h3>
                        <p class="text-xs text-gray-400 mt-1 font-medium">${item.timeline}</p>
                    </div>

                    <div class="space-y-1.5">
                        <div class="flex justify-between items-center text-xs font-semibold">
                            <span class="text-gray-400">Construction Phase</span>
                            <span class="${isCompleted ? 'text-emerald-500' : 'text-blue-600'}">${item.progress}%</span>
                        </div>
                        <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500' : 'bg-blue-500'}" style="width: ${item.progress}%"></div>
                        </div>
                    </div>

                    <div class="pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div>
                            <span class="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Project Valuation</span>
                            <span class="text-lg font-black text-slate-900">KSh ${item.price.toLocaleString()}</span>
                        </div>
                        <button class="border border-gray-200 hover:border-slate-800 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-lg transition">
                            Project File
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function openImageModal(imgSrc, imgAlt) {
    modalTargetImg.src = imgSrc;
    modalTargetCaption.textContent = imgAlt;
    imageModal.classList.remove('hidden');
    imageModal.classList.add('flex');
    setTimeout(() => {
        imageModal.classList.remove('opacity-0');
        imageModal.classList.add('opacity-100');
    }, 10);
}

function closeImageModal() {
    imageModal.classList.remove('opacity-100');
    imageModal.classList.add('opacity-0');
    setTimeout(() => {
        imageModal.classList.remove('flex');
        imageModal.classList.add('hidden');
    }, 300);
}

buttons.all.addEventListener('click', () => { renderPortfolio('all'); updateActiveButton('all'); });
buttons.completed.addEventListener('click', () => { renderPortfolio('completed'); updateActiveButton('completed'); });
buttons.ongoing.addEventListener('click', () => { renderPortfolio('ongoing'); updateActiveButton('ongoing'); });

portfolioGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('open-modal')) {
        const imageSource = e.target.getAttribute('src');
        const imageCaption = e.target.getAttribute('alt');
        openImageModal(imageSource, imageCaption);
    }
});

closeModalBtn.addEventListener('click', closeImageModal);
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeImageModal();
    }
});

function updateActiveButton(activeKey) {
    Object.keys(buttons).forEach(key => {
        if (key === activeKey) {
            buttons[key].className = "flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition bg-amber-500 text-white transform active:scale-95";
        } else {
            buttons[key].className = "flex-1 sm:flex-initial text-center px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 active:bg-gray-50";
        }
    });
}

renderPortfolio('all');