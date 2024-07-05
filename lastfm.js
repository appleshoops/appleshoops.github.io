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
        topArtist1 = artistJSON.topartists.artist[0].name;
        topArtist2 = artistJSON.topartists.artist[1].name;
        topArtist3 = artistJSON.topartists.artist[2].name;
        topArtist4 = artistJSON.topartists.artist[3].name;
        topArtist5 = artistJSON.topartists.artist[4].name;
        
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

    document.getElementById("artistImage1").textContent = iTunesArtistImages.iTunesArtist1;
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
        topAlbum1 = albumJSON.topalbums.album[0].name;
        topAlbum2 = albumJSON.topalbums.album[1].name;
        topAlbum3 = albumJSON.topalbums.album[2].name;
        topAlbum4 = albumJSON.topalbums.album[3].name;
        topAlbum5 = albumJSON.topalbums.album[4].name;

        topAlbumArtist1 = albumJSON.topalbums.album[0].artist.name;
        topAlbumArtist2 = albumJSON.topalbums.album[1].artist.name;
        topAlbumArtist3 = albumJSON.topalbums.album[2].artist.name;
        topAlbumArtist4 = albumJSON.topalbums.album[3].artist.name;
        topAlbumArtist5 = albumJSON.topalbums.album[4].artist.name;

        topAlbumImage1 = albumJSON.topalbums.album[0].image[1]['#text'];
        topAlbumImage2 = albumJSON.topalbums.album[1].image[1]['#text'];
        topAlbumImage3 = albumJSON.topalbums.album[2].image[1]['#text'];
        topAlbumImage4 = albumJSON.topalbums.album[3].image[1]['#text'];
        topAlbumImage5 = albumJSON.topalbums.album[4].image[1]['#text'];

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
    
        recentTrack1 = tracksJSON.recenttracks.track[0].name;
        recentTrack2 = tracksJSON.recenttracks.track[1].name;
        recentTrack3 = tracksJSON.recenttracks.track[2].name;
        recentTrack4 = tracksJSON.recenttracks.track[3].name;
        recentTrack5 = tracksJSON.recenttracks.track[4].name;
       
        recentTrackAlbum1 = tracksJSON.recenttracks.track[0].album['#text'];
        recentTrackAlbum2 = tracksJSON.recenttracks.track[1].album['#text'];
        recentTrackAlbum3 = tracksJSON.recenttracks.track[2].album['#text'];
        recentTrackAlbum4 = tracksJSON.recenttracks.track[3].album['#text'];
        recentTrackAlbum5 = tracksJSON.recenttracks.track[4].album['#text'];

        recentTrackArtist1 = tracksJSON.recenttracks.track[0].artist['#text'];
        recentTrackArtist2 = tracksJSON.recenttracks.track[1].artist['#text'];
        recentTrackArtist3 = tracksJSON.recenttracks.track[2].artist['#text'];
        recentTrackArtist4 = tracksJSON.recenttracks.track[3].artist['#text'];
        recentTrackArtist5 = tracksJSON.recenttracks.track[4].artist['#text'];

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

document.addEventListener('DOMContentLoaded', getUserData);
document.addEventListener('DOMContentLoaded', getTopArtists);