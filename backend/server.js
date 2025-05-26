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
    '1CMYChZ4g77MGPlS0JZnZI',
    '0pMEluREZC1U8SUqWBUjxP',
    '7jvOvZiftFEeBj41TktY5l',
    '6VWLwERP7wzI8brmoaOkAj',
    '0JwTlwOTMnxar1Sk0tBVaj',
    '6293ThDJcHuXJ9CdXY5iYp',
    '6YDFvKrfUKr5QE3xQZtIKf',
    '3BTGMyjtzhRi653HkEdozk',
    '0CkCBt1pJHNQLaz6fuOplm',
    '1ZqeuUkGJE2HTlowX8Y8b4',
    '1SsBhroynnJPIU4jc9eVqC',
    '0KhkTKB2QzYguZll0tvvOz',
    '1p8VRVuGMKDNTaZ35vJA8Y',
    '2e8hVL6UfmHtc8aRExYfYd',
    '5QBxfSz56lfTgcJh6HkfAP',
    '2EpLmBCEnUoSpSv1DoP7Qo',
    '6BY1jLIV29n7GXhFXnO2GM',
    '0gZBETIlfxiEvXKtduJgZz',
    '22JW3uWZqPwr9khfxj3jtJ',
    '4gs5jVGpPkVpmPNodVZF97',
    '6FrsYXwbsqNjw7HTkXSq2R',
    '7iCgu3JJVGBz705AzEvedF',
    '4n5MtE3nXPNePmUkKr9jMI',
    '5mgZVZS93ZJZ4Pv6OVS0qp',
    '5JL8AzICjL2AgBSxxoiTTJ',
    '5B9FTWU5USxQeOxidJREu5',
    '0ddHaqvtaq7tVFiIeUo8jS',
    '5F1H6m1xDVdQqL1GvXFhqp',
    '15ZkBRKOzrqY8XM5JfSSp5',
    '5xpnZ0IvzFMyPqMvCury7K',
    '37BgfPPn4hZ5M41PoIll7G',
    '6P52DObY1mHoGjJAObCvAQ',
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
    '1q8CfhGdlC1LdX7AaN4aqJ',
    '3Xa0qIUcRBZgOCs4XBqJdC',
    '7mdvPu1ZAOIgMzr3sfpAqk',
    '1mUPiWUDXCQvkiNpzNa0yk',
    '3mkxopCUD9KXldJJ1c743w',
    '5GyaXqMfcIGHfmTUITFacS',
    '7krvWOVJSMcj3LHuxygzLh',
    '5EYCa73AMEDRwkWUcAmiB6',
    '642UlSGtBqRt7RPW6p930B',
    '4CAlvOHCeF9HnzhehAdGBu',
    '4c7hkB8y91eb35KlPFtpCS',
    '4LN7BAe5snUpAqFffvxQZE',
    '6YDFvKrfUKr5QE3xQZtIKf',
    '4qua256ZagtQ0WPHRj7ua2',
    '23V5fdkKapbNXIgQb3uh27',
    '1tBfoI9tFVl8ampIRG4eTr',
    '12jJRu9yInIX7oTxoXtM0S',
    '7jvOvZiftFEeBj41TktY5l',
    '0HtHmm24jro58XSIW2UIoC',
    '6VWLwERP7wzI8brmoaOkAj',
    '4JCtoBdFVPDURYV5nIUttM',
    '1y9DKiy8X0zejal5Avpleb',
    '2onGyz3G49PZrhHH6QTMz6',
    '29knEEZ4Zti3nDvxuNb5Nr',
    '4urzJM1eMsfhZw1wpQEcNR',
    '6fVjIo9wkW9Z1u0qWLa1Ql',
    '0JwTlwOTMnxar1Sk0tBVaj',
    '0GzT6ee1Maf91W2f737jex',
    '18ohSiDMM8ZNiEDYTKvIYs'
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
    '74tStMqQnvvgYjMXRd6XZo',
    '7xT6FiDw3oQwfr78crcgy4',
    '5yOFa29dDlTESWA8T143h8',
    '11gE9lxKNWiAB9AmfLQ3pQ',
    '3gi5efMf1SiQfnqpy1o0CK',
    '6C2f1XaNPB75cqr1eR7lbb',
    '1rN9jLQdC92jTW6CnHcLKR',
    '7Ddd4sJtutJtm3d3DNXLKV',
    '7iuyoC6Q8PY7dnX7tzYzXg', 
    '7DBv2Kav5WcnKlrBvEo2Xm', '50b2e47veW13ocbM6CPrRI',
    '7mlcnYrdZSLwKh5qgPvdXG', '6CawYzSZtNzU5MvmuzbQnR', 
    '754CExL1ceHc55tOXmLhiX',
    '0PTK2AseRH37noa9ckhuZn'
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
    '0EvEjwk2ybLeIPUh4wScRC',
    '5x9SfaZWfdQajuDmgQxXQ8',
    '4jzhMxpTkAm2pxUuamulT8',
    '6C2f1XaNPB75cqr1eR7lbb',
    '14bu8IbUpsWxBnQwKx4hvb', '4hY1NBroE5DijT1XbAX85n',
    '5i3t44ZOyolbQ3f9SVH93x',
    '3klhReVghIi1koerqidL7b',
    '2A9CPjm4DQ9mgs4f4X5b5D',
    '5EomOd5HdWMyenGsSv61D2', 
    '4NGEratFagI2l32OpM8bAi',
    '4eUmsqNGSbpaCJWnpQzCte',
    '5n8qjShh7JbArXrVMfJ4Cp',
    '6PAGfuja5bu2d7EHzo77uz',
    '5yOFa29dDlTESWA8T143h8',
    '3QjBdftIw2vfGnSZSqRVcF',
    '3kS42vslfpYnxWkGN4JvlW',
    '11gE9lxKNWiAB9AmfLQ3pQ'
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
    '6olvQhNhQwMbGG26t3rVgM',
    '5EqqB52m2bsr4k1Ii7sStc',
    '2mcJ0sFMn4TdKCQrxoLPgO',
    '1r0a2feA4B8Vwa10oxn4HY', '4hWvhVkN6IddyEiF3Zpley', '2GGgS0ZbK0QuIr6zqgxqoL',
    '4y1r9U7njzqpXLrnGzQHgJ', '2RuLppHrhCI54RUDTzE55u', '6tNxjFCSoruX1vNFgicWEH',
    '3tARJAqwIqu1IVPl2GZ6Fi',
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