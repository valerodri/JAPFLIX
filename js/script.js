const API_URL = `https://japceibal.github.io/japflix_api/movies-data.json`;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const API_URL_SEARCH = "https://google.com/search?q=";

async function getJSONData(url) {
    // ## INICIO BLOQUE 3 ##
    debugger;
    const result = {};
    try {
        const response = await fetch(url);
        if (response.ok) {
            result.data = await response.json();
            result.status = "ok";
        } else {
            throw Error(response.statusText);
        }
    }
    catch (error) {
        result.status = 'error';
        result.data = error;
    }
    return result;
    // ## FIN BLOQUE 3 ##
}

function getMovies(search) {
    return getJSONData(`${API_URL}&query=${search}`);
}

