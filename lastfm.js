const apiKey = '36bfda5a889b981d0689d00afef313ec'
const sharedSecret = '79b945f9ad2541bd64c67132cc888918'

async function getUserData() {
    const userURL = `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=AppleSheep&api_key=${apiKey}&format=json`;
    try {
        const response = await fetch(userURL);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const userJSON = await response.json();
        console.log(userJSON);
    } catch (error) {
        console.error(error.message);
    }
}

async function getTopArtists() {
    const artistURL = `http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=AppleSheep&api_key=${apiKey}&period=1month&limit=5&format=json`
    try {
        const response = await fetch(artistURL);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const artistJSON = await response.json();
        console.log(artistJSON);
    } catch(error) {
        console.error(error.message);
    }
}

async function getTopAlbums() {
    const AlbumURL = `http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=AppleSheep&api_key=${apiKey}&period=1month&limit=5&format=json`
    try {
        const response = await fetch(AlbumURL);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const albumJSON = await response.json();
        console.log(albumJSON);
    } catch(error) {
        console.error(error.message);
    }
}

async function getRecentTracks() {
    const tracksURL = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=AppleSheep&api_key=${apiKey}&limit=5&format=json`
    try {
        const response = await fetch(tracksURL);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const tracksJSON = await response.json();
        console.log(tracksJSON);
    
    } catch(error) {
        console.error(error.message);
    }
}

getUserData();
getTopArtists();
getTopAlbums();
getRecentTracks();
