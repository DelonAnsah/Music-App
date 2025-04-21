import React, { useContext } from 'react'
import LyricsContext from '../Context/LyricsContext'
import Section from './Section';
import Loader from '../Loader';

const TopTracks = () => {
  const { topTracks, loading } = useContext(LyricsContext);

  if (loading || topTracks.length === 0) {
    return <Loader />;
  }

  return (
    <Section  title="TOP SONGS" items={topTracks} type="song" />
  )
}

export default TopTracks
