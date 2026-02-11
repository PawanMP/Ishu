// Mobile Menu Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when any link inside it is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Active Link Highlighting (Scroll Spy)
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav .hidden.md\\:block a');

function highlightNavigation() {
    let scrollPosition = window.scrollY + 150; // Offset for navbar height

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-brown', 'font-bold', 'bg-tan/20');
                link.classList.add('text-brown-light');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.remove('text-brown-light');
                    link.classList.add('text-brown', 'font-bold', 'bg-tan/20');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);
// Initial check
highlightNavigation();


// Scroll Animation (Fade In)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// Three.js Background Animation
// Three.js Background Animation
// Three.js Background Animation - Royal & Classy
const canvasContainer = document.getElementById('canvas-container');

if (canvasContainer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainer.appendChild(renderer.domElement);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100; // Fewer, more elegant particles

    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3); // For smooth movement

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15; // Spread
        velocityArray[i] = (Math.random() - 0.5) * 0.005; // Very slow, elegant drift
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material - Soft Golden Glow
    const material = new THREE.PointsMaterial({
        size: 0.08,
        color: 0x8B5E3C, // Royal Bronze/Gold
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // Connecting Lines Material
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x8B5E3C,
        transparent: true,
        opacity: 0.15 // Very subtle
    });

    camera.position.z = 3;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    const clock = new THREE.Clock();

    const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // 1. Smooth Mouse Follow
        targetX = mouseX * 0.0005;
        targetY = mouseY * 0.0005;

        particlesMesh.rotation.y += 0.02 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.02 * (targetY - particlesMesh.rotation.x);

        // 2. Individual Particle Movement (Drifting)
        const positions = particlesGeometry.attributes.position.array;

        for (let i = 0; i < particlesCount; i++) {
            // Update Y position for gentle floating
            positions[i * 3 + 1] += Math.sin(elapsedTime * 0.5 + positions[i * 3]) * 0.002;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        // 3. Dynamic Lines (Constellation Effect)
        // Clean up old lines
        scene.children.forEach(child => {
            if (child.type === 'Line') scene.remove(child);
        });

        // Add new lines for close particles
        /* Optimization: Only draw limited lines for performance and aesthetics */
        /* Note: Full N*N loop is heavy. Detailed implementation often moved to shaders or specific line segments. 
           For this 'classy' look, we'll skip complex dynamic lines to keep it performant and clean, 
           relying on the elegant drift of the 'gold dust'. */

        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Album Carousel Navigation
const albumContainer = document.getElementById('album-container');
const scrollLeftBtn = document.getElementById('scrollLeft');
const scrollRightBtn = document.getElementById('scrollRight');

if (albumContainer && scrollLeftBtn && scrollRightBtn) {
    // 1. Create Infinite Loop Effect by Duplicating Content
    const originalContent = albumContainer.innerHTML;
    albumContainer.innerHTML += originalContent; // Double the items

    let autoScrollInterval;

    const startAutoScroll = () => {
        autoScrollInterval = setInterval(() => {
            const firstItem = albumContainer.querySelector('div');
            if (!firstItem) return;

            const itemWidth = firstItem.offsetWidth + 16; // width + gap

            // Check if we've reached the end of the original set
            // If scrollLeft is exactly half the total scrollWidth, reset to 0 instantly
            if (albumContainer.scrollLeft >= albumContainer.scrollWidth / 2) {
                albumContainer.scrollLeft = 0;
            }

            albumContainer.scrollBy({ left: itemWidth, behavior: 'smooth' });
        }, 1000); // 1 second interval as requested
    };

    const stopAutoScroll = () => {
        clearInterval(autoScrollInterval);
    };

    // Initial start
    startAutoScroll();

    // Pause on hover
    albumContainer.addEventListener('mouseenter', stopAutoScroll);
    albumContainer.addEventListener('mouseleave', startAutoScroll);

    // Manual controls
    scrollLeftBtn.addEventListener('click', () => {
        const firstItem = albumContainer.querySelector('div');
        const itemWidth = firstItem ? firstItem.offsetWidth + 16 : 300;

        if (albumContainer.scrollLeft <= 0) {
            albumContainer.scrollLeft = albumContainer.scrollWidth / 2;
        }

        albumContainer.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        stopAutoScroll();
        setTimeout(startAutoScroll, 4000);
    });

    scrollRightBtn.addEventListener('click', () => {
        const firstItem = albumContainer.querySelector('div');
        const itemWidth = firstItem ? firstItem.offsetWidth + 16 : 300;

        if (albumContainer.scrollLeft >= albumContainer.scrollWidth / 2) {
            albumContainer.scrollLeft = 0;
        }

        albumContainer.scrollBy({ left: itemWidth, behavior: 'smooth' });
        stopAutoScroll();
        setTimeout(startAutoScroll, 4000);
    });
}

// --- Admin Access & Editing Logic ---
const adminLogo = document.getElementById('admin-logo-trigger');
const loginModal = document.getElementById('admin-login-modal');
const loginBtn = document.getElementById('login-submit');
const loginClose = document.getElementById('login-close');
const adminTools = document.getElementById('admin-tools');
const logoutBtn = document.getElementById('logout-admin');

// Settings Elements
const settingsBtn = document.getElementById('admin-settings-btn');
const settingsModal = document.getElementById('admin-settings-modal');
const settingsClose = document.getElementById('settings-close');
const saveCredsBtn = document.getElementById('save-credentials');

// Initialize Credentials
if (!localStorage.getItem('adminUser')) {
    localStorage.setItem('adminUser', 'Ishu');
    localStorage.setItem('adminPass', 'DIshu');
}

let pressTimer;

if (adminLogo) {
    adminLogo.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            loginModal.classList.remove('hidden');
            loginModal.classList.add('flex');
        }, 3000);
    });
    adminLogo.addEventListener('mouseup', () => clearTimeout(pressTimer));
    adminLogo.addEventListener('mouseleave', () => clearTimeout(pressTimer));

    adminLogo.addEventListener('touchstart', (e) => {
        pressTimer = setTimeout(() => {
            loginModal.classList.remove('hidden');
            loginModal.classList.add('flex');
        }, 3000);
    });
    adminLogo.addEventListener('touchend', () => clearTimeout(pressTimer));
}

