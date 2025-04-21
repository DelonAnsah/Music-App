import React, { createContext, useEffect, useState } from 'react';

export const LyricsContext = createContext();

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


  // Recommended Audiobooks
  useEffect(() => {
    const fetchRecommendedAudiobooks = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/recommended-audiobooks');
        if (response.ok) {
          const data = await response.json();
          setRecommendedAudiobooks(data.shows);
        } else {
          console.error('Error fetching recommended audiobooks:', response.status);
        }
      } catch (error) {
        console.error('Error fetching recommended audiobooks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendedAudiobooks();
  }, []);


  // Trending Albums
  useEffect(() => {
    const fetchTrendingAlbums = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/trending-albums');
        if (response.ok) {
          const data = await response.json();
          setTrendingAlbums(data.albums);
        } else {
          console.error('Error fetching trending albums:', response.status);
        }
      } catch (error) {
        console.error('Error fetching trending albums:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingAlbums();
  }, []);


  // Trending Songs
  useEffect(() => {
    const fetchTrendingTracks = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/trending-songs');
        if (response.ok) {
          const data = await response.json();
          setTrendingSongs(data.tracks);
        } else {
          console.error('Error fetching trending songs:', response.status);
        }
      } catch (error) {
        console.error('Error fetching trending songs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrendingTracks();
  }, []);


  //



  // Top Tracks
  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/top-tracks');
        if (response.ok) {
          const data = await response.json();
          setTopTracks(data.tracks);
        } else {
          console.error('Error fetching top tracks:', response.status);
        }
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopTracks();
  }, []);



  // Top Albums
  useEffect(() => {
    const fetchTopAlbums = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/top-albums');
        if (response.ok) {
          const data = await response.json();
          setTopAlbums(data.albums);
        } else {
          console.error('Error fetching top albums:', response.status);
        }
      } catch (error) {
        console.error('Error fetching top albums:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopAlbums();
  }, []);

  // Shows
  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/shows');
        if (response.ok) {
          const data = await response.json();
          setShows(data.shows);
        } else {
          console.error('Error fetching shows:', response.status);
        }
      } catch (error) {
        console.error('Error fetching shows:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShows();
  }, []);

  // Top Artists
  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/top-artists');
        if (response.ok) {
          const data = await response.json();
          setTopArtists(data.artists);
        } else {
          console.error('Error fetching top artists:', response.status);
        }
      } catch (error) {
        console.error('Error fetching top artists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopArtists();
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