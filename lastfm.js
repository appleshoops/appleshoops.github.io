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

        scrobbles = userJSON.user.playcount;
        username = userJSON.user.realname
        profileLink = userJSON.user.url;
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
        topArtist1 = artistJSON.topartists.artist[0].name;
        topArtist2 = artistJSON.topartists.artist[1].name;
        topArtist3 = artistJSON.topartists.artist[2].name;
        topArtist4 = artistJSON.topartists.artist[3].name;
        topArtist5 = artistJSON.topartists.artist[4].name;
        
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
    } catch(error) {
        console.error(error.message);
    }
}

getUserData();
getTopArtists();
getTopAlbums();
getRecentTracks();