// Close Modal
if (loginClose) {
    loginClose.addEventListener('click', () => {
        loginModal.classList.add('hidden');
        loginModal.classList.remove('flex');
    });
}

// Login/Logout
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        const user = document.getElementById('admin-user').value;
        const pass = document.getElementById('admin-pass').value;
        if (user === localStorage.getItem('adminUser') && pass === localStorage.getItem('adminPass')) {
            sessionStorage.setItem('adminLoggedIn', 'true');
            location.reload(); // Reload to apply all admin injections
        } else {
            alert('Invalid Credentials');
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('adminLoggedIn');
        location.reload();
    });
}

// Settings Modal
if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
        settingsModal.classList.remove('hidden');
        settingsModal.classList.add('flex');
        // Pre-fill current username
        document.getElementById('new-admin-user').value = localStorage.getItem('adminUser');
    });
}
if (settingsClose) {
    settingsClose.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
        settingsModal.classList.remove('flex');
    });
}
if (saveCredsBtn) {
    saveCredsBtn.addEventListener('click', () => {
        const newUser = document.getElementById('new-admin-user').value;
        const newPass = document.getElementById('new-admin-pass').value;
        if (newUser && newPass) {
            localStorage.setItem('adminUser', newUser);
            localStorage.setItem('adminPass', newPass);
            alert('Credentials Updated!');
            settingsModal.classList.add('hidden');
            settingsModal.classList.remove('flex');
        } else {
            alert('Please fill in both fields.');
        }
    });
}

