import React, { createContext, useEffect, useState } from 'react';

export const LyricsContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL;

export const LyricsProvider = ({ children }) => {
  const [tracksList, setTracksList] = useState([]);
  const [searchResults, setSearchResults] = useState({});
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recommendedAudiobooks, setRecommendedAudiobooks] = useState([]);
  const [trendingAlbums, setTrendingAlbums] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [shows, setShows] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  const clearSearch = () => setSearchResults({});

  const fetchData = async (endpoint, setter, key) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/api/${endpoint}`);
      if (response.ok) {
        const data = await response.json();
        setter(data[key]);
      } else {
        console.error(`Error fetching ${endpoint}:`, response.status);
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("recommended-audiobooks", setRecommendedAudiobooks, "shows");
    fetchData("trending-albums", setTrendingAlbums, "albums");
    fetchData("trending-songs", setTrendingSongs, "tracks");
    fetchData("top-tracks", setTopTracks, "tracks");
    fetchData("top-albums", setTopAlbums, "albums");
    fetchData("shows", setShows, "shows");
    fetchData("top-artists", setTopArtists, "artists");
  }, []);

  return (
    <LyricsContext.Provider
      value={{
        tracksList,
        setTracksList,
        loading,
        setLoading,
        trendingSongs,
        trendingAlbums,
        topTracks,
        topAlbums,
        shows,
        recommendedAudiobooks,
        searchResults,
        setSearchResults,
        clearSearch,
        topArtists,
      }}
    >
      {children}
    </LyricsContext.Provider>
  );
};

export default LyricsContext;
