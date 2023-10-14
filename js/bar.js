const url = "https://japceibal.github.io/japflix_api/movies-data.json";
let peliculas = [];

document.addEventListener("DOMContentLoaded", () => {
    const busqueda = document.getElementById("inputBuscar");
    const listaPelis = document.getElementById("lista");

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            peliculas = data;
        })
        .catch(error => console.error('Error al cargar las películas:', error));

    document.addEventListener('submit', mostrarPelis);

    async function mostrarPelis(e) {
        e.preventDefault();
        const searchTerm = busqueda.value.toLowerCase().trim();
        const resultados = peliculas.filter(pelicula => {
            return (
                pelicula.title.toLowerCase().includes(searchTerm) ||
                pelicula.genres.some(genre => genre.name.toLowerCase().includes(searchTerm)) ||
                pelicula.tagline.toLowerCase().includes(searchTerm) ||
                pelicula.overview.toLowerCase().includes(searchTerm)
            );
        });

        // Limpiar la lista de películas antes de agregar los resultados
        listaPelis.innerHTML = "";

        console.log(resultados);
        
        resultados.forEach(pelicula => {
            
            const peliculaElement = document.createElement("div");
            peliculaElement.classList.add("pelicula");

            const tituloElement = document.createElement("h4");
            tituloElement.textContent = pelicula.title;
            
            const taglineElement = document.createElement("p");
            taglineElement.textContent = pelicula.tagline;

            const scoreElement = document.createElement("p");
            let peliScore = parseInt(pelicula.vote_average);
            scoreElement.innerHTML = showScore(peliScore);

            peliculaElement.appendChild(tituloElement);
            peliculaElement.appendChild(taglineElement);
            peliculaElement.appendChild(scoreElement);
            listaPelis.appendChild(peliculaElement);
        
        });

        
    }
});

function showScore(score){
    let htmlContentToAppend = ""
    for (let i=0; i<score; i++) 
        htmlContentToAppend += '<span class="fa fa-star checked"></span>'
    for (let i=0; i<10-score; i++) 
        htmlContentToAppend += '<span class="fa fa-star"></span>'
    return htmlContentToAppend;
} 