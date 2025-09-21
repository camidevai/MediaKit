// Emoticones flotantes dinámicos
class FloatingEmojis {
    constructor() {
        this.container = document.querySelector('.floating-emojis');
        this.emojis = {
            facebook: ['👍', '😍', '😂', '❤️', '👏', '🔥', '💯', '🎉'],
            instagram: ['❤️', '📸', '✨', '🌟', '💫', '🔥', '💖', '🎨'],
            tiktok: ['🎵', '🔥', '💫', '⚡', '🎭', '🎪', '🌈', '💥']
        };
        this.platforms = ['facebook', 'instagram', 'tiktok'];
        
        if (this.container) {
            this.init();
        }
    }
    
    init() {
        // Crear emoticones adicionales cada 3 segundos
        setInterval(() => {
            this.createRandomEmoji();
        }, 3000);
        
        // Crear algunos emoticones iniciales
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    this.createRandomEmoji();
                }, i * 1000);
            }
        }, 2000);
    }
    
    createRandomEmoji() {
        const platform = this.platforms[Math.floor(Math.random() * this.platforms.length)];
        const emojiArray = this.emojis[platform];
        const emoji = emojiArray[Math.floor(Math.random() * emojiArray.length)];
        
        const emojiElement = document.createElement('div');
        emojiElement.className = `floating-emoji ${platform}`;
        emojiElement.textContent = emoji;
        
        // Posición aleatoria
        emojiElement.style.left = Math.random() * 90 + '%';
        
        // Duración aleatoria
        const duration = Math.random() * 10 + 10; // Entre 10 y 20 segundos
        emojiElement.style.animationDuration = duration + 's';
        
        // Delay aleatorio
        const delay = Math.random() * 5;
        emojiElement.style.animationDelay = delay + 's';
        
        // Tamaño aleatorio
        const size = Math.random() * 1 + 1.5; // Entre 1.5rem y 2.5rem
        emojiElement.style.fontSize = size + 'rem';
        
        // Opacidad aleatoria
        const opacity = Math.random() * 0.4 + 0.4; // Entre 0.4 y 0.8
        emojiElement.style.opacity = opacity;
        
        this.container.appendChild(emojiElement);
        
        // Remover el elemento después de la animación
        setTimeout(() => {
            if (emojiElement.parentNode) {
                emojiElement.parentNode.removeChild(emojiElement);
            }
        }, (duration + delay) * 1000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new FloatingEmojis();
});
