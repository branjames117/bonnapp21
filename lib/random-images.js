export default function randomImageGenerator(darkTheme) {
  const randomImages = [
    <img
      src='../images/BonnarooDay.jpg'
      alt='The Main Stage at Bonnaroo. Photo courtesy of Shawn Mariani of shawnmariani.com.'
      title='The Main Stage at Bonnaroo. Photo courtesy of Shawn Mariani of shawnmariani.com.'
      style={darkTheme ? { filter: 'grayscale(100%)' } : {}}
    />,
    <img
      src='../images/Which.jpg'
      alt='Which Stage at the Bonnaroo Music Festival in Manchester, Tennessee, by Joshrhinehart.'
      title='Which Stage at the Bonnaroo Music Festival in Manchester, Tennessee, Joshrhinehart.'
      style={darkTheme ? { filter: 'grayscale(100%)' } : {}}
    />,
    <img
      src='../images/1280px-Bonnarooooooooo-bot.jpg'
      alt='Graffiti by Nashville artist Ryan McCauley on the Graffiti Wall, which separates Centeroo from the campsites. Kajong0007 as Photographer, Painting By Ryan McCauley.'
      title='Graffiti by Nashville artist Ryan McCauley on the Graffiti Wall, which separates Centeroo from the campsites. Kajong0007 as Photographer, Painting By Ryan McCauley.'
      style={darkTheme ? { filter: 'grayscale(100%)' } : {}}
    />,
    <img
      src='../images/Bonnaroo_Main_Gate2016.jpg'
      alt='Main archway of Bonnaroo after the final set of 2016,by Stonyblony.'
      title='Main archway of Bonnaroo after the final set of 2016,by Stonyblony.'
      style={darkTheme ? { filter: 'grayscale(100%)' } : {}}
    />,
    <img
      src='../images/Clean_Vibes_-_Bonnaroo_2015_(19278848469).jpg'
      alt='Post Show Clean Up - Pic by Clean Vibes, LLC I feel crazy lucky to have been part of this group of people for the 2nd year in a row. Clean Vibes is a company doing so much good for festivals, the environment, patrons and employees!! by Shannon McGee from Huntsville, USA.'
      title='Post Show Clean Up - Pic by Clean Vibes, LLC I feel crazy lucky to have been part of this group of people for the 2nd year in a row. Clean Vibes is a company doing so much good for festivals, the environment, patrons and employees!! by Shannon McGee from Huntsville, USA.'
      style={darkTheme ? { filter: 'grayscale(100%)' } : {}}
    />,
    <img
      src='../images/The_Other_Tent_(4704559835).jpg'
      alt='The Other Tent, Bonnaroo Music and Arts Festival 2010 Manchester, TN By JASON ANFINSEN.'
      title='The Other Tent, Bonnaroo Music and Arts Festival 2010 Manchester, TN By JASON ANFINSEN.'
      style={darkTheme ? { filter: 'grayscale(100%)' } : {}}
    />,
    <img
      src='../images/PlanetRoo2015.jpg'
      alt='Planet Roo Scupture at Bonnaroo, 2015, by Andrew Jorgensen.'
      title='Planet Roo Scupture at Bonnaroo, 2015, by Andrew Jorgensen.'
      style={darkTheme ? { filter: 'grayscale(100%)' } : {}}
    />,
    <img
      src='../images/
Ferris_Wheel_@_Bonnaroo_(4704740385).jpg'
      alt='Great Stage Park during the 2010 Bonnaroo Music Festival, By JASON ANFINSEN'
      title='Great Stage Park during the 2010 Bonnaroo Music Festival, By JASON ANFINSEN'
      style={darkTheme ? { filter: 'grayscale(100%)' } : {}}
    />,
  ]
  return randomImages[Math.floor(Math.random() * randomImages.length)]
}
