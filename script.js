document.addEventListener('DOMContentLoaded', function() {

    /* ============================================================
       MOBILE DESKTOP-VIEW NOTICE
       Shows a dismissible top banner on every page load for
       mobile users — exactly like the warning bar style.
    ============================================================ */
    (function() {
        var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                             || window.innerWidth <= 768;

        if (!isMobileDevice) return;

        var banner = document.createElement('div');
        banner.id = 'mobileNoticeBanner';
        banner.style.cssText = [
            'position:fixed',
            'top:0',
            'left:0',
            'right:0',
            'z-index:99999',
            'background:#2c2c2c',
            'color:#fff',
            'padding:10px 16px',
            'display:flex',
            'align-items:center',
            'justify-content:space-between',
            'gap:12px',
            'font-family:"Source Sans Pro",sans-serif',
            'font-size:0.88rem',
            'line-height:1.4',
            'box-shadow:0 2px 10px rgba(0,0,0,0.4)'
        ].join(';');

        var msg = document.createElement('span');
        msg.innerHTML = '<span style="color:#c9a961;font-size:1.1rem;margin-right:6px;">&#9888;</span>'
                      + 'This site is best viewed on a <strong>desktop or laptop</strong> for the full experience.';

        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&#10005;';
        closeBtn.style.cssText = [
            'background:none',
            'border:none',
            'color:#c9a961',
            'font-size:1.1rem',
            'cursor:pointer',
            'flex-shrink:0',
            'padding:4px 6px',
            'line-height:1'
        ].join(';');
        closeBtn.setAttribute('aria-label', 'Dismiss notice');

        function dismissBanner() {
            banner.remove();
            document.body.style.paddingTop = '';
            var navbar = document.querySelector('.navbar');
            if (navbar) navbar.style.top = '';
        }

        closeBtn.addEventListener('click', dismissBanner);

        banner.appendChild(msg);
        banner.appendChild(closeBtn);
        document.body.insertBefore(banner, document.body.firstChild);

        /* Push content down so banner doesn't cover navbar */
        var bannerH = banner.offsetHeight || 44;
        document.body.style.paddingTop = bannerH + 'px';
        var navbar = document.querySelector('.navbar');
        if (navbar) navbar.style.top = bannerH + 'px';

        /* Recalc on resize */
        window.addEventListener('resize', function() {
            if (!document.getElementById('mobileNoticeBanner')) return;
            var h = banner.offsetHeight || 44;
            document.body.style.paddingTop = h + 'px';
            if (navbar) navbar.style.top = h + 'px';
        });
    })();


    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('closeBtn');
    const menuItems = document.querySelectorAll('.menu-items a');

    // --- Global Navigation & Menu Logic ---
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeMenu() {
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    menuItems.forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(e) {
            if (e.target === menuOverlay) {
                closeMenu();
            }
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // Homepage animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.partner-group, .logo-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // --- CHAPTER PAGE FUNCTIONALITY ---
    if (document.querySelector('.chapter-sidebar')) {
        const currentPage = document.title;
        const isChapter1 = currentPage.includes('Need and Scope') || currentPage.includes('The Need and Scope');
        const isChapter2 = currentPage.includes('How to Use the Manual');
        const isChapter3 = currentPage.includes('Engaging the Architect') || currentPage.includes('Design Approval Process');
        const isChapter4 = currentPage.includes('High-level Considerations');
        const isChapter5 = currentPage.includes('Outpatient Care');
        const isChapter6 = currentPage.includes('Operation Theatre Complex');
        const isChapter7 = currentPage.includes('Ambulatory and Inpatient Care');
        const isChapter8 = currentPage.includes('Layout Guidelines for Support Functions');
        const isChapter9 = currentPage.includes('Patient and Staff Safety Considerations');
        const isChapter8Energy = currentPage.includes('Championing Responsible Healthcare');
        const isChapterPlaceholder8 = currentPage.includes('Update Soon');
        
        if (isChapter1) {
            initChapter1Page();
        } else if (isChapter2) {
            initChapter2Page();
        } else if (isChapter3) {
            initChapter3Page();
        } else if (isChapter4) {
            initChapter4Page();
        } else if (isChapter5) {
            initChapter5Page();
        } else if (isChapter6) {
            initChapter6Page();
        } else if (isChapter7) {
            initChapter7Page();
        } else if (isChapter8) {
            initChapter8Page();
        } else if (isChapter9) {
            initChapter9Page();
        } else if (isChapter8Energy) {
            initChapter8EnergyPage();
        } else if (isChapterPlaceholder8) {
            initChapterPlaceholder8Page();
        }
    }

    // ========================================
    // CHAPTER 1 - THE NEED AND SCOPE
    // ========================================
    function initChapter1Page() {
        const contentOrder = ['intro', 'not-covered', 'covered'];
        
        const contentTitles = {
            'intro': '2. Need and scope',
            'not-covered': 'What is not covered',
            'covered': 'What is covered'
        };

        const contentLinkMap = {
            'intro': '.nav-link[data-content="intro"]',
            'not-covered': '.nav-link[data-content="not-covered"]',
            'covered': '.nav-link[data-content="covered"]'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter1ContentSwitching();
        initChapter1NavigationButtons();
        
        updateChapter1Breadcrumb(contentOrder[currentContentIndex]);
        showChapter1Content(contentOrder[currentContentIndex]);

        function updateChapter1Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '2. Need and scope';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '2. Need and scope';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter1Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            const subsections = [
                { id: 'not-covered', title: 'What is not covered' },
                { id: 'covered', title: 'What is covered' }
            ];

            subsections.forEach((section) => {
                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';
                
                if (section.id === activeContentId) {
                    const sectionSpan = document.createElement('span');
                    sectionSpan.className = 'breadcrumb-link breadcrumb-secondary active';
                    sectionSpan.textContent = section.title;
                    sectionItem.appendChild(sectionSpan);
                } else {
                    const sectionLink = document.createElement('a');
                    sectionLink.href = '#';
                    sectionLink.className = 'breadcrumb-link breadcrumb-secondary';
                    sectionLink.textContent = section.title;
                    sectionLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter1Content(section.id);
                    });
                    sectionItem.appendChild(sectionLink);
                }
                
                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function initChapter1ContentSwitching() {
            const allNavLinks = document.querySelectorAll('.parent-link');
            
            allNavLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const contentId = this.getAttribute('data-content');
                    if (!contentId) return;

                    showChapter1Content(contentId);
                    
                    document.querySelectorAll('.parent-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    const sidebar = document.getElementById('chapterSidebar');
                    if (window.innerWidth <= 992) {
                        if (window.closeSidebar) window.closeSidebar();
                    }
                });
            });
        }

        function showChapter1Content(contentId) {
            const allContents = document.querySelectorAll('.content-block');
            allContents.forEach(content => {
                content.style.display = 'none';
            });
            
            const selectedContent = document.getElementById('content-' + contentId);
            if (selectedContent) {
                selectedContent.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                currentContentIndex = contentOrder.indexOf(contentId);
                updateChapter1Breadcrumb(contentId);
                updateChapter1NavigationButtons();
                
                document.querySelectorAll('.parent-link').forEach(l => l.classList.remove('active'));
                const linkToActivate = document.querySelector(contentLinkMap[contentId]);
                if (linkToActivate) {
                    linkToActivate.classList.add('active');
                }
            }
        }

        function initChapter1NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'Preface.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter1Content(contentId);
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter2.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter1Content(contentId);
                    }
                });
            }
            
            updateChapter1NavigationButtons();
        }

        function updateChapter1NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn && nextBtn) {
                prevBtn.style.display = 'flex';
                nextBtn.style.display = 'flex';
                
                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
                
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 2 - HOW TO USE THE MANUAL
    // ========================================
    function initChapter2Page() {
        initSidebarToggle();
        updateChapter2Breadcrumb();
        
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        
        if (prevBtn) {
            prevBtn.style.display = 'flex';
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
            prevBtn.addEventListener('click', function() {
                window.location.href = 'chapter1.html';
            });
        }
        
        if (nextBtn) {
            nextBtn.style.display = 'flex';
            nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
            nextBtn.addEventListener('click', function() {
                window.location.href = 'chapter3.html';
            });
        }

        function updateChapter2Breadcrumb() {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator = document.createElement('span');
            separator.className = 'breadcrumb-dot';
            separator.textContent = '•';
            breadcrumbNav.appendChild(separator);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            const chapterLink = document.createElement('span');
            chapterLink.className = 'breadcrumb-link breadcrumb-primary active';
            chapterLink.textContent = '3. How to use the manual';
            chapterItem.appendChild(chapterLink);
            breadcrumbNav.appendChild(chapterItem);
        }
    }

    // ========================================
    // CHAPTER 3 - ENGAGING THE ARCHITECT
    // ========================================
    function initChapter3Page() {
        const contentOrder = ['intro', 'approval-process', 'preliminary-design', 'concept-design', 'statutory-approval', 'flowchart'];
        
        const breadcrumbTitles = {
            'intro': '4. Engaging the architect',
            'approval-process': 'The approval process',
            'preliminary-design': 'Preliminary design',
            'concept-design': 'Concept design',
            'statutory-approval': 'Statutory approval',
            'flowchart': 'Flow chart'
        };

        const contentLinkMap = {
            'intro': '.parent-link[data-content="intro"]',
            'approval-process': '.parent-link[data-content="approval-process"]',
            'preliminary-design': '.subsection-link[data-content="preliminary-design"]',
            'concept-design': '.subsection-link[data-content="concept-design"]',
            'statutory-approval': '.subsection-link[data-content="statutory-approval"]',
            'flowchart': '.parent-link[data-content="flowchart"]'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter3Dropdown();
        initChapter3ContentSwitching();
        initChapter3NavigationButtons();
        
        updateChapter3Breadcrumb(contentOrder[currentContentIndex]);
        showChapter3Content(contentOrder[currentContentIndex]);
        
        const firstLink = document.querySelector('.parent-link[data-content="intro"]');
        if (firstLink) firstLink.classList.add('active');

        function updateChapter3Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '4. Engaging the architect';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '4. Engaging the architect';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter3Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            const subsections = [
                { id: 'approval-process', title: 'The approval process' },
                { id: 'preliminary-design', title: 'Preliminary design' },
                { id: 'concept-design', title: 'Concept design' },
                { id: 'statutory-approval', title: 'Statutory approval' },
                { id: 'flowchart', title: 'Flow chart' }
            ];

            subsections.forEach((section) => {
                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';
                
                if (section.id === activeContentId) {
                    const sectionSpan = document.createElement('span');
                    sectionSpan.className = 'breadcrumb-link breadcrumb-secondary active';
                    sectionSpan.textContent = section.title;
                    sectionItem.appendChild(sectionSpan);
                } else {
                    const sectionLink = document.createElement('a');
                    sectionLink.href = '#';
                    sectionLink.className = 'breadcrumb-link breadcrumb-secondary';
                    sectionLink.textContent = section.title;
                    sectionLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter3Content(section.id);
                    });
                    sectionItem.appendChild(sectionLink);
                }
                
                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function initChapter3Dropdown() {
            const approvalProcessLink = document.querySelector('.parent-link[data-content="approval-process"]');
            
            if (approvalProcessLink) {
                approvalProcessLink.addEventListener('click', function(e) {
                    const clickedIcon = e.target.classList.contains('dropdown-icon') || 
                                       e.target.closest('.dropdown-icon');
                    
                    if (clickedIcon) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        this.classList.toggle('open');
                        const sublist = this.nextElementSibling;
                        
                        if (sublist && sublist.classList.contains('nav-sublist-level2')) {
                            if (this.classList.contains('open')) {
                                sublist.style.maxHeight = sublist.scrollHeight + "px";
                            } else {
                                sublist.style.maxHeight = null;
                            }
                        }
                    } else {
                        showChapter3Content('approval-process');
                    }
                });
            }
        }

        function initChapter3ContentSwitching() {
            const allNavLinks = document.querySelectorAll('.parent-link, .subsection-link');

            allNavLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();

                    const contentId = this.getAttribute('data-content');
                    if (!contentId) return;

                    showChapter3Content(contentId);

                    document.querySelectorAll('.parent-link, .subsection-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    const sidebar = document.getElementById('chapterSidebar');
                    if (window.innerWidth <= 992) {
                        if (window.closeSidebar) window.closeSidebar();
                    }
                });
            });
        }

        function showChapter3Content(contentId) {
            const allContents = document.querySelectorAll('.content-block');
            allContents.forEach(content => {
                content.style.display = 'none';
            });
            
            const selectedContent = document.getElementById('content-' + contentId);
            if (selectedContent) {
                selectedContent.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                currentContentIndex = contentOrder.indexOf(contentId);
                
                updateChapter3Breadcrumb(contentId);
                updateChapter3NavigationButtons();
                
                document.querySelectorAll('.parent-link, .subsection-link').forEach(l => l.classList.remove('active'));
                const linkToActivate = document.querySelector(contentLinkMap[contentId]);
                if (linkToActivate) {
                    linkToActivate.classList.add('active');
                }
            }
        }

        function initChapter3NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter2.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter3Content(contentId);
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter4.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter3Content(contentId);
                    }
                });
            }
            
            updateChapter3NavigationButtons();
        }

        function updateChapter3NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn && nextBtn) {
                prevBtn.style.display = 'flex';
                
                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
                
                nextBtn.style.display = 'flex';
                
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 4 - HIGH-LEVEL CONSIDERATIONS
    // ========================================
    function initChapter4Page() {
        const contentOrder = ['intro', 'functional-adequacy', 'operational-efficiency', 'resources'];
        
        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter4ContentSwitching();
        initChapter4NavigationButtons();
        
        updateChapter4Breadcrumb(contentOrder[currentContentIndex]);
        showChapter4Content(contentOrder[currentContentIndex]);

        function updateChapter4Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '5. High-level considerations';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '5. High-level considerations';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter4Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            const subsections = [
                { id: 'functional-adequacy', title: 'A) Functional adequacy' },
                { id: 'operational-efficiency', title: 'B) Operational efficiency' },
                { id: 'resources', title: 'List of resources' }
            ];

            subsections.forEach((section) => {
                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';
                
                if (section.id === activeContentId) {
                    const sectionSpan = document.createElement('span');
                    sectionSpan.className = 'breadcrumb-link breadcrumb-secondary active';
                    sectionSpan.textContent = section.title;
                    sectionItem.appendChild(sectionSpan);
                } else {
                    const sectionLink = document.createElement('a');
                    sectionLink.href = '#';
                    sectionLink.className = 'breadcrumb-link breadcrumb-secondary';
                    sectionLink.textContent = section.title;
                    sectionLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter4Content(section.id);
                    });
                    sectionItem.appendChild(sectionLink);
                }
                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function showChapter4Content(contentId) {
            document.querySelectorAll('.content-block').forEach(block => {
                block.style.display = 'none';
            });

            const contentBlock = document.getElementById('content-' + contentId);
            if (contentBlock) {
                contentBlock.style.display = 'block';
            }

            document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLink = document.querySelector('.nav-link[data-content="' + contentId + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }

            currentContentIndex = contentOrder.indexOf(contentId);
            updateChapter4Breadcrumb(contentId);
            updateChapter4NavigationButtons();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Register globally so closeFileViewer can restore section + breadcrumb
        // WITHOUT calling showChapter4Content (which resets scroll to top)
        window._chapterShowContent    = showChapter4Content;
        window._chapterUpdateBreadcrumb = updateChapter4Breadcrumb;

        function initChapter4ContentSwitching() {
            document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const contentId = this.getAttribute('data-content');
                    if (contentId) {
                        showChapter4Content(contentId);
                    }
                });
            });
        }

        function updateChapter4NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (!prevBtn || !nextBtn) return;

            if (currentContentIndex === 0) {
                prevBtn.style.display = 'flex';
                prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                nextBtn.style.display = 'flex';
                nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
            } else if (currentContentIndex < contentOrder.length - 1) {
                prevBtn.style.display = 'flex';
                prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                nextBtn.style.display = 'flex';
                nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
            } else {
                prevBtn.style.display = 'flex';
                prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                nextBtn.style.display = 'flex';
                nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
            }
        }

        function initChapter4NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter3.html';
                    } else {
                        showChapter4Content(contentOrder[currentContentIndex - 1]);
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter6a.html';
                    } else {
                        showChapter4Content(contentOrder[currentContentIndex + 1]);
                    }
                });
            }
        }
    }

    // ========================================
    // CHAPTER 5 - OUTPATIENT CARE
    // ========================================
    function initChapter5Page() {
        const contentOrder = ['intro', 'factors-influencing', 'service-levels', 'layout-design', 'investigation-area', 'preferred-practices', 'resources'];
        
        const contentLinkMap = {
            'intro': '.parent-link[data-content="intro"]',
            'factors-influencing': '.parent-link[data-content="factors-influencing"]',
            'service-levels': '.subsection-link[data-content="service-levels"]',
            'layout-design': '.subsection-link[data-content="layout-design"]',
            'investigation-area': '.subsection-link[data-content="investigation-area"]',
            'preferred-practices': '.parent-link[data-content="preferred-practices"]',
            'resources': '.parent-link[data-content="resources"]'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter5Dropdown();
        initChapter5ContentSwitching();
        initChapter5NavigationButtons();
        
        updateChapter5Breadcrumb(contentOrder[currentContentIndex]);
        showChapter5Content(contentOrder[currentContentIndex]);
        
        const firstLink = document.querySelector('.parent-link[data-content="intro"]');
        if (firstLink) firstLink.classList.add('active');

        function updateChapter5Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const subsectionParents = {
                'service-levels': 'factors-influencing',
                'layout-design': 'factors-influencing',
                'investigation-area': 'factors-influencing'
            };

            const sectionTitles = {
                'factors-influencing': 'A. Factors influencing space considerations for an outpatient clinic',
                'service-levels': '1. Service levels of care delivery',
                'layout-design': '2. Layout design of an outpatient consultation area',
                'investigation-area': '3. Investigation & procedure area',
                'preferred-practices': 'B. Preferred practices in designing an outpatient clinic',
                'resources': 'List of resources'
            };

            // Always show Home
            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            // Always show Chapter title
            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '6a. Outpatient care – design considerations and guidelines';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '6a. Outpatient care – design considerations and guidelines';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter5Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            // ALWAYS show all main sections (even on intro page)
            // Check if we should show subsections
            const showSubsections = (activeContentId === 'factors-influencing' || 
                                    subsectionParents[activeContentId] === 'factors-influencing');
            
            // Always show Section A
            const sep2 = document.createElement('span');
            sep2.className = 'breadcrumb-dot';
            sep2.textContent = '•';
            breadcrumbNav.appendChild(sep2);

            const sectionAItem = document.createElement('div');
            sectionAItem.className = 'breadcrumb-item';
            
            // Highlight Section A if it's the active content OR if a subsection of A is active
            const isSectionAActive = (activeContentId === 'factors-influencing') || 
                                     (subsectionParents[activeContentId] === 'factors-influencing');
            
            if (isSectionAActive) {
                const span = document.createElement('span');
                span.className = 'breadcrumb-link breadcrumb-secondary active';
                span.textContent = sectionTitles['factors-influencing'];
                sectionAItem.appendChild(span);
            } else {
                const link = document.createElement('a');
                link.href = '#';
                link.className = 'breadcrumb-link breadcrumb-secondary';
                link.textContent = sectionTitles['factors-influencing'];
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter5Content('factors-influencing');
                });
                sectionAItem.appendChild(link);
            }
            breadcrumbNav.appendChild(sectionAItem);

            // Show subsections ONLY if Section A or subsection is active
            if (showSubsections) {
                const subsections = ['service-levels', 'layout-design', 'investigation-area'];
                subsections.forEach(subId => {
                    const sep = document.createElement('span');
                    sep.className = 'breadcrumb-dot';
                    sep.textContent = '•';
                    breadcrumbNav.appendChild(sep);
                    
                    const subItem = document.createElement('div');
                    subItem.className = 'breadcrumb-item';
                    
                    if (subId === activeContentId) {
                        const span = document.createElement('span');
                        span.className = 'breadcrumb-link breadcrumb-secondary active';
                        span.textContent = sectionTitles[subId];
                        subItem.appendChild(span);
                    } else {
                        const link = document.createElement('a');
                        link.href = '#';
                        link.className = 'breadcrumb-link breadcrumb-secondary';
                        link.textContent = sectionTitles[subId];
                        link.addEventListener('click', function(e) {
                            e.preventDefault();
                            showChapter5Content(subId);
                        });
                        subItem.appendChild(link);
                    }
                    breadcrumbNav.appendChild(subItem);
                });
            }

            // Always show Section B
            const sep3 = document.createElement('span');
            sep3.className = 'breadcrumb-dot';
            sep3.textContent = '•';
            breadcrumbNav.appendChild(sep3);

            const sectionBItem = document.createElement('div');
            sectionBItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'preferred-practices') {
                const span = document.createElement('span');
                span.className = 'breadcrumb-link breadcrumb-secondary active';
                span.textContent = sectionTitles['preferred-practices'];
                sectionBItem.appendChild(span);
            } else {
                const link = document.createElement('a');
                link.href = '#';
                link.className = 'breadcrumb-link breadcrumb-secondary';
                link.textContent = sectionTitles['preferred-practices'];
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter5Content('preferred-practices');
                });
                sectionBItem.appendChild(link);
            }
            breadcrumbNav.appendChild(sectionBItem);

            // Always show Resources
            const sep4 = document.createElement('span');
            sep4.className = 'breadcrumb-dot';
            sep4.textContent = '•';
            breadcrumbNav.appendChild(sep4);

            const resourcesItem = document.createElement('div');
            resourcesItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'resources') {
                const span = document.createElement('span');
                span.className = 'breadcrumb-link breadcrumb-secondary active';
                span.textContent = sectionTitles['resources'];
                resourcesItem.appendChild(span);
            } else {
                const link = document.createElement('a');
                link.href = '#';
                link.className = 'breadcrumb-link breadcrumb-secondary';
                link.textContent = sectionTitles['resources'];
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter5Content('resources');
                });
                resourcesItem.appendChild(link);
            }
            breadcrumbNav.appendChild(resourcesItem);
        }

        function initChapter5Dropdown() {
            const factorsLink = document.querySelector('.parent-link[data-content="factors-influencing"]');
            
            if (factorsLink) {
                factorsLink.addEventListener('click', function(e) {
                    const clickedIcon = e.target.classList.contains('dropdown-icon') || 
                                       e.target.closest('.dropdown-icon');
                    
                    if (clickedIcon) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        this.classList.toggle('open');
                        const sublist = this.nextElementSibling;
                        
                        if (sublist && sublist.classList.contains('nav-sublist-level2')) {
                            if (this.classList.contains('open')) {
                                sublist.style.maxHeight = sublist.scrollHeight + "px";
                            } else {
                                sublist.style.maxHeight = null;
                            }
                        }
                    } else {
                        showChapter5Content('factors-influencing');
                    }
                });
            }
        }

        function initChapter5ContentSwitching() {
            const allNavLinks = document.querySelectorAll('.parent-link, .subsection-link');

            allNavLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();

                    const contentId = this.getAttribute('data-content');
                    if (!contentId) return;

                    showChapter5Content(contentId);

                    document.querySelectorAll('.parent-link, .subsection-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    const sidebar = document.getElementById('chapterSidebar');
                    if (window.innerWidth <= 992) {
                        if (window.closeSidebar) window.closeSidebar();
                    }
                });
            });
        }

        function showChapter5Content(contentId) {
            const allContents = document.querySelectorAll('.content-block');
            allContents.forEach(content => {
                content.style.display = 'none';
            });
            
            const selectedContent = document.getElementById('content-' + contentId);
            if (selectedContent) {
                selectedContent.style.display = 'block';
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                currentContentIndex = contentOrder.indexOf(contentId);
                
                updateChapter5Breadcrumb(contentId);
                updateChapter5NavigationButtons();
                
                document.querySelectorAll('.parent-link, .subsection-link').forEach(l => l.classList.remove('active'));
                const linkToActivate = document.querySelector(contentLinkMap[contentId]);
                if (linkToActivate) {
                    linkToActivate.classList.add('active');
                }
            }
        }

        // Register globally so closeFileViewer can restore section + breadcrumb
        // WITHOUT calling showChapter5Content (which resets scroll to top)
        window._chapterShowContent      = showChapter5Content;
        window._chapterUpdateBreadcrumb = updateChapter5Breadcrumb;

        function initChapter5NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter4.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter5Content(contentId);
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter6b.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter5Content(contentId);
                    }
                });
            }
            
            updateChapter5NavigationButtons();
        }

        function updateChapter5NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn && nextBtn) {
                prevBtn.style.display = 'flex';
                
                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
                
                nextBtn.style.display = 'flex';
                
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 6 - OPERATION THEATRE COMPLEX
    // ========================================
    function initChapter6Page() {
        const contentOrder = ['intro', 'planning', 'layout-considerations', 'design-elements', 'preferred-practices', 'resources'];
        
        const contentLinkMap = {
            'intro': '.parent-link[data-content="intro"]',
            'planning': '.parent-link[data-content="planning"]',
            'layout-considerations': '.parent-link[data-content="layout-considerations"]',
            'design-elements': '.parent-link[data-content="design-elements"]',
            'preferred-practices': '.parent-link[data-content="preferred-practices"]',
            'resources': '.parent-link[data-content="resources"]'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter6ContentSwitching();
        initChapter6NavigationButtons();
        
        updateChapter6Breadcrumb(contentOrder[currentContentIndex]);
        showChapter6Content(contentOrder[currentContentIndex]);
        
        const firstLink = document.querySelector('.parent-link[data-content="intro"]');
        if (firstLink) firstLink.classList.add('active');

        function updateChapter6Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const sectionTitles = {
                'planning': 'B. Planning for an operation theatre complex',
                'layout-considerations': 'C. Key layout design considerations (1-3)',
                'design-elements': 'C. Key layout design considerations (4-6)',
                'preferred-practices': 'D. OT complex layout design: Preferred practices',
                'resources': 'List of resources'
            };

            // Always show Home
            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            // Always show Chapter title
            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '6b. Operation theatre complex – Design considerations and guidelines';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '6b. Operation theatre complex – Design considerations and guidelines';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter6Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            // ALWAYS show all main sections
            const sections = [
                { id: 'planning', title: sectionTitles['planning'] },
                { id: 'layout-considerations', title: sectionTitles['layout-considerations'] },
                { id: 'design-elements', title: sectionTitles['design-elements'] },
                { id: 'preferred-practices', title: sectionTitles['preferred-practices'] },
                { id: 'resources', title: sectionTitles['resources'] }
            ];

            sections.forEach((section) => {
                const sep = document.createElement('span');
                sep.className = 'breadcrumb-dot';
                sep.textContent = '•';
                breadcrumbNav.appendChild(sep);

                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';
                
                if (section.id === activeContentId) {
                    const sectionSpan = document.createElement('span');
                    sectionSpan.className = 'breadcrumb-link breadcrumb-secondary active';
                    sectionSpan.textContent = section.title;
                    sectionItem.appendChild(sectionSpan);
                } else {
                    const sectionLink = document.createElement('a');
                    sectionLink.href = '#';
                    sectionLink.className = 'breadcrumb-link breadcrumb-secondary';
                    sectionLink.textContent = section.title;
                    sectionLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter6Content(section.id);
                    });
                    sectionItem.appendChild(sectionLink);
                }
                
                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function showChapter6Content(contentId) {
            document.querySelectorAll('.content-block').forEach(block => {
                block.style.display = 'none';
            });
            
            const contentBlock = document.getElementById('content-' + contentId);
            if (contentBlock) {
                contentBlock.style.display = 'block';
            }
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            const activeLinkSelector = contentLinkMap[contentId];
            if (activeLinkSelector) {
                const activeLink = document.querySelector(activeLinkSelector);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
            
            currentContentIndex = contentOrder.indexOf(contentId);
            updateChapter6Breadcrumb(contentId);
            updateChapter6NavigationButtons();
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function initChapter6ContentSwitching() {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    const contentId = this.getAttribute('data-content');
                    if (contentId) {
                        showChapter6Content(contentId);
                    }
                });
            });
        }

        function initChapter6NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter6a.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter6Content(contentId);
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter6c.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter6Content(contentId);
                    }
                });
            }
            
            updateChapter6NavigationButtons();
        }

        function updateChapter6NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn && nextBtn) {
                prevBtn.style.display = 'flex';
                
                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
                
                nextBtn.style.display = 'flex';
                
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 7 - AMBULATORY AND INPATIENT CARE
    // ========================================
    function initChapter7Page() {
        const contentOrder = ['intro', 'design-considerations', 'safety-considerations', 'resources'];
        
        const contentLinkMap = {
            'intro': '.parent-link[data-content="intro"]',
            'design-considerations': '.parent-link[data-content="design-considerations"]',
            'safety-considerations': '.parent-link[data-content="safety-considerations"]',
            'resources': '.parent-link[data-content="resources"]'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter7ContentSwitching();
        initChapter7NavigationButtons();
        
        updateChapter7Breadcrumb(contentOrder[currentContentIndex]);
        showChapter7Content(contentOrder[currentContentIndex]);
        
        const firstLink = document.querySelector('.parent-link[data-content="intro"]');
        if (firstLink) firstLink.classList.add('active');

        function updateChapter7Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const sectionTitles = {
                'design-considerations': 'A. Ambulatory/Inpatient care unit: design considerations',
                'safety-considerations': 'B. Key considerations to ensure the safe stay of patients',
                'resources': 'List of Resources'
            };

            // Always show Home
            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            // Always show Chapter title
            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            
            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '6c. Ambulatory and inpatient care – design considerations';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '6c. Ambulatory and inpatient care – design considerations';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter7Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            // ALWAYS show all main sections (A, B and Resources) and highlight active
            const sections = [
                { id: 'design-considerations', title: sectionTitles['design-considerations'] },
                { id: 'safety-considerations', title: sectionTitles['safety-considerations'] },
                { id: 'resources', title: sectionTitles['resources'] }
            ];

            sections.forEach((section) => {
                const sep = document.createElement('span');
                sep.className = 'breadcrumb-dot';
                sep.textContent = '•';
                breadcrumbNav.appendChild(sep);

                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';

                if (section.id === activeContentId) {
                    const span = document.createElement('span');
                    span.className = 'breadcrumb-link breadcrumb-secondary active';
                    span.textContent = section.title;
                    sectionItem.appendChild(span);
                } else {
                    const link = document.createElement('a');
                    link.href = '#';
                    link.className = 'breadcrumb-link breadcrumb-secondary';
                    link.textContent = section.title;
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter7Content(section.id);
                    });
                    sectionItem.appendChild(link);
                }
                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function showChapter7Content(contentId) {
            document.querySelectorAll('.content-block').forEach(block => {
                block.style.display = 'none';
            });

            const activeContent = document.getElementById(`content-${contentId}`);
            if (activeContent) {
                activeContent.style.display = 'block';
            }

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            const linkSelector = contentLinkMap[contentId];
            if (linkSelector) {
                const activeLink = document.querySelector(linkSelector);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
            
            currentContentIndex = contentOrder.indexOf(contentId);
            updateChapter7Breadcrumb(contentId);
            updateChapter7NavigationButtons();
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function initChapter7ContentSwitching() {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    const contentId = this.getAttribute('data-content');
                    if (contentId) {
                        showChapter7Content(contentId);
                    }
                });
            });
        }

        function initChapter7NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter6b.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter7Content(contentId);
                    }
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter7.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter7Content(contentId);
                    }
                });
            }
            
            updateChapter7NavigationButtons();
        }

        function updateChapter7NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            if (prevBtn) {
                prevBtn.style.display = 'flex';
                
                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
            }
            
            if (nextBtn) {
                nextBtn.style.display = 'flex';
                
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 8 - LAYOUT GUIDELINES FOR SUPPORT FUNCTIONS (dummy/placeholder)
    // ========================================
    function initChapter8Page() {
        initSidebarToggle();
        initChapter8NavigationButtons();
        updateChapter8Breadcrumb();

        function updateChapter8Breadcrumb() {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            const chapterSpan = document.createElement('span');
            chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
            chapterSpan.textContent = '9. Layout guidelines for support functions';
            chapterItem.appendChild(chapterSpan);
            breadcrumbNav.appendChild(chapterItem);
        }

        function initChapter8NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (prevBtn) {
                prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                prevBtn.addEventListener('click', function() {
                    window.location.href = 'chapter8.html';
                });
            }

            // Chapter 9 is the last chapter - no Next button.
            if (nextBtn) {
                nextBtn.style.display = 'none';
            }

            const homeBtn = document.getElementById('homeBtn');
            if (homeBtn) {
                homeBtn.addEventListener('click', function() {
                    window.location.href = 'index.html';
                });
            }
        }
    }

    // ========================================
    // CHAPTER 9 - PATIENT AND STAFF SAFETY CONSIDERATIONS (dummy/placeholder)
    // ========================================
    function initChapter9Page() {
        const contentOrder = ['intro', 'safety-building-design', 'safety-routine-work', 'good-building-design', 'references', 'resources'];

        const contentLinkMap = {
            'intro': '.parent-link[data-content="intro"]',
            'safety-building-design': '.parent-link[data-content="safety-building-design"]',
            'safety-routine-work': '.parent-link[data-content="safety-routine-work"]',
            'good-building-design': '.parent-link[data-content="good-building-design"]',
            'references': '.parent-link[data-content="references"]',
            'resources': '.parent-link[data-content="resources"]'
        };

        const sectionTitles = {
            'intro': 'A. Introduction',
            'safety-building-design': 'B. Safety considerations in building design',
            'safety-routine-work': 'C. Safety considerations in routine work',
            'good-building-design': 'D. Good building design',
            'references': 'E. References',
            'resources': 'F. List of resources'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter9ContentSwitching();
        initChapter9NavigationButtons();

        updateChapter9Breadcrumb(contentOrder[currentContentIndex]);
        showChapter9Content(contentOrder[currentContentIndex]);

        const firstLink = document.querySelector('.parent-link[data-content="intro"]');
        if (firstLink) firstLink.classList.add('active');

        function updateChapter9Breadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';

            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '7. Patient and staff safety considerations in the layout design of eye hospitals';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '7. Patient and staff safety considerations in the layout design of eye hospitals';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter9Content('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            const subsections = [
                { id: 'safety-building-design', title: sectionTitles['safety-building-design'] },
                { id: 'safety-routine-work',     title: sectionTitles['safety-routine-work'] },
                { id: 'good-building-design',    title: sectionTitles['good-building-design'] },
                { id: 'references',              title: sectionTitles['references'] },
                { id: 'resources',               title: sectionTitles['resources'] }
            ];

            subsections.forEach((section) => {
                const sep = document.createElement('span');
                sep.className = 'breadcrumb-dot';
                sep.textContent = '•';
                breadcrumbNav.appendChild(sep);

                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';

                if (section.id === activeContentId) {
                    const sectionSpan = document.createElement('span');
                    sectionSpan.className = 'breadcrumb-link breadcrumb-secondary active';
                    sectionSpan.textContent = section.title;
                    sectionItem.appendChild(sectionSpan);
                } else {
                    const sectionLink = document.createElement('a');
                    sectionLink.href = '#';
                    sectionLink.className = 'breadcrumb-link breadcrumb-secondary';
                    sectionLink.textContent = section.title;
                    sectionLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter9Content(section.id);
                    });
                    sectionItem.appendChild(sectionLink);
                }

                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function showChapter9Content(contentId) {
            document.querySelectorAll('.content-block').forEach(block => {
                block.style.display = 'none';
            });

            const contentBlock = document.getElementById('content-' + contentId);
            if (contentBlock) {
                contentBlock.style.display = 'block';
            }

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            const activeLinkSelector = contentLinkMap[contentId];
            if (activeLinkSelector) {
                const activeLink = document.querySelector(activeLinkSelector);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }

            currentContentIndex = contentOrder.indexOf(contentId);
            updateChapter9Breadcrumb(contentId);
            updateChapter9NavigationButtons();

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function initChapter9ContentSwitching() {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    const contentId = this.getAttribute('data-content');
                    if (contentId) {
                        showChapter9Content(contentId);
                    }
                });
            });
        }

        function initChapter9NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter6c.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter9Content(contentId);
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter8.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter9Content(contentId);
                    }
                });
            }

            updateChapter9NavigationButtons();
        }

        function updateChapter9NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (nextBtn) {
                nextBtn.style.display = 'flex';
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }

            if (prevBtn) {
                prevBtn.style.display = 'flex';

                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 8 - CHAMPIONING RESPONSIBLE HEALTHCARE (ENERGY EFFICIENCY)
    // ========================================
    function initChapter8EnergyPage() {
        const contentOrder = ['intro', 'procurement', 'design', 'equipment', 'operations', 'culture'];

        const contentLinkMap = {
            'intro': '.parent-link[data-content="intro"]',
            'procurement': '.parent-link[data-content="procurement"]',
            'design': '.parent-link[data-content="design"]',
            'equipment': '.parent-link[data-content="equipment"]',
            'operations': '.parent-link[data-content="operations"]',
            'culture': '.parent-link[data-content="culture"]'
        };

        const sectionTitles = {
            'intro': 'Introduction',
            'procurement': '1. Procurement',
            'design': '2. Design',
            'equipment': '3. Equipment',
            'operations': '4. Operations and Maintenance',
            'culture': '5. Fostering a Culture of Sustainable Practices'
        };

        let currentContentIndex = 0;

        initSidebarToggle();
        initChapter8EnergyContentSwitching();
        initChapter8EnergyNavigationButtons();

        updateChapter8EnergyBreadcrumb(contentOrder[currentContentIndex]);
        showChapter8EnergyContent(contentOrder[currentContentIndex]);

        const firstLink = document.querySelector('.parent-link[data-content="intro"]');
        if (firstLink) firstLink.classList.add('active');

        function updateChapter8EnergyBreadcrumb(activeContentId) {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';

            if (activeContentId === 'intro') {
                const chapterSpan = document.createElement('span');
                chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
                chapterSpan.textContent = '8. Championing Responsible Healthcare by Creating Energy Efficient Sustainable Hospital Infrastructure';
                chapterItem.appendChild(chapterSpan);
            } else {
                const chapterLink = document.createElement('a');
                chapterLink.href = '#';
                chapterLink.className = 'breadcrumb-link breadcrumb-primary';
                chapterLink.textContent = '8. Championing Responsible Healthcare by Creating Energy Efficient Sustainable Hospital Infrastructure';
                chapterLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    showChapter8EnergyContent('intro');
                });
                chapterItem.appendChild(chapterLink);
            }
            breadcrumbNav.appendChild(chapterItem);

            const subsections = [
                { id: 'procurement', title: sectionTitles['procurement'] },
                { id: 'design',      title: sectionTitles['design'] },
                { id: 'equipment',   title: sectionTitles['equipment'] },
                { id: 'operations',  title: sectionTitles['operations'] },
                { id: 'culture',     title: sectionTitles['culture'] }
            ];

            subsections.forEach((section) => {
                const sep = document.createElement('span');
                sep.className = 'breadcrumb-dot';
                sep.textContent = '•';
                breadcrumbNav.appendChild(sep);

                const sectionItem = document.createElement('div');
                sectionItem.className = 'breadcrumb-item';

                if (section.id === activeContentId) {
                    const sectionSpan = document.createElement('span');
                    sectionSpan.className = 'breadcrumb-link breadcrumb-secondary active';
                    sectionSpan.textContent = section.title;
                    sectionItem.appendChild(sectionSpan);
                } else {
                    const sectionLink = document.createElement('a');
                    sectionLink.href = '#';
                    sectionLink.className = 'breadcrumb-link breadcrumb-secondary';
                    sectionLink.textContent = section.title;
                    sectionLink.addEventListener('click', function(e) {
                        e.preventDefault();
                        showChapter8EnergyContent(section.id);
                    });
                    sectionItem.appendChild(sectionLink);
                }

                breadcrumbNav.appendChild(sectionItem);
            });
        }

        function showChapter8EnergyContent(contentId) {
            document.querySelectorAll('.content-block').forEach(block => {
                block.style.display = 'none';
            });

            const contentBlock = document.getElementById('content-' + contentId);
            if (contentBlock) {
                contentBlock.style.display = 'block';
            }

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            const activeLinkSelector = contentLinkMap[contentId];
            if (activeLinkSelector) {
                const activeLink = document.querySelector(activeLinkSelector);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }

            currentContentIndex = contentOrder.indexOf(contentId);
            updateChapter8EnergyBreadcrumb(contentId);
            updateChapter8EnergyNavigationButtons();

            if (window.setMobileFloatActive) window.setMobileFloatActive(contentId);

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function initChapter8EnergyContentSwitching() {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function() {
                    const contentId = this.getAttribute('data-content');
                    if (contentId) {
                        showChapter8EnergyContent(contentId);
                    }
                });
            });
        }

        function initChapter8EnergyNavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    if (currentContentIndex === 0) {
                        window.location.href = 'chapter7.html';
                    } else {
                        const newIndex = currentContentIndex - 1;
                        const contentId = contentOrder[newIndex];
                        showChapter8EnergyContent(contentId);
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    if (currentContentIndex === contentOrder.length - 1) {
                        window.location.href = 'chapter9.html';
                    } else {
                        const newIndex = currentContentIndex + 1;
                        const contentId = contentOrder[newIndex];
                        showChapter8EnergyContent(contentId);
                    }
                });
            }

            updateChapter8EnergyNavigationButtons();
        }

        function updateChapter8EnergyNavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (nextBtn) {
                nextBtn.style.display = 'flex';
                if (currentContentIndex === contentOrder.length - 1) {
                    nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                } else {
                    nextBtn.innerHTML = '<span>Next</span><i class="fas fa-chevron-right"></i>';
                }
            }

            if (prevBtn) {
                prevBtn.style.display = 'flex';

                if (currentContentIndex === 0) {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                } else {
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous</span>';
                }
            }
        }
    }

    // ========================================
    // CHAPTER 8 (PLACEHOLDER) - RESERVED SECTION (dummy/placeholder, heading TBD) — no longer used, kept for safety
    // ========================================
    function initChapterPlaceholder8Page() {
        initSidebarToggle();
        initChapterPlaceholder8NavigationButtons();
        updateChapterPlaceholder8Breadcrumb();

        function updateChapterPlaceholder8Breadcrumb() {
            const breadcrumbNav = document.getElementById('breadcrumbNav');
            if (!breadcrumbNav) return;

            breadcrumbNav.innerHTML = '';

            const homeItem = document.createElement('div');
            homeItem.className = 'breadcrumb-item';
            const homeLink = document.createElement('a');
            homeLink.href = 'index.html';
            homeLink.className = 'breadcrumb-link breadcrumb-primary';
            homeLink.innerHTML = '<i class="fas fa-home"></i> Home';
            homeItem.appendChild(homeLink);
            breadcrumbNav.appendChild(homeItem);

            const separator1 = document.createElement('span');
            separator1.className = 'breadcrumb-dot';
            separator1.textContent = '•';
            breadcrumbNav.appendChild(separator1);

            const chapterItem = document.createElement('div');
            chapterItem.className = 'breadcrumb-item';
            const chapterSpan = document.createElement('span');
            chapterSpan.className = 'breadcrumb-link breadcrumb-primary active';
            chapterSpan.textContent = '8. Reserved section (heading to be confirmed)';
            chapterItem.appendChild(chapterSpan);
            breadcrumbNav.appendChild(chapterItem);
        }

        function initChapterPlaceholder8NavigationButtons() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            if (prevBtn) {
                prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span>Previous Chapter</span>';
                prevBtn.addEventListener('click', function() {
                    window.location.href = 'chapter7.html';
                });
            }

            if (nextBtn) {
                nextBtn.innerHTML = '<span>Next Chapter</span><i class="fas fa-chevron-right"></i>';
                nextBtn.addEventListener('click', function() {
                    window.location.href = 'chapter9.html';
                });
            }
        }
    }

    function initSidebarToggle() {
        const sidebarToggleBtn = document.getElementById('sidebarToggle');
        const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
        const sidebar = document.getElementById('chapterSidebar');
        const chapterContainer = document.querySelector('.chapter-container');
        const chapterLogo = document.querySelector('.chapter-logo-container');
        
        function toggleSidebar(open) {
            if (sidebar) sidebar.classList.toggle('sidebar-open', open);
            if (chapterContainer) chapterContainer.classList.toggle('sidebar-visible', open);
            // Hide logo when sidebar is open
            if (chapterLogo) chapterLogo.classList.toggle('logo-hidden', open);
            // Directly hide/show the toggle button
            if (sidebarToggleBtn) sidebarToggleBtn.style.display = open ? 'none' : 'flex';
        }

        // Expose globally so nav-item clicks across all chapters can also close cleanly
        window.closeSidebar = function() { toggleSidebar(false); };

        if (sidebarToggleBtn && sidebar) {
            sidebarToggleBtn.addEventListener('click', function() {
                toggleSidebar(true);
            });
        }
        
        if (sidebarCloseBtn) {
            sidebarCloseBtn.addEventListener('click', function() {
                toggleSidebar(false);
            });
        }
        
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 992 && sidebar && sidebar.classList.contains('sidebar-open') && 
                !sidebar.contains(e.target) && !sidebarToggleBtn.contains(e.target)) {
                toggleSidebar(false);
            }
        });
    }

    function openViewModal(html, caption) {
        const modal = document.getElementById('viewModal');
        const body = document.getElementById('modalBody');
        const cap = document.getElementById('modalCaption');
        if (!modal || !body || !cap) return;
        cap.textContent = caption || '';
        body.innerHTML = html || '<p>Preview not available.</p>';
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeViewModal() {
        const modal = document.getElementById('viewModal');
        const body = document.getElementById('modalBody');
        if (!modal) return;
        modal.style.display = 'none';
        if (body) body.innerHTML = '';
        document.body.style.overflow = 'auto';
    }

    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Only intercept clicks intended for in-page content previews (elements with data-content-id)
            const id = this.getAttribute('data-content-id');
            if (!id) return; // allow default behavior (anchor download/open or inline openFileViewer)

            e.preventDefault();
            const caption = this.getAttribute('data-caption') || '';
            const contentEl = document.getElementById('content-' + id);
            let preview = '';
            if (contentEl) {
                const firstPara = contentEl.querySelector('p');
                const heading = contentEl.querySelector('.article-title');
                preview += heading ? '<h2>' + heading.textContent + '</h2>' : '';
                preview += firstPara ? firstPara.outerHTML : '';
            } else {
                preview = '<p>Preview not available.</p>';
            }
            openViewModal(preview, caption);
        });
    });

    const viewModalClose = document.getElementById('viewModalClose');
    if (viewModalClose) viewModalClose.addEventListener('click', closeViewModal);
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'viewModal') closeViewModal();
    });
});

