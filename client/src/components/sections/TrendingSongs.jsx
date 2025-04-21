import React, { useContext } from 'react'
import LyricsContext from '../Context/LyricsContext'
import Section from './Section';
import Loader from '../Loader';

const TrendingSongs = () => {
  const { trendingSongs, loading } = useContext(LyricsContext);

  if (loading || trendingSongs.length === 0) {
    return <Loader />; 
  }

  return (
    <Section title="TRENDING SONGS" items={trendingSongs} type="song" />
  )
}

export default TrendingSongs
