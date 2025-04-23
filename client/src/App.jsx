import React from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Lyrics from './components/pages/Lyrics'
import StaticHomeContent from './components/sections/StaticHomeContent'
import TrendingShows from './components/sections/TrendingShows'
import TrendingSongs from './components/sections/TrendingSongs'
import TrendingAlbums from './components/sections/TrendingAlbums'
import TopTracks from './components/sections/TopTracks'
import TopAlbums from './components/sections/TopAlbums'
import HomeSearch from './components/contents/HomeSearch'
import SongsList from './components/sections/SongList'
import ArtistsList from './components/sections/ArtistsList'
import AlbumsList from './components/sections/AlbumsList'
import PlaylistsList from './components/sections/PlaylistsList'
import PodcastsList from './components/sections/PodcastsList'
import EpisodesList from './components/sections/EpisodesList'
import TopArtists from './components/sections/TopArtists'
import AuthPage from './components/pages/AuthPage'



const App = () => {
  return (
    <div>
      <Navbar />
      <div className="lg:pt-20">
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<StaticHomeContent />} />
          <Route path='trending-songs' element={<TrendingSongs />} />
          <Route path="trending-albums" element={<TrendingAlbums />} />
          <Route path="trending-shows" element={<TrendingShows />} />
          <Route path="top-songs" element={<TopTracks />} />
          <Route path="top-albums" element={<TopAlbums />} />
          <Route path='/top-artists' element={<TopArtists />} />

          {/* search routes here */}
          <Route path='/search/all' element={<HomeSearch />} />
          <Route path='/search/songs' element={<SongsList />} />
          <Route path='/search/artists' element={<ArtistsList />} />
          <Route path='/search/albums' element={<AlbumsList />} />
          <Route path='/search/playlists' element={<PlaylistsList />} />
          <Route path='/search/podcasts' element={<PodcastsList />} />
          <Route path='/search/episodes' element={<EpisodesList />} />
        </Route>

        <Route path='/lyrics' element={<Lyrics />} />
        <Route path="/signup" element={<AuthPage  />} />
        <Route path="/login" element={<AuthPage  />} />
  
      </Routes>
      </div>
     
      <Footer />
    </div>
  )
}

export default App
