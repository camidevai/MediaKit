# Media Kit - Camidevai

Un sitio web modular y profesional para el media kit de Camidevai, influencer y educadora de inteligencia artificial.

## 🚀 Características

- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Multiidioma**: Soporte para español e inglés
- **Animaciones Suaves**: Efectos de scroll y transiciones elegantes
- **Formulario de Contacto**: Integración con EmailJS
- **Código Modular**: Estructura organizada y mantenible

## 📁 Estructura del Proyecto

```
medica/
├── index.html                 # Archivo HTML principal
├── assets/
│   ├── css/
│   │   └── styles.css        # Estilos CSS principales
│   └── js/
│       ├── translations.js   # Traducciones ES/EN
│       └── main.js          # Funcionalidad JavaScript
└── README.md                # Documentación del proyecto
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS y Grid/Flexbox
- **JavaScript ES6+**: Funcionalidad interactiva
- **EmailJS**: Servicio de envío de emails
- **Google Fonts**: Tipografía Inter

## 📋 Secciones del Sitio

1. **Hero Section**: Presentación principal con CTA
2. **Sobre Mí**: Información personal y galería de eventos
3. **Estadísticas**: Métricas de redes sociales
4. **Contenido Destacado**: Videos virales más populares
5. **Audiencia**: Demografía e intereses de la comunidad
6. **Paquete de Colaboración**: Propuesta comercial
7. **Contacto**: Formulario de contacto funcional

## 🎨 Personalización

### Colores
Las variables CSS están definidas en `:root` para fácil personalización:

```css
:root {
    --background-color: #0a0a0a;
    --card-color: #1a1a1a;
    --text-color: #f0f0f0;
    --primary-color: #9f7aea;
    --secondary-color: #f472b6;
    --font-family: 'Inter', sans-serif;
}
```

### Traducciones
Para agregar o modificar traducciones, edita el archivo `assets/js/translations.js`.

### EmailJS
Para configurar el formulario de contacto:
1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura tu servicio y plantilla
3. Actualiza las credenciales en `assets/js/main.js`

## 🚀 Instalación y Uso

1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. Para desarrollo local, usa un servidor HTTP simple:
   ```bash
   # Con Python
   python -m http.server 8000
   
   # Con Node.js (http-server)
   npx http-server
   ```

## 📱 Responsive Design

El sitio está optimizado para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🔧 Mantenimiento

### Actualizar Estadísticas
Modifica los números en las secciones correspondientes del `index.html`.

### Cambiar Imágenes
Reemplaza las URLs de las imágenes en el HTML. Se incluyen fallbacks automáticos.

### Modificar Estilos
Todos los estilos están centralizados en `assets/css/styles.css`.

## 📄 Licencia

Este proyecto es de uso personal para Camidevai.

## 📞 Contacto

Para consultas sobre el desarrollo: [camidevai@gmail.com](mailto:camidevai@gmail.com)
