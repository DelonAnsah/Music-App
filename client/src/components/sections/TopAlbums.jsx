import React, { useContext } from 'react'
import LyricsContext from '../Context/LyricsContext'
import Section from './Section';
import Loader from '../Loader';

const TopAlbums = () => {
  const { topAlbums, loading } = useContext(LyricsContext);

  if (loading || topAlbums.length === 0) {
    return <Loader />;
  }


  return (
    <Section title="TOP ALBUMS" items={topAlbums} type="album" />
  )
}

export default TopAlbums