function openImageModal(src, caption) {
    var modal = document.getElementById('imageModal');
    var modalImg = document.getElementById('modalImage');
    var captionText = document.getElementById('modalCaption');
    
    if (modal && modalImg && captionText) {
        modal.style.display = "block";
        modalImg.src = src;
        captionText.innerHTML = caption;
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    var modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeImageModal();
        closeFileViewer();
    }
});


// ============================================
// FILE VIEWER AND DOWNLOAD FUNCTIONS
// ============================================

/**
 * Force download of any file - works on desktop, mobile, and tablets
 */
function forceDownload(filePath) {
    if (!filePath) {
        console.error('No file path provided for download');
        return;
    }
    
    // Normalize the path
    const normalizedPath = String(filePath).replace(/\\/g, '/');
    const fileName = normalizedPath.split('/').pop() || 'download';
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = normalizedPath;
    link.download = fileName; // This forces download instead of opening
    link.style.display = 'none';
    
    // Add to DOM, click, and remove
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(link);
    }, 100);
    
    console.log('Download initiated for:', fileName);
}

/**
 * openFileViewer – opens any file in the modal viewer on the SAME page.
 * Supports: PDF (iframe), MP4/WEBM/MOV (video player),
 *           XLSX/PPTX/DOCX (Microsoft Office Online viewer - works for publicly hosted files,
 *           falls back to download prompt for local/intranet files).
 *
 * IMPORTANT: saves which content-block is currently visible so closeFileViewer()
 * can restore it exactly (user returns to the same section + scroll position).
 */
