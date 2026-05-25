const servicesList = [
  { id: "lonas", name: "Lonas (Banner)" },
  { id: "etiquetas", name: "Etiquetas" },
  { id: "adhesivos", name: "Adhesivos" },
  { id: "microperforados", name: "Microperforados" },
  { id: "sandblasting", name: "Sandblasting" },
  { id: "corte-electronico", name: "Corte Electrónico" },
  { id: "corporeos", name: "Rótulos Corporeos" },
  { id: "letras-planas-laser", name: "Letras Planas con Corte en Láser" },
  { id: "placas-acrilicas", name: "Placas Acrílicas" },
  { id: "placas-pvc", name: "Placas PVC" },
  { id: "roller-up", name: "Roller Up" },
  { id: "rotulacion-vehicular", name: "Rotulación Vehicular" },
  { id: "rotulos-marco-lona", name: "Rótulos Marco y Lona" },
  { id: "rotulos-metalicos", name: "Rótulos Metálicos (Vallas y Rótulos)" },
  { id: "coroplast", name: "Coroplast" },
  { id: "rotulos-luminosos", name: "Rótulos Luminosos" },
  { id: "instalacion", name: "Instalación" },
];

const globbedFiles = import.meta.glob('/public/**/*.{jpg,jpeg,png,webp,avif,gif}');
const filePaths = Object.keys(globbedFiles);

const projects = [];
servicesList.forEach(service => {
  const serviceFiles = filePaths.filter(path => path.includes(`/${service.id}/`));

  if (serviceFiles.length > 0) {
    serviceFiles.forEach((path, i) => {
      const publicUrl = path.replace('/public', '');
      projects.push({
        img: publicUrl,
        imgSmall: publicUrl,
        title: service.name,
        category: service.name,
        categoryId: service.id
      });
    });
  }
});

let currentPage = 1;
const itemsPerPage = 9;
let activeLightboxIndex = 0;
let filteredProjects = [...projects];

function renderGalleryPage() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;

  grid.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = filteredProjects.slice(startIndex, endIndex);

  pageItems.forEach((project, idx) => {
    const originalFilteredIndex = startIndex + idx;

    const card = document.createElement('div');
    card.className = "gallery-card group relative overflow-hidden rounded-[20px] aspect-[4/3] cursor-pointer shadow-lg border border-gray-100";
    card.setAttribute('onclick', `openLightbox(${originalFilteredIndex})`);

    card.innerHTML = `
      <div class="relative w-full h-full overflow-hidden rounded-[20px]">
        
        <img 
          src="${project.imgSmall}" 
          alt="" 
          class="w-full h-full object-cover transition-transform duration-700 ease-out"
          loading="lazy" decoding="async"
        />

        <!-- overlay suave -->
        <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

        <!-- badge -->
        <div class="absolute bottom-4 left-4 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          
          <span class="px-3 py-1.5 bg-[#1E6FFF] text-white text-[11px] font-bold uppercase tracking-wide rounded-full shadow-lg backdrop-blur-sm">
            ${project.category}
          </span>

        </div>

      </div>
    `;
    grid.appendChild(card);
  });

  renderPaginationControls();
}

function renderPaginationControls() {
  const paginationContainer = document.getElementById('gallery-pagination');
  if (!paginationContainer) return;

  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  if (totalPages <= 1) {
    paginationContainer.style.display = 'none';
    return;
  }

  paginationContainer.style.display = 'flex';

  const prevBtn = document.createElement('button');
  prevBtn.className = `w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all ${currentPage === 1 ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-[#F4F6FA] text-gray-600 hover:bg-[#1E6FFF]/10 hover:text-[#1E6FFF]'}`;
  prevBtn.innerHTML = '&#10094;';
  if (currentPage > 1) {
    prevBtn.addEventListener('click', () => {
      currentPage--;
      renderGalleryPage();
      scrollToGalleryHeader();
    });
  }
  paginationContainer.appendChild(prevBtn);

  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }

  if (startPage > 1) {
    const firstBtn = document.createElement('button');
    firstBtn.className = "w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm bg-[#F4F6FA] text-gray-600 hover:bg-[#1E6FFF]/10 hover:text-[#1E6FFF] transition-all";
    firstBtn.textContent = '1';
    firstBtn.addEventListener('click', () => {
      currentPage = 1;
      renderGalleryPage();
      scrollToGalleryHeader();
    });
    paginationContainer.appendChild(firstBtn);

    if (startPage > 2) {
      const dots = document.createElement('span');
      dots.className = "px-2 text-gray-400 font-bold";
      dots.textContent = '...';
      paginationContainer.appendChild(dots);
    }
  }

  for (let p = startPage; p <= endPage; p++) {
    const pageBtn = document.createElement('button');
    const isActive = p === currentPage;
    pageBtn.className = `w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all ${isActive ? 'bg-[#1E6FFF] text-white shadow-md' : 'bg-[#F4F6FA] text-gray-600 hover:bg-[#1E6FFF]/10 hover:text-[#1E6FFF]'}`;
    pageBtn.textContent = p;
    pageBtn.addEventListener('click', () => {
      currentPage = p;
      renderGalleryPage();
      scrollToGalleryHeader();
    });
    paginationContainer.appendChild(pageBtn);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const dots = document.createElement('span');
      dots.className = "px-2 text-gray-400 font-bold";
      dots.textContent = '...';
      paginationContainer.appendChild(dots);
    }

    const lastBtn = document.createElement('button');
    lastBtn.className = "w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm bg-[#F4F6FA] text-gray-600 hover:bg-[#1E6FFF]/10 hover:text-[#1E6FFF] transition-all";
    lastBtn.textContent = totalPages;
    lastBtn.addEventListener('click', () => {
      currentPage = totalPages;
      renderGalleryPage();
      scrollToGalleryHeader();
    });
    paginationContainer.appendChild(lastBtn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = `w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-[#F4F6FA] text-gray-600 hover:bg-[#1E6FFF]/10 hover:text-[#1E6FFF]'}`;
  nextBtn.innerHTML = '&#10095;';
  if (currentPage < totalPages) {
    nextBtn.addEventListener('click', () => {
      currentPage++;
      renderGalleryPage();
      scrollToGalleryHeader();
    });
  }
  paginationContainer.appendChild(nextBtn);
}

function scrollToGalleryHeader() {
  const section = document.getElementById('galeria');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

export function initGallery() {
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');

  currentPage = 1;
  filteredProjects = [...projects];
  renderGalleryPage();

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      filterButtons.forEach(b => {
        b.classList.remove('bg-[#1E6FFF]', 'text-white');
        b.classList.add('bg-[#F4F6FA]', 'text-gray-600');
      });
      btn.classList.remove('bg-[#F4F6FA]', 'text-gray-600');
      btn.classList.add('bg-[#1E6FFF]', 'text-white');

      if (category === 'all') {
        filteredProjects = [...projects];
      } else {
        filteredProjects = projects.filter(p => p.categoryId === category);
      }

      currentPage = 1;
      renderGalleryPage();
    });
  });

  window.removeEventListener('keydown', handleGlobalKeydown);
  window.addEventListener('keydown', handleGlobalKeydown);
}

function handleGlobalKeydown(e) {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox || !lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowRight') {
    nextLightboxImage();
  } else if (e.key === 'ArrowLeft') {
    prevLightboxImage();
  }
}

window.openLightbox = function (filteredIndex) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');

  if (!lightbox || !lightboxImg || !lightboxCaption) return;

  activeLightboxIndex = filteredIndex;
  const project = filteredProjects[filteredIndex];
  if (!project) return;

  lightboxImg.src = project.img;
  lightboxImg.alt = project.title;
  lightboxCaption.innerHTML = '';

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  lightbox.classList.remove('active');
  document.body.style.overflow = '';
};

window.nextLightboxImage = function () {
  if (filteredProjects.length === 0) return;
  const nextIndex = (activeLightboxIndex + 1) % filteredProjects.length;
  fadeImageTransition(nextIndex);
};

window.prevLightboxImage = function () {
  if (filteredProjects.length === 0) return;
  const prevIndex = (activeLightboxIndex - 1 + filteredProjects.length) % filteredProjects.length;
  fadeImageTransition(prevIndex);
};

function fadeImageTransition(targetIndex) {
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  if (!lightboxImg) return;

  lightboxImg.style.opacity = '0';

  setTimeout(() => {
    activeLightboxIndex = targetIndex;
    const project = filteredProjects[targetIndex];
    if (project) {
      lightboxImg.src = project.img;
      lightboxImg.alt = project.title;
      if (lightboxCaption) {
        lightboxCaption.innerHTML = '';
      }
    }
    lightboxImg.style.opacity = '1';
  }, 200);
}