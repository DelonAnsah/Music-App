import React from 'react'
import { useContext } from 'react'
import LyricsContext from '../Context/LyricsContext'
import Section from './Section';
import Loader from '../Loader';

const TrendingShows = () => {
  const { shows, loading } = useContext(LyricsContext);

  if (loading || shows.length === 0) {
    return <Loader />; 
  }

  return (
    <Section title="TRENDING SHOW" items={shows} type="show" />
  )
}

export default TrendingShows
