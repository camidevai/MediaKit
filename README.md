# CamiDevAI · Media Kit

Sitio estático de **Camila Daniela Bañares Carrasco**. Diseño claro y minimalista,
con español e inglés, publicaciones verificadas, servicios, trayectoria y contacto.

## Archivos

- `index.html`: contenido en español listo para renderizar sin JavaScript.
- `assets/css/styles.css`: diseño adaptable, fondo claro y tipografía Inter.
- `assets/js/config.js`: perfil, cifras, fuentes, contenido destacado y EmailJS.
- `assets/js/translations.js`: textos en ambos idiomas.
- `assets/js/main.js`: selección de idioma y formulario de contacto.
- `content/featured.json`: publicaciones y fechas de revisión.
- `assets/images/`: retrato y portadas descargadas de publicaciones públicas de la titular.

## Uso local

```bash
python -m http.server 8000
```

No requiere compilación. GitHub Pages publica la rama `main`.

## Revisión del 12 de octubre de 2026

El perfil profesional se contrastó con https://www.linkedin.com/in/camilabanares/.
La vicepresidencia de la CCHIA también aparece en el sitio de Expo Mercado Público:
https://www.expomercadopublico.cl/s/speakers/.

Se revisó el perfil público https://www.instagram.com/camidevai/ y se abrieron las
seis publicaciones incluidas en `content/featured.json`, comprobando autoría,
fecha, contenido y portada. La selección es editorial: no se presenta como un ranking
de rendimiento. Los conteos de visualizaciones recientes no eran visibles y no se inventaron.

Las miniaturas se guardaron como archivos del sitio para evitar depender de URLs
temporales del CDN de Instagram. Las portadas conservan su imagen original.

La comunidad de **500K+** es un dato declarado en LinkedIn. Instagram mostró
**287 mil seguidores**, una cifra pública redondeada. El resultado de **8.6M**
pertenece a registros del portafolio de **2025**. La página explica las fuentes y períodos.
El contenido anterior está conservado en `CONFIG.historicalContent` para referencia.

Se mantiene la configuración existente del formulario de EmailJS. El correo y LinkedIn
siguen disponibles como contacto directo. La revisión del sitio no envía correos reales.
