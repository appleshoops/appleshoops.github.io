const apiKey = '36bfda5a889b981d0689d00afef313ec'
const sharedSecret = '79b945f9ad2541bd64c67132cc888918'

const parser = new DOMParser();

async function getUserData() {
    let scrobbles = 0;
    const userURL = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=AppleSheep&api_key=${apiKey}&format=json`;
    try {
        const response = await fetch(userURL);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const userJSON = await response.json();
        console.log(userJSON);

        scrobbles = userJSON.user.playcount;
        username = userJSON.user.realname
        profileLink = userJSON.user.url;
    } catch (error) {
        console.error(error.message);
    }
    document.getElementById("scrobblesText").textContent = `${scrobbles} scrobbles`;
}

async function getTopArtists() {
    const artistURL = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=AppleSheep&api_key=${apiKey}&period=1month&limit=5&format=json`
    try {
        const response = await fetch(artistURL);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const artistJSON = await response.json();
        console.log(artistJSON);
        let topArtists = {};
        for (let i = 0; i < artistJSON.topartists.artist.length; i++) {
            const artist = artistJSON.topartists.artist[i];
            topArtists[`artist${i + 1}`] = artist.name;
        }

        for (let i = 1; i <= Object.keys(topArtists).length; i++) {
            document.getElementById(`artist${i}`).textContent = topArtists[`artist${i}`];
        }
        
        let iTunesArtistsData = {};
        let iTunesArtistImages = {}; // Object to store the URLs

        for (let i = 0; i < artistJSON.topartists.artist.length; i++) {
            const artist = artistJSON.topartists.artist[i];
            iTunesSearchURL = 'https://corsproxy.io/?' + encodeURIComponent(`https://itunes.apple.com/search?term=${artist.name}&country=AU&entity=musicArtist&attribute=artistTerm&limit=1&lang=en_AU`)
            try {
                const response = await fetch(iTunesSearchURL);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
            }
                const data = await response.json();
                iTunesArtistURL = 'https://corsproxy.io/?' + encodeURIComponent(data.results[0].artistLinkUrl);
                iTunesArtistsData[`iTunesArtist${i + 1}`] = data;

                try {
                    const response = await fetch(iTunesArtistURL);
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }
                    const iTunesArtistPage = await response.text();
                    const iTunesArtistDoc = parser.parseFromString(iTunesArtistPage, 'text/html');
                    imageURL = iTunesArtistDoc.querySelector('meta[property="og:image"]').getAttribute('content');
                    if (imageURL.endsWith("cw.png")) {
                        imageURL = imageURL.replace("cw.png", "cc.png");
                    }
                    iTunesArtistImages[`iTunesArtist${i + 1}`] = imageURL
                    for (let i = 1; i <= Object.keys(iTunesArtistImages).length; i++) {
                        document.getElementById(`artistImage${i}`).src = iTunesArtistImages[`iTunesArtist${i}`];
                    }
                } catch (error) {
                    console.error(error.message);
                }
            } catch (error) {
            console.error(error.message);
        }
}
    } catch(error) {
        console.error(error.message);
    }

}

async function getTopAlbums() {
    const AlbumURL = `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=AppleSheep&api_key=${apiKey}&period=1month&limit=5&format=json`
    try {
        const response = await fetch(AlbumURL);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const albumJSON = await response.json();
        console.log(albumJSON);

        let albumNames = {};
        for (let i = 0; i < albumJSON.topalbums.album.length; i++) {
            const album = albumJSON.topalbums.album[i];
            albumNames[`album${i + 1}Name`] = album.name;
        }

        for (let i = 1; i <= Object.keys(albumNames).length; i++) {
            document.getElementById(`album${i}Name`).textContent = albumNames[`album${i}Name`]
        }

        let albumArtists = {};
        for (let i = 0; i < albumJSON.topalbums.album.length; i++) {
            const album = albumJSON.topalbums.album[i];
            albumArtists[`album${i + 1}Artist`] = album.artist.name;
        }

        for (let i = 1; i <= Object.keys(albumArtists).length; i++) {
            document.getElementById(`album${i}Artist`).textContent = albumArtists[`album${i}Artist`]
        }

        let albumImages = {};
        for (let i = 0; i < albumJSON.topalbums.album.length; i++) {
            const album = albumJSON.topalbums.album[i];
            albumImages[`album${i + 1}Image`] = album.image[3]['#text'];
        }

        for (let i = 1; i <= Object.keys(albumImages).length; i++) {
            document.getElementById(`album${i}Image`).src = albumImages[`album${i}Image`]
        }

    } catch(error) {
        console.error(error.message);
    }
}

async function getRecentTracks() {
    const tracksURL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=AppleSheep&api_key=${apiKey}&limit=5&format=json`
    try {
        const response = await fetch(tracksURL);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const tracksJSON = await response.json();
        console.log(tracksJSON);

        let recentTracks = {};
        for (let i = 0; i < tracksJSON.recenttracks.track.length; i++) {
            const track = tracksJSON.recenttracks.track[i]
            recentTracks[`track${i + 1}Name`] = track.name;
        }

        for (let i = 1; i <= Object.keys(recentTracks).length; i++) {
            document.getElementById(`track${i}Name`).textContent = recentTracks[`track${i}Name`]
        }

        let recentTrackArtists = {};
        for (let i = 0; i < tracksJSON.recenttracks.track.length; i++) {
            const track = tracksJSON.recenttracks.track[i];
            recentTrackArtists[`track${i + 1}Artist`] = track.artist[`#text`];
        }

        for (let i = 1; i <= Object.keys(recentTrackArtists).length; i++) {
            document.getElementById(`track${i}Artist`).textContent = recentTrackArtists[`track${i}Artist`]
        }

        let recentTrackAlbums = {};
        for (let i = 0; i < tracksJSON.recenttracks.track.length; i++) {
            const track = tracksJSON.recenttracks.track[i];
            recentTrackAlbums[`track${i + 1}Album`] = track.album[`#text`];
        }

        for (let i = 1; i <= Object.keys(recentTrackAlbums).length; i++) {
            document.getElementById(`track${i}Album`).textContent = recentTrackAlbums[`track${i}Album`]
        }

        let recentTrackImages = {};
        for (let i = 0; i < tracksJSON.recenttracks.track.length; i++) {
            const track = tracksJSON.recenttracks.track[i];
            recentTrackImages[`track${i + 1}Image`] = track.image[3]['#text'];
        }

        for (let i = 1; i <= Object.keys(recentTrackImages).length; i++) {
            document.getElementById(`track${i}Image`).src = recentTrackImages[`track${i}Image`];
        }
        recentTrackImage1 = tracksJSON.recenttracks.track[0].image[1]['#text'];
        recentTrackImage2 = tracksJSON.recenttracks.track[1].image[1]['#text'];
        recentTrackImage3 = tracksJSON.recenttracks.track[2].image[1]['#text'];
        recentTrackImage4 = tracksJSON.recenttracks.track[3].image[1]['#text'];
        recentTrackImage5 = tracksJSON.recenttracks.track[4].image[1]['#text'];
    } catch(error) {
        console.error(error.message);
    }
}

getUserData();
getTopArtists();
getTopAlbums();
getRecentTracks();
