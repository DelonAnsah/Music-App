import React, { useContext } from 'react'
import Section from './Section'
import LyricsContext from '../Context/LyricsContext'
import Loader from '../Loader';

const TrendingAlbums = () => {
  const { trendingAlbums, loading } = useContext(LyricsContext);

  if (loading || trendingAlbums.length === 0) {
    return <Loader />; 
  }

  return (
    <Section title="TRENDING ALBUMS" items={trendingAlbums} type="album" />
  )
}

export default TrendingAlbums
