// Carrusel deslizable
class InfiniteCarousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.cards = [...this.track.children];
        this.cardWidth = 280 + 32; // 280px + 2rem gap
        this.isDragging = false;
        this.startX = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        // Touch events
        this.container.addEventListener('touchstart', this.touchStart.bind(this));
        this.container.addEventListener('touchmove', this.touchMove.bind(this));
        this.container.addEventListener('touchend', this.touchEnd.bind(this));
        
        // Mouse events
        this.container.addEventListener('mousedown', this.touchStart.bind(this));
        this.container.addEventListener('mousemove', this.touchMove.bind(this));
        this.container.addEventListener('mouseup', this.touchEnd.bind(this));
        this.container.addEventListener('mouseleave', this.touchEnd.bind(this));
        
        // Prevent context menu
        this.container.addEventListener('contextmenu', e => e.preventDefault());
        
        // Prevent drag on images
        this.cards.forEach(card => {
            const img = card.querySelector('img');
            if (img) {
                img.addEventListener('dragstart', e => e.preventDefault());
            }
        });
    }
    
    getPositionX(event) {
        return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    }
    
    touchStart(event) {
        this.isDragging = true;
        this.startX = this.getPositionX(event);
        this.track.classList.add('dragging');
        this.container.style.cursor = 'grabbing';
        
        // Get current transform value
        const style = window.getComputedStyle(this.track);
        const matrix = new DOMMatrix(style.transform);
        this.prevTranslate = matrix.m41;
    }
    
    touchMove(event) {
        if (!this.isDragging) return;
        
        event.preventDefault();
        const currentX = this.getPositionX(event);
        const diff = currentX - this.startX;
        this.currentTranslate = this.prevTranslate + diff;
        
        this.setSliderPosition();
    }
    
    touchEnd() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.track.classList.remove('dragging');
        this.track.classList.add('smooth-transition');
        this.container.style.cursor = 'grab';
        
        // Snap to nearest card
        const movedBy = this.currentTranslate - this.prevTranslate;
        
        if (Math.abs(movedBy) > 50) {
            if (movedBy > 0) {
                this.slideToNext();
            } else {
                this.slideToPrev();
            }
        } else {
            // Snap back
            this.currentTranslate = this.prevTranslate;
            this.setSliderPosition();
        }
        
        // Remove smooth transition after animation
        setTimeout(() => {
            this.track.classList.remove('smooth-transition');
        }, 300);
    }
    
    slideToNext() {
        this.currentTranslate -= this.cardWidth;
        this.setSliderPosition();
        this.checkInfiniteLoop();
    }
    
    slideToPrev() {
        this.currentTranslate += this.cardWidth;
        this.setSliderPosition();
        this.checkInfiniteLoop();
    }
    
    setSliderPosition() {
        this.track.style.transform = `translateX(${this.currentTranslate}px)`;
    }
    
    checkInfiniteLoop() {
        const totalWidth = this.cardWidth * (this.cards.length / 2); // Half because we have duplicates
        
        if (this.currentTranslate <= -totalWidth) {
            // Reset to beginning
            setTimeout(() => {
                this.track.classList.remove('smooth-transition');
                this.currentTranslate = 0;
                this.setSliderPosition();
            }, 300);
        } else if (this.currentTranslate >= 0) {
            // Reset to end
            setTimeout(() => {
                this.track.classList.remove('smooth-transition');
                this.currentTranslate = -totalWidth + this.cardWidth;
                this.setSliderPosition();
            }, 300);
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        new InfiniteCarousel(carouselContainer);
    }
});