// --- Admin Editing Features ---
function activateAdminMode() {
    if (sessionStorage.getItem('adminLoggedIn') !== 'true') return;

    adminTools.classList.remove('hidden');
    document.body.classList.add('admin-mode-active');

    // 1. Text & List Editing
    const editableTags = ['h1', 'h2', 'h3', 'h4', 'p', 'span', 'li', 'button'];
    editableTags.forEach(tag => {
        document.querySelectorAll(tag).forEach(el => {
            if (!el.closest('#admin-tools') && !el.closest('.modal') && !el.closest('nav')) {
                el.setAttribute('contenteditable', 'true');
                el.classList.add('admin-editable');
            }
        });
    });

    // Add "+" button for UL/OL lists
    document.querySelectorAll('ul, ol').forEach(list => {
        if (!list.closest('nav') && !list.closest('.modal')) {
            const addLiBtn = document.createElement('button');
            addLiBtn.innerText = "+ Add Point";
            addLiBtn.className = "text-xs bg-brown-light/10 text-brown-light px-2 py-1 rounded mt-2 admin-add-li block";
            addLiBtn.onclick = (e) => {
                e.stopPropagation();
                const newLi = document.createElement('li');
                newLi.innerText = "New Point";
                newLi.setAttribute('contenteditable', 'true');
                newLi.className = "admin-editable";
                list.appendChild(newLi);
            };
            list.after(addLiBtn);
        }
    });

    // 2. Image & Icon Editing
    document.querySelectorAll('img').forEach(img => {
        if (!img.closest('nav')) {
            img.style.cursor = "pointer";
            img.title = "Click to change image path";
            img.addEventListener('click', (e) => {
                const newSrc = prompt("Enter Image URL or Path (e.g., album/image.jpg):", img.getAttribute('src'));
                if (newSrc !== null) img.src = newSrc;
            });
        }
    });

    document.querySelectorAll('svg').forEach(svg => {
        const parent = svg.parentElement;
        if (parent && (parent.classList.contains('w-16') || parent.classList.contains('w-14') || parent.tagName === 'DIV')) {
            svg.style.cursor = "pointer";
            svg.title = "Click to edit Icon SVG";
            svg.addEventListener('click', (e) => {
                const newSvg = prompt("Paste New SVG Code here (or emoji):", svg.outerHTML);
                if (newSvg) parent.innerHTML = newSvg;
            });
        }
    });

    // 3. Section Management (Add/Delete Cards)
    const sectionsToManage = [
        { id: 'experience', container: '#experience .space-y-6' },
        { id: 'projects', container: '#projects .grid' },
        { id: 'research', container: '#research .grid' },
        { id: 'education', container: '#education .space-y-6' },
        { id: 'certificates', container: '#certificates .grid' },
        { id: 'activities', container: '#activities .grid' },
        { id: 'skills', container: '#skills .grid' }
    ];

    sectionsToManage.forEach(sec => {
        const container = document.querySelector(sec.container);
        if (container) {
            Array.from(container.children).forEach(child => addDeleteButton(child));

            const addBtn = document.createElement('button');
            addBtn.innerHTML = `Add New Item to ${sec.id} +`;
            addBtn.className = "mt-4 w-full py-3 border-2 border-dashed border-brown-light/40 rounded-xl text-brown-light font-bold hover:bg-brown-light/5 transition-all admin-add-btn mb-12";
            addBtn.onclick = () => {
                const firstItem = container.children[0];
                if (firstItem) {
                    const newItem = firstItem.cloneNode(true);
                    newItem.querySelectorAll('[contenteditable]').forEach(el => el.innerText = "Edit Me");
                    newItem.querySelectorAll('.admin-delete-btn').forEach(b => b.remove());
                    addDeleteButton(newItem);
                    container.appendChild(newItem);
                } else {
                    alert(`Cannot add item: No existing item found in the '${sec.id}' section to clone. Please add one manually in the HTML first.`);
                }
            };
            container.after(addBtn);
        }
    });

    // 4. Album Management
    const albumContainer = document.getElementById('album-container');
    if (albumContainer) {
        albumContainer.querySelectorAll('.snap-start').forEach(item => addDeleteButton(item, true));
        const addImgBtn = document.createElement('button');
        addImgBtn.innerHTML = "Add Gallery Image +";
        addImgBtn.className = "mx-auto block mt-8 bg-brown text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-brown-light transition-all admin-add-btn";
        addImgBtn.onclick = () => {
            const firstItem = albumContainer.querySelector('.snap-start');
            if (firstItem) {
                const newSrc = prompt("Enter Image URL/Path (e.g. album/photo.jpg):", "album/");
                if (newSrc) {
                    const newItem = firstItem.cloneNode(true);
                    newItem.querySelector('img').src = newSrc;
                    newItem.querySelectorAll('.admin-delete-btn').forEach(b => b.remove());
                    addDeleteButton(newItem, true);
                    albumContainer.appendChild(newItem);
                }
            } else {
                alert("Cannot add image: No existing album item to clone. Please add one manually in the HTML first.");
            }
        };
        document.querySelector('#album .max-w-7xl').appendChild(addImgBtn);
    }

    // 5. Save & Download
    const saveChangesBtn = document.createElement('button');
    saveChangesBtn.innerHTML = `
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
        Save & Download Site
    `;
    saveChangesBtn.className = "flex items-center bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-lg ml-2";
    saveChangesBtn.onclick = () => {
        const adminUI = document.querySelectorAll('.admin-delete-btn, .admin-add-btn, .admin-add-li, #admin-tools, #admin-login-modal, #admin-settings-modal');
        adminUI.forEach(el => el.style.display = 'none');
        document.querySelectorAll('[contenteditable]').forEach(el => {
            el.removeAttribute('contenteditable');
            el.style.outline = 'none';
        });

        const htmlContent = "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        a.click();

        alert('Site Downloaded! Replace your old index.html file with this one to save changes permanently.');
        location.reload();
    };
    adminTools.appendChild(saveChangesBtn);

    console.log("Admin Edit Mode: Click on any text to change it. Click images/icons to change them. Use 'Add +' and 'X' buttons for sections.");
}

function addDeleteButton(el, isAlbum = false) {
    if (el.querySelector('.admin-delete-btn')) return;
    const delBtn = document.createElement('button');
    delBtn.innerHTML = "×";
    delBtn.className = `admin-delete-btn absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold shadow-md z-20 hover:bg-red-600 transition-colors`;
    if (!isAlbum) el.classList.add('relative'); // Ensure parent is relative for absolute positioning
    delBtn.onclick = (e) => {
        e.stopPropagation(); // Prevent parent click events
        if (confirm("Delete this item?")) el.remove();
    };
    el.appendChild(delBtn);
}

// Start
if (sessionStorage.getItem('adminLoggedIn') === 'true') {
    window.addEventListener('load', activateAdminMode);
}
