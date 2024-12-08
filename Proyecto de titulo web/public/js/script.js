const images = document.querySelectorAll('.carousel-images img');
const indicators = document.querySelectorAll('.indicator');

let currentIndex = 0;

function showImage(index) {
    const offset = -index * 100; // Mover el carrusel
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;

    // Actualizar los indicadores
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

// Cambiar imagen automáticamente cada 5 segundos
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}, 5000);

// Escuchar clics en los indicadores
indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
        currentIndex = i;
        showImage(currentIndex);
    });
});
