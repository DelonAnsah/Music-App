require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  origin: [
    'http://localhost:5174',
    'https://musichouse-jade.vercel.app'
  ],
}));
app.use(express.json());

const geniusApiKey = process.env.VITE_GENIUS_API_KEY;
let spotifyAccessToken = '';
let tokenExpirationTime = 0;


const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;


// Function to fetch a new Spotify access token
async function refreshSpotifyToken() {
  try {
    const auth = Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64');
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    spotifyAccessToken = response.data.access_token;

    tokenExpirationTime = Date.now() + (response.data.expires_in * 1000) - 60_000;

    console.log('New Spotify access token fetched');
    return spotifyAccessToken;
  } catch (error) {
    console.error('Error refreshing Spotify token:', error.response?.data || error.message);
    throw new Error('Failed to refresh Spotify token');
  }
}

// Middleware to ensure a valid Spotify token
async function ensureSpotifyToken(req, res, next) {
  try {
    // Check if token is missing or expired
    if (!spotifyAccessToken || Date.now() >= tokenExpirationTime) {
      await refreshSpotifyToken();
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate with Spotify' });
  }
}



// Genius API search endpoint
app.get('/api/search', async (req, res) => {
  const { q } = req.query;

  try {
    const response = await axios.get(`https://api.genius.com/search?q=${q}`, {
      headers: {
        Authorization: `Bearer ${geniusApiKey}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching from Genius API:', error);
    res.status(500).json({ error: 'Failed to fetch data from Genius API' });
  }
});


// Spotify Search API
app.get('/api/spotify-search', ensureSpotifyToken, async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Missing query parameter "q"' });
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
      params: {
        q,
        type: 'track,album,artist,playlist,show,episode',
        limit: 50,
        market: 'GH',
        include_external: 'audio',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error performing Spotify search:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch search results from Spotify' });
  }
});

// Spotify API: Trending Songs
app.get('/api/trending-songs', ensureSpotifyToken, async (req, res) => {
  const trackIds = [
    '0d2ESATuSAJETg8xLPbUhq',
    '0v7L4PS0CV3DXo2ZsD2eG9',
    '2onGyz3G49PZrhHH6QTMz6',
    '34TdvmT0k6606XHNBUwF9H',
    '1k51Q6GFWBbsaWlBB2gnzo',
    '4DREBgUie15tAPq9KQqe2c',
    '7BdaHUJnbX10Lk4Q3MckT8',
    '0EP9NHuH816JCYR8kKsbqb',
    '69jF1dMiO4jBglaPkBGW8h',
    '40HkrsGJCVYrMZMAMzv15x',
    '7vVe1wzmw3YSFB9ZqvFrH6',
    '0pHeUkxz9WffSOZnoKW1qc',
    '3e717rcDVqy43k8T8adezP',
    '6AbNA5ri6j7EhTXZggN6ZK',
    '5Crei6PNVhOpTaJC5AlgzU',
    '4GlUBqfPOLCPirtduhOkwz',
    '3gowCKVy7fRvkEMtDvjyBS',
    '6HGL76EoYOTR2ETqucHxPA',
    '52FemYiqssXnPyTr3ZAy3J',
    '4CATja3o9Jo9kx7nRE3eJJ',
    '7tHSXFRCyUbETKscfpcyht',
    '18ohSiDMM8ZNiEDYTKvIYs',
    '0MiqXnVdcKZDBj64nlOD7c',
    '6rJXB7fIyujJK7MEfcCvrs',
    '7MmSCs8w33ttl7K7sY9RtV',
    '0ASEbpdDF01FQwqJkDbxQv',
    '5GyaXqMfcIGHfmTUITFacS',
    '5RLKu8UORU150aRLREflOK',
    '0YRRbaYuw1u1jAayRuFZ1N',
    '2gzifUVRtwtwyoe3SzsN87',
    '0MTl7HTSydL62FcBnCUVhE',
    '28KYOH4UO8rKqjPGLGDlD7',
    '4Su04rfy8UL4yDkIT6gFgG',
    '7krvWOVJSMcj3LHuxygzLh',
    '0s74UIzGz7XugfaIwbT2hZ',
    '3a3J1pepWFz0obGC11CsIK',
    '0zCBuNnMKpn8G2YpTQf31e',
    '4EeTOYCyjKi8wflQdhI9cm', '3qS4spuVywoeh9uGIpRuQh',
    '3IG7buiZRrNCDKvYTyPsRz',
    '0cCbKFCJ0ozVziMZihtKAr',
    '4njcIk0TFuGX5pRCSUFat6', '7H4XXFebjpDyyx4s7t0Ml3',
    '5eEujB7GCM34vovJBGCU50', '6BZ2DNapAPgzNDMz3tozhU', '0W1Ke5RQASo6sXuK4D3APz',
    '3gsCjnr9yUXh4jwgRuJnSF', '27wZV9FKlwMaJ28ISQl2TE', '4GxLgEMcpjaMaPXh7MRlMV',
    '3SrJIhtj1ftZx7D3bMrcEu'
  ];

  try {
    const response = await axios.get(`https://api.spotify.com/v1/tracks?ids=${trackIds.join(',')}`, {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching trending songs from Spotify:', error);
    res.status(500).json({ error: 'Failed to fetch trending songs' });
  }
});

// Spotify API: Top Tracks
app.get('/api/top-tracks', ensureSpotifyToken, async (req, res) => {
  const trackIds = [
    '3bdntVS2dHPTPitwms9gLK',
    '6QLkRE9Px8RvInJGvms5X6', '2dZ0GjY40Y2OYzRaiD8yYq',
    '5GyaXqMfcIGHfmTUITFacS',
    '3Xa0qIUcRBZgOCs4XBqJdC',
    '7mdvPu1ZAOIgMzr3sfpAqk',
    '1mUPiWUDXCQvkiNpzNa0yk',
    '7krvWOVJSMcj3LHuxygzLh',
    '5EYCa73AMEDRwkWUcAmiB6',
    '642UlSGtBqRt7RPW6p930B',
    '4c7hkB8y91eb35KlPFtpCS',
    '4CAlvOHCeF9HnzhehAdGBu',
    '1tBfoI9tFVl8ampIRG4eTr',
    '23V5fdkKapbNXIgQb3uh27',
    '12jJRu9yInIX7oTxoXtM0S',
    '1y9DKiy8X0zejal5Avpleb',
    '4DREBgUie15tAPq9KQqe2c',
    '18ohSiDMM8ZNiEDYTKvIYs',
    '0HtHmm24jro58XSIW2UIoC',
    '4JCtoBdFVPDURYV5nIUttM',
    '0yNNfq9NEcZgapuJm3PT89',
    '7msfmSm4KbVnIds5DvsGzT',
    '4urzJM1eMsfhZw1wpQEcNR',
    '5eEujB7GCM34vovJBGCU50',
    '2kMYpI02BoSrdQhNgmXeWl',
    '6o5xPdBdyR6KSAhOxsLFeO',
    '6fVjIo9wkW9Z1u0qWLa1Ql',
    '0GzT6ee1Maf91W2f737jex',
    '0GzT6ee1Maf91W2f737jex',
    '3C5s6DTIhYRmCzgm8yfJlm',
    '3a3J1pepWFz0obGC11CsIK',
    '3FkXCJHhixb0wzGIELYGzG'
  ];

  try {
    const response = await axios.get(`https://api.spotify.com/v1/tracks?ids=${trackIds.join(',')}`, {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching top tracks from Spotify:', error);
    res.status(500).json({ error: 'Failed to fetch top tracks' });
  }
});

// Spotify API: Trending Albums
app.get('/api/trending-albums', ensureSpotifyToken, async (req, res) => {
  const albumIds = [
    '6C2f1XaNPB75cqr1eR7lbb',
    '3gi5efMf1SiQfnqpy1o0CK',
    '1rN9jLQdC92jTW6CnHcLKR',
    '7iuyoC6Q8PY7dnX7tzYzXg', '7DBv2Kav5WcnKlrBvEo2Xm', '50b2e47veW13ocbM6CPrRI',
    '7mlcnYrdZSLwKh5qgPvdXG', '6CawYzSZtNzU5MvmuzbQnR', '754CExL1ceHc55tOXmLhiX',
    '0PTK2AseRH37noa9ckhuZn', '3wPqwVD5uQePH0G4VCc42x', '0TUTBwAKeCXHBbgyMHhora',
    '5i3t44ZOyolbQ3f9SVH93x', '5CItWPl9b6I2FOLtll0Fh9', '2JrMvVPza1zRBAuz3eDufm'
  ];

  try {
    const response = await axios.get(`https://api.spotify.com/v1/albums?ids=${albumIds.join(',')}`, {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching trending albums from Spotify:', error);
    res.status(500).json({ error: 'Failed to fetch trending albums' });
  }
});

// Spotify API: Top Albums
app.get('/api/top-albums', ensureSpotifyToken, async (req, res) => {
  const albumIds = [
    '3gi5efMf1SiQfnqpy1o0CK', '75ypH24gbGXUjhJWYDw4XG',
    '4jzhMxpTkAm2pxUuamulT8',
    '5x9SfaZWfdQajuDmgQxXQ8',
    '0EvEjwk2ybLeIPUh4wScRC',
    '14bu8IbUpsWxBnQwKx4hvb', '4hY1NBroE5DijT1XbAX85n',
    '5i3t44ZOyolbQ3f9SVH93x',
    '3klhReVghIi1koerqidL7b',
    '6C2f1XaNPB75cqr1eR7lbb',
    '2hFPnpDZYgCv95Ye4Zc93v',
    '6A9vRCTrmUNqdsW93J3vPK',
    '4eUmsqNGSbpaCJWnpQzCte',
    '6PAGfuja5bu2d7EHzo77uz',
    '0509XspJuKs2kUv31D9ED4',
    '4NGEratFagI2l32OpM8bAi',
    '5n8qjShh7JbArXrVMfJ4Cp',
    '5EomOd5HdWMyenGsSv61D2', '3kS42vslfpYnxWkGN4JvlW',
    '21y5KxfsNHRVikyNTWLaHy'
  ];

  try {
    const response = await axios.get(`https://api.spotify.com/v1/albums?ids=${albumIds.join(',')}`, {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching top albums from Spotify:', error);
    res.status(500).json({ error: 'Failed to fetch top albums' });
  }
});

// Spotify API: Shows
app.get('/api/shows', ensureSpotifyToken, async (req, res) => {
  const showIds = [
    '1r0a2feA4B8Vwa10oxn4HY', '4hWvhVkN6IddyEiF3Zpley', '2GGgS0ZbK0QuIr6zqgxqoL',
    '4y1r9U7njzqpXLrnGzQHgJ', '2RuLppHrhCI54RUDTzE55u', '6tNxjFCSoruX1vNFgicWEH',
    '3tARJAqwIqu1IVPl2GZ6Fi', '4QEYVxs47xqy3MBidIcz9T', '7isN810N4MvkW72sZQ8ZMP',
    '4hZwj3WfCNUYlBoLFoLD7k'
  ];

  try {
    const response = await axios.get(`https://api.spotify.com/v1/shows?ids=${showIds.join(',')}`, {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching shows from Spotify:', error);
    res.status(500).json({ error: 'Failed to fetch shows' });
  }
});

// Spotify API: Recommended Audiobooks
app.get('/api/recommended-audiobooks', ensureSpotifyToken, async (req, res) => {
  const audiobookIds = [
    '0LbucyRBk7IDlhxjc1HFDv', '0YWjYIjZcZPCNttf7F9iIE', '0iO26wGGgt1pOk9F7LFCVo',
    '3BJx4pub3V1Eawmo0Q6ZzT', '4tNGOuh41K7eosoTn6O0ji', '6FAE8o3QJCtLWcChQ16U19',
    '7er7ET0aGFZDyy3EpMJy5S', '7EN4LL9sO3yA0qzTKAa7h7', '3Ncx0Hl7rvsj5Vzqhn7bcb',
    '0W4F6DszGwbTsw4snp4KSp', '5JQNW9WM0loxRm4diLHFDc', '4cz1cdmXvgj1DlTrbdYcun',
    '71S96dljnPxzUtxGAELjr5'
  ];

  try {
    const response = await axios.get(`https://api.spotify.com/v1/shows?ids=${audiobookIds.join(',')}`, {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recommended audiobooks from Spotify:', error);
    res.status(500).json({ error: 'Failed to fetch recommended audiobooks' });
  }
});

// Spotify API: Top Artists
app.get('/api/top-artists', ensureSpotifyToken, async (req, res) => {
  const artistIds = [
    '2LiqbH7OhqP0yuaG8VL1wJ', '2ayt5jDUuTCpoTG7sHSvuq', '4tIKaxUmpXzshok2yCnwdf',
    '1zO1FWFxxNUCqUuGATxZQZ', '6Z9Xe5mjocmPOhz2TLNrAi', '7AP5AMBQvTzTBB7IUSVLzO',
    '5bq3JNFcE1ZojRIlPtldoz', '1An6gOOlZ9NITlQs2ZtBCb', '7b6IvXftHBf6fYfFRsEhQT',
    '42q0rYXtR561ypg1Fcw1PI', '0GGKrcPOlBkmBzQDf2Ogkl', '4vNCRfPa5uflWbtrBxEZew',
    '14PimM6ohO2gYftuwTam9V', '01DTVE3KmoPogPZaOvMqO8', '3WDXKsCKcxJhvrvpdg5IGI',
    '6yCYm86uDrfUteHNs6zcg1', '39IXXExWT64CmkWwkO2ANn', '2CdvQgo8DCIOyScP9GDkDA',
    '0s17P9R9hTZUlgxDnvLBFW', '0THfCwaNsNEudsz9MciGdl'
  ];

  try {
    const response = await axios.get(`https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`, {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching top artists from Spotify:', error);
    res.status(500).json({ error: 'Failed to fetch top artists' });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});