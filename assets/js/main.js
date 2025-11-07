// 移动端菜单切换
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // 切换图标
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // 点击移动端导航链接后关闭菜单
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// 回到顶部按钮
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fa fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);
    
    // 显示/隐藏回到顶部按钮
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // 点击回到顶部
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 图片查看器功能
function initImageViewer() {
    // 创建图片查看器元素
    const viewer = document.createElement('div');
    viewer.className = 'image-viewer';
    viewer.innerHTML = `
        <button class="absolute top-6 left-6 text-white text-3xl" id="viewer-close"><i class="fa fa-times"></i></button>
        <button class="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-4xl" id="viewer-prev"><i class="fa fa-chevron-left"></i></button>
        <img id="viewer-img" src="" alt="">
        <button class="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-4xl" id="viewer-next"><i class="fa fa-chevron-right"></i></button>
    `;
    document.body.appendChild(viewer);
    
    const viewerClose = document.getElementById('viewer-close');
    const viewerPrev = document.getElementById('viewer-prev');
    const viewerNext = document.getElementById('viewer-next');
    const viewerImg = document.getElementById('viewer-img');
    
    let currentImages = [];
    let currentIndex = 0;
    
    // 点击图片打开查看器
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG' && !e.target.closest('.image-viewer') && !e.target.closest('nav')) {
            const img = e.target;
            const parent = img.closest('section, div');
            
            // 获取当前页面或区域的所有图片
            currentImages = Array.from(parent.querySelectorAll('img')).filter(i => !i.closest('nav'));
            currentIndex = currentImages.indexOf(img);
            
            if (currentIndex !== -1) {
                viewerImg.src = currentImages[currentIndex].src;
                viewer.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        }
    });
    
    // 关闭查看器
    viewerClose.addEventListener('click', () => {
        viewer.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // 点击空白区域关闭
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) {
            viewer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // 上一张图片
    viewerPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        viewerImg.src = currentImages[currentIndex].src;
    });
    
    // 下一张图片
    viewerNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        viewerImg.src = currentImages[currentIndex].src;
    });
    
    // 键盘导航
    document.addEventListener('keydown', (e) => {
        if (viewer.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
                viewerImg.src = currentImages[currentIndex].src;
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % currentImages.length;
                viewerImg.src = currentImages[currentIndex].src;
            } else if (e.key === 'Escape') {
                viewer.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// 图片懒加载
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // 获取data-img-path的值并设置到src
                if (img.hasAttribute('data-img-path')) {
                    img.src = img.getAttribute('data-img-path');
                }
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '0px 0px 200px 0px'
    });
    
    lazyImages.forEach(img => {
        observer.observe(img);
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 页面加载动画
function initPageLoadAnimation() {
    const elements = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// 响应式调整
function handleResponsive() {
    // 窗口大小变化时的处理
    window.addEventListener('resize', () => {
        // 移动端菜单处理
        const mobileMenu = document.getElementById('mobile-menu');
        const menuBtn = document.getElementById('mobile-menu-btn');
        
        if (window.innerWidth >= 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            if (menuBtn) {
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// 初始化所有功能
function init() {
    initMobileMenu();
    initBackToTop();
    // 不要在main.js中重复初始化图片查看器，因为作品详情页已经有自己的实现
    // initImageViewer();
    initLazyLoad();
    initSmoothScroll();
    initPageLoadAnimation();
    handleResponsive();
    
    // 初始化语言切换功能
    if (window.initLanguage) {
        initLanguage();
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}