function openFileViewer(filePath, fileType) {
    if (!filePath) {
        alert('Unable to open file: No file path specified');
        return;
    }

    // ── Save current visible section so we can restore on close ──
    // First try: block with display:block explicitly set
    let visibleBlock = null;
    document.querySelectorAll('.content-block').forEach(function(el) {
        if (el.style.display === 'block') visibleBlock = el;
    });
    // Second try: any block not hidden
    if (!visibleBlock) {
        document.querySelectorAll('.content-block').forEach(function(el) {
            if (el.style.display !== 'none') visibleBlock = el;
        });
    }
    window._savedSection = null;
    if (visibleBlock && visibleBlock.id) {
        window._savedSection = {
            id:     visibleBlock.id,
            scroll: window.scrollY || window.pageYOffset
        };
    }

    // ── Normalize path & detect type ──
    const normalizedPath = String(filePath).replace(/\\/g, '/');
    const ext = normalizedPath.split('.').pop().toLowerCase();
    const lowerType = (fileType || ext).toLowerCase().replace('.', '');
    const fileName   = normalizedPath.split('/').pop();

    // ── Get modal elements ──
    const modal    = document.getElementById('fileViewerModal');
    const frame    = document.getElementById('fileViewerFrame');
    const errorDiv = document.getElementById('fileViewerError');
    const titleEl  = document.getElementById('fileViewerTitle');

    if (!modal) {
        window.open(normalizedPath, '_blank');
        return;
    }

    if (titleEl) titleEl.textContent = fileName || 'File Viewer';

    // Reset
    if (frame)    { frame.style.display = 'none'; frame.src = 'about:blank'; }
    if (errorDiv) { errorDiv.style.display = 'none'; errorDiv.innerHTML = ''; }

    // ── Route by file type ──
    if (lowerType === 'pdf') {
        // PDF: open in new browser tab — full native viewer (zoom, rotate, landscape all work perfectly)
        // _savedSection is already set above so the page position is remembered.
        // We clear it immediately because the page never navigates away — user just switches tab.
        window._savedSection = null;
        window.open(normalizedPath, '_blank');
        return;

    } else if (lowerType === 'mp4' || lowerType === 'webm' || lowerType === 'mov') {
        // Video: native HTML5 player
        if (errorDiv) {
            errorDiv.style.cssText = 'display:block;width:100%;background:#000;text-align:center;padding:0;';
            errorDiv.innerHTML =
                '<video controls autoplay ' +
                '  style="width:100%;max-height:70vh;outline:none;display:block;margin:0 auto;">' +
                '  <source src="' + normalizedPath + '" type="video/' + (lowerType === 'mov' ? 'mp4' : lowerType) + '">' +
                '  Your browser does not support video playback.' +
                '</video>';
        }

    } else if (['xlsx','xls','pptx','ppt','docx','doc'].includes(lowerType)) {
        // Office files: Microsoft Office Online viewer
        // NOTE: This only works when the site is publicly accessible on the internet.
        // For local/intranet servers it will fail — we show a clear message + download button.
        const officeUrl = 'https://view.officeapps.live.com/op/embed.aspx?src=' +
            encodeURIComponent(window.location.origin + '/' + normalizedPath);

        if (frame) {
            frame.style.cssText = 'width:100%;height:70vh;border:none;display:block;';
            frame.src = officeUrl;

            // If Office Online can't reach the file (local server) it shows an error page.
            // We detect load failure and fall back to a download prompt.
            frame.onload = function () {
                try {
                    // If we can read the frame doc title and it contains "error", show fallback
                    // (cross-origin will throw — that means it loaded an external page = OK or failed silently)
                } catch(e) { /* cross-origin — normal */ }
            };
            frame.onerror = function () { showOfficeFallback(normalizedPath, lowerType, errorDiv, frame); };
        }

        // Also show a small note below the viewer so users know they can download
        // We do this inside a timeout so the iframe gets a chance to load first
        window._officeViewerTimer = setTimeout(function () {
            // Only show fallback if frame still shows an error (heuristic: check if modal is still open)
            if (modal.style.display === 'block') {
                // We can't detect Google/MS error reliably cross-origin, so just show
                // a download bar at the bottom for convenience
                if (errorDiv && errorDiv.style.display === 'none') {
                    errorDiv.style.cssText = 'display:block;text-align:center;padding:10px;background:#fff8e1;border-top:1px solid #e0c97a;';
                    errorDiv.innerHTML =
                        '<small style="color:#555;">If the preview does not load (local server), ' +
                        'please download the file.</small>&nbsp;&nbsp;' +
                        '<button onclick="downloadFile(\'' + normalizedPath.replace(/'/g,"\\'") + '\')" ' +
                        '  style="padding:6px 14px;background:#c9a961;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:0.85rem;">' +
                        '  <i class="fas fa-download"></i> Download</button>';
                }
            }
        }, 3500);

    } else if (['jpg','jpeg','png','gif','webp'].includes(lowerType)) {
        if (errorDiv) {
            errorDiv.style.cssText = 'display:block;width:100%;text-align:center;background:#000;padding:0;';
            errorDiv.innerHTML =
                '<img src="' + normalizedPath + '" alt="' + fileName +
                '" style="max-width:100%;max-height:70vh;object-fit:contain;">';
        }

    } else {
        // Unknown – prompt download
        if (errorDiv) {
            errorDiv.style.cssText = 'display:block;text-align:center;padding:40px;';
            errorDiv.innerHTML =
                '<p style="color:#666;margin-bottom:20px;">Preview is not available for this file type (' + lowerType + ').</p>' +
                '<button onclick="downloadFile(\'' + normalizedPath.replace(/'/g,"\\'") + '\')" ' +
                '  style="padding:12px 24px;background:#c9a961;color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:1rem;">' +
                '  <i class="fas fa-download"></i> Download File</button>';
        }
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showOfficeFallback(path, type, errorDiv, frame) {
    if (frame) { frame.style.display = 'none'; }
    if (errorDiv) {
        errorDiv.style.cssText = 'display:block;text-align:center;padding:40px;';
        errorDiv.innerHTML =
            '<p style="color:#666;margin-bottom:8px;">This file cannot be previewed here because ' +
            'the server is not publicly accessible on the internet.</p>' +
            '<p style="color:#999;margin-bottom:24px;font-size:0.9rem;">Please download the file to view it on your device.</p>' +
            '<button onclick="downloadFile(\'' + path.replace(/'/g,"\\'") + '\')" ' +
            '  style="padding:12px 24px;background:#c9a961;color:#fff;border:none;border-radius:5px;cursor:pointer;font-size:1rem;">' +
            '  <i class="fas fa-download"></i> Download File</button>';
    }
}

/**
 * closeFileViewer – hides the modal and restores the user to
 * the exact same content section and scroll position they were on.
 */
function closeFileViewer() {
    const modal    = document.getElementById('fileViewerModal');
    const frame    = document.getElementById('fileViewerFrame');
    const errorDiv = document.getElementById('fileViewerError');

    if (modal)    { modal.style.display = 'none'; }
    if (frame)    { frame.src = 'about:blank'; frame.style.display = 'none'; }
    if (errorDiv) {
        // Stop any playing video
        const video = errorDiv.querySelector('video');
        if (video) { video.pause(); video.src = ''; }
        errorDiv.innerHTML = ''; errorDiv.style.display = 'none';
    }

    // Cancel any pending office-viewer timer
    if (window._officeViewerTimer) {
        clearTimeout(window._officeViewerTimer);
        window._officeViewerTimer = null;
    }

    document.body.style.overflow = 'auto';

    // ── Restore the section the user was on before opening the viewer ──
    if (window._savedSection) {
        var savedId     = window._savedSection.id;
        var savedScroll = window._savedSection.scroll;
        var contentKey  = savedId.replace('content-', '');

        // Step 1: Show/hide blocks directly — do NOT call showChapterXContent()
        // because that function always calls scrollTo(top:0) and would override our saved position
        document.querySelectorAll('.content-block').forEach(function(b) {
            b.style.display = 'none';
        });
        var target = document.getElementById(savedId);
        if (target) { target.style.display = 'block'; }

        // Step 2: Sync sidebar highlight
        document.querySelectorAll('.nav-link, .parent-link, .subsection-link').forEach(function(l) {
            l.classList.remove('active');
        });
        var activeLink = document.querySelector('[data-content="' + contentKey + '"]');
        if (activeLink) activeLink.classList.add('active');

        // Step 3: Rebuild breadcrumb if chapter registered the function
        if (typeof window._chapterUpdateBreadcrumb === 'function') {
            window._chapterUpdateBreadcrumb(contentKey);
        }

        // Step 4: Restore exact scroll — use double rAF so layout has fully repainted
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                window.scrollTo(0, savedScroll);
            });
        });

        window._savedSection = null;
    }
}

/**
 * downloadFile – force-triggers browser download for any file path.
 */
function downloadFile(filePath) {
    if (!filePath) { alert('No file path specified'); return; }
    const path     = String(filePath).replace(/\\/g, '/');
    const fileName = path.split('/').pop() || 'download';
    const link     = document.createElement('a');
    link.href      = path;
    link.download  = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * downloadCurrentFile – used by the in-modal download button (chapter4 modal header).
 */
function downloadCurrentFile() {
    const frame    = document.getElementById('fileViewerFrame');
    const errorDiv = document.getElementById('fileViewerError');
    if (frame && frame.src && frame.src !== 'about:blank' && frame.src !== window.location.href) {
        downloadFile(frame.src);
        return;
    }
    if (errorDiv) {
        const src = errorDiv.querySelector('source');
        if (src) { downloadFile(src.getAttribute('src')); }
    }
}

/* ============================================================
   MOBILE STICKY SECTION TAB BAR
   Builds a tab bar below the breadcrumb on mobile only.
   Hooks into existing showChapterXContent() functions.
   Desktop: completely invisible (CSS display:none at >768px)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* Map each chapter to its sections */
    var CHAPTER_TABS = {
        'chapter1.html': [
            { id: 'intro',       label: 'The Need' },
            { id: 'not-covered', label: 'Not Covered' },
            { id: 'covered',     label: 'Covered' }
        ],
        'chapter2.html': [
            { id: 'intro', label: 'How to Use' }
        ],
        'chapter3.html': [
            { id: 'intro',              label: 'Introduction' },
            { id: 'approval-process',   label: 'Five Stage Process' },
            { id: 'preliminary-design', label: 'Preliminary' },
            { id: 'concept-design',     label: 'Concept Design' },
            { id: 'statutory-approval', label: 'Statutory' },
            { id: 'flowchart',          label: 'Flow Chart' }
        ],
        'chapter4.html': [
            { id: 'intro',                  label: 'Introduction' },
            { id: 'functional-adequacy',    label: 'Functional' },
            { id: 'operational-efficiency', label: 'Operational' },
            { id: 'resources',              label: 'Resources' }
        ],
        'chapter6a.html': [
            { id: 'intro',               label: 'Introduction' },
            { id: 'factors-influencing', label: 'Factors' },
            { id: 'service-levels',      label: 'Service Levels' },
            { id: 'layout-design',       label: 'Layout Design' },
            { id: 'investigation-area',  label: 'Investigation' },
            { id: 'preferred-practices', label: 'Preferred Practices' },
            { id: 'resources',           label: 'Resources' }
        ],
        'chapter6b.html': [
            { id: 'intro',                   label: 'Introduction' },
            { id: 'planning',                label: 'Planning' },
            { id: 'layout-considerations',   label: 'Layout' },
            { id: 'design-elements',         label: 'Design' },
            { id: 'preferred-practices',      label: 'Preferred' },
            { id: 'resources',               label: 'Resources' }
        ],
        'chapter6c.html': [
            { id: 'intro',                   label: 'Introduction' },
            { id: 'design-considerations',   label: 'Design' },
            { id: 'safety-considerations',   label: 'Safety' },
            { id: 'resources',               label: 'Resources' }
        ],
        'chapter7.html': [
            { id: 'intro',                     label: 'Introduction' },
            { id: 'safety-building-design',    label: 'Building Design' },
            { id: 'safety-routine-work',       label: 'Routine Work' },
            { id: 'good-building-design',       label: 'Good Design' },
            { id: 'references',                label: 'References' },
            { id: 'resources',                 label: 'Resources' }
        ]
    };

    /* Show switcher functions exposed per chapter by existing code */
    var SHOW_FN = {
        'chapter1.html': function(id){ triggerNavLink(id); },
        'chapter2.html': function(id){ triggerNavLink(id); },
        'chapter3.html': function(id){ triggerNavLink(id); },
        'chapter4.html': function(id){ triggerNavLink(id); },
        'chapter6a.html': function(id){ triggerNavLink(id); },
        'chapter6b.html': function(id){ triggerNavLink(id); },
        'chapter6c.html': function(id){ triggerNavLink(id); },
        'chapter7.html': function(id){ triggerNavLink(id); }
    };

    /* Trigger the existing sidebar nav-link click to reuse all existing logic */
    function triggerNavLink(contentId) {
        var link = document.querySelector('.nav-link[data-content="' + contentId + '"]');
        if (link) {
            link.click();
        }
    }

    /* Detect current page filename */
    var page = window.location.pathname.split('/').pop() || 'index.html';
    var tabs = CHAPTER_TABS[page];
    if (!tabs || tabs.length <= 1) return; /* no tab bar needed for single-section pages */

    /* Only inject on mobile */
    function isMobile() { return window.innerWidth <= 768; }

    /* Build the tab bar DOM */
    function buildTabBar() {
        if (!isMobile()) return;
        if (document.getElementById('mobileSectionTabs')) return; /* already built */

        var contentHeader = document.querySelector('.content-header');
        if (!contentHeader) return;

        var bar = document.createElement('div');
        bar.id = 'mobileSectionTabs';
        bar.className = 'mobile-section-tabs';

        tabs.forEach(function (tab) {
            var btn = document.createElement('button');
            btn.className = 'mobile-tab-btn';
            btn.setAttribute('data-tab-id', tab.id);
            btn.textContent = tab.label;

            btn.addEventListener('click', function () {
                var fn = SHOW_FN[page];
                if (fn) fn(tab.id);
                setActiveTab(tab.id);
                /* scroll clicked tab into view */
                btn.scrollIntoView({ inline: 'center', behavior: 'smooth' });
            });

            bar.appendChild(btn);
        });

        /* Insert immediately after content-header */
        contentHeader.parentNode.insertBefore(bar, contentHeader.nextSibling);

        /* Mark chapter container so CSS can adjust */
        var container = document.querySelector('.chapter-container');
        if (container) container.classList.add('has-mobile-tabs');

        /* Set initial active tab */
        setActiveTab('intro');
    }

    /* Highlight the active tab */
    function setActiveTab(contentId) {
        var bar = document.getElementById('mobileSectionTabs');
        if (!bar) return;
        bar.querySelectorAll('.mobile-tab-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-tab-id') === contentId);
        });
    }

    /* Expose setActiveTab so existing showChapterXContent() can call it */
    window.setMobileActiveTab = setActiveTab;

    /* Build on load */
    buildTabBar();

    /* Rebuild / remove on resize */
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            var existing = document.getElementById('mobileSectionTabs');
            if (isMobile()) {
                if (!existing) buildTabBar();
            } else {
                if (existing) existing.remove();
                var container = document.querySelector('.chapter-container');
                if (container) container.classList.remove('has-mobile-tabs');
            }
        }, 150);
    });

    /* Keep tab in sync when sidebar nav links are clicked */
    document.querySelectorAll('.nav-link[data-content]').forEach(function (link) {
        link.addEventListener('click', function () {
            var id = this.getAttribute('data-content');
            if (id) setActiveTab(id);
        });
    });

});


/* ============================================================
   MOBILE FLOATING INDEX BUTTON — Idea A
   Gold FAB bottom-right → slides up section panel
   Works for all chapters. Desktop: hidden via CSS.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {

    var SECTIONS = {
        'chapter1.html': [
            { id: 'intro',       name: 'The Need and Scope' },
            { id: 'not-covered', name: 'What is not covered' },
            { id: 'covered',     name: 'What is covered' }
        ],
        'chapter2.html': [
            { id: 'intro', name: 'How to use the manual' }
        ],
        'chapter3.html': [
            { id: 'intro',              name: 'Introduction' },
            { id: 'approval-process',   name: 'Five Stage Process' },
            { id: 'preliminary-design', name: '1. Preliminary Design' },
            { id: 'concept-design',     name: '2. Concept Design' },
            { id: 'statutory-approval', name: '3. Statutory Approval' },
            { id: 'flowchart',          name: 'Flow Chart' }
        ],
        'chapter4.html': [
            { id: 'intro',                  name: 'Introduction' },
            { id: 'functional-adequacy',    name: 'A) Functional Adequacy' },
            { id: 'operational-efficiency', name: 'B) Operational Efficiency' },
            { id: 'resources',              name: 'List of Resources' }
        ],
        'chapter6a.html': [
            { id: 'intro',               name: 'Introduction' },
            { id: 'factors-influencing', name: 'A) Factors Influencing Space' },
            { id: 'service-levels',      name: '1. Service Levels' },
            { id: 'layout-design',       name: '2. Layout Design' },
            { id: 'investigation-area',  name: '3. Investigation Area' },
            { id: 'preferred-practices', name: 'B) Preferred Practices' },
            { id: 'resources',           name: 'List of Resources' }
        ],

        
        'chapter6b.html': [
            { id: 'intro',                   name: 'Introduction' },
            { id: 'planning',                name: 'A) Planning' },
            { id: 'layout-considerations',   name: 'B) Layout Considerations' },
            { id: 'design-elements',         name: 'C) Design Elements' },
            { id: 'preferred-practices',      name: 'D) Preferred Practices' },
            { id: 'resources',               name: 'List of Resources' }
        ],

        'chapter6c.html': [
            { id: 'intro',                  name: 'Introduction' },
            { id: 'design-considerations',  name: 'A) Design Considerations' },
            { id: 'safety-considerations',  name: 'B) Safety Considerations' },
            { id: 'resources',              name: 'List of Resources' }
        ],

        'chapter7.html': [
            { id: 'intro',                    name: 'A) Introduction' },
            { id: 'safety-building-design',   name: 'B) Safety in Building Design' },
            { id: 'safety-routine-work',      name: 'C) Safety in Routine Work' },
            { id: 'good-building-design',     name: 'D) Good Building Design' },
            { id: 'references',               name: 'E) References' },
            { id: 'resources',                name: 'F) List of Resources' }
        ],

        'chapter8.html': [
            { id: 'intro',         name: 'Introduction' },
            { id: 'procurement',   name: '1) Procurement' },
            { id: 'design',        name: '2) Design' },
            { id: 'equipment',     name: '3) Equipment' },
            { id: 'operations',    name: '4) Operations and Maintenance' },
            { id: 'culture',       name: '5) Fostering a Culture of Sustainable Practices' }
        ]
    };

    var page = window.location.pathname.split('/').pop() || '';
    var sections = SECTIONS[page];

    /* Skip if no sections or only 1 section */
    if (!sections || sections.length <= 1) return;

    var activeId = 'intro';

    /* ---- Build DOM ---- */
    /* Overlay */
    var overlay = document.createElement('div');
    overlay.className = 'mob-panel-overlay';
    overlay.addEventListener('click', closePanel);

    /* Panel */
    var panel = document.createElement('div');
    panel.className = 'mob-section-panel';

    var handle = document.createElement('div');
    handle.className = 'mob-panel-handle';

    var panelTitle = document.createElement('div');
    panelTitle.className = 'mob-panel-title';
    panelTitle.textContent = 'Chapter Sections';

    panel.appendChild(handle);
    panel.appendChild(panelTitle);

    /* Section rows */
    sections.forEach(function (sec) {
        var row = document.createElement('div');
        row.className = 'mob-panel-item';
        row.setAttribute('data-id', sec.id);

        var dot = document.createElement('div');
        dot.className = 'mob-panel-dot' + (sec.id === activeId ? ' active' : '');

        var name = document.createElement('div');
        name.className = 'mob-panel-name' + (sec.id === activeId ? ' active' : '');
        name.textContent = sec.name;

        var arrow = document.createElement('div');
        arrow.className = 'mob-panel-arrow';
        arrow.textContent = '›';

        row.appendChild(dot);
        row.appendChild(name);
        row.appendChild(arrow);

        row.addEventListener('click', function () {
            var id = this.getAttribute('data-id');
            /* Trigger existing sidebar nav link */
            var link = document.querySelector('.nav-link[data-content="' + id + '"]');
            if (link) link.click();
            setActive(id);
            closePanel();
        });

        panel.appendChild(row);
    });

    /* Tooltip label */
    var label = document.createElement('div');
    label.className = 'mob-float-label';
    label.textContent = 'Sections';

    /* Float button */
    var fab = document.createElement('button');
    fab.className = 'mob-float-btn';
    fab.setAttribute('aria-label', 'Open section navigation');
    for (var i = 0; i < 3; i++) {
        var line = document.createElement('span');
        fab.appendChild(line);
    }

    fab.addEventListener('click', function () {
        if (panel.classList.contains('show')) {
            closePanel();
        } else {
            openPanel();
        }
    });

    /* Hide tooltip after 3 seconds */
    setTimeout(function () { label.classList.add('hide'); }, 3000);

    document.body.appendChild(overlay);
    document.body.appendChild(panel);
    document.body.appendChild(label);
    document.body.appendChild(fab);

    /* ---- Open / Close ---- */
    function openPanel() {
        panel.classList.add('show');
        overlay.classList.add('show');
        fab.classList.add('panel-open');
        label.classList.add('hide');
        document.body.style.overflow = 'hidden';
    }

    function closePanel() {
        panel.classList.remove('show');
        overlay.classList.remove('show');
        fab.classList.remove('panel-open');
        document.body.style.overflow = '';
    }

    /* ---- Highlight active section ---- */
    function setActive(id) {
        activeId = id;
        panel.querySelectorAll('.mob-panel-item').forEach(function (row) {
            var rid = row.getAttribute('data-id');
            row.querySelector('.mob-panel-dot').classList.toggle('active', rid === id);
            row.querySelector('.mob-panel-name').classList.toggle('active', rid === id);
        });
    }

    /* Sync when sidebar nav links clicked (desktop or programmatic) */
    document.querySelectorAll('.nav-link[data-content]').forEach(function (link) {
        link.addEventListener('click', function () {
            var id = this.getAttribute('data-content');
            if (id) setActive(id);
        });
    });

    /* Expose for next/prev button sync */
    window.setMobileFloatActive = setActive;

});


/* ============================================================
   BREADCRUMB MOBILE CLEANUP
   Hide secondary section breadcrumb items on mobile
   (JS fallback for browsers without :has() support)
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
    function cleanBreadcrumbMobile() {
        if (window.innerWidth > 768) return;
        var breadcrumb = document.getElementById('breadcrumbNav');
        if (!breadcrumb) return;

        /* Hide any breadcrumb-item that contains a secondary link */
        breadcrumb.querySelectorAll('.breadcrumb-item').forEach(function (item) {
            if (item.querySelector('.breadcrumb-secondary')) {
                item.style.display = 'none';
            }
        });

        /* Hide extra dot separators — keep only the first */
        var dots = breadcrumb.querySelectorAll('.breadcrumb-dot');
        dots.forEach(function (dot, i) {
            if (i > 0) dot.style.display = 'none';
        });
    }

    /* Run on load */
    cleanBreadcrumbMobile();

    /* Re-run whenever content switches (breadcrumb gets rebuilt by JS) */
    var observer = new MutationObserver(function () {
        cleanBreadcrumbMobile();
    });
    var bc = document.getElementById('breadcrumbNav');
    if (bc) observer.observe(bc, { childList: true, subtree: true });

    /* Re-run on resize */
    window.addEventListener('resize', cleanBreadcrumbMobile);
});