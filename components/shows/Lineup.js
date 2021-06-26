import React from 'react'
import classes from './Lineup.module.css'
import Link from 'next/link'
import Card from '../layout/Card'

export default class Lineup extends React.Component {
  render() {
    return (
      <div className={classes.container}>
        <Card>
          <div className={classes.day}>Thursday, &nbsp; Sept. &nbsp; 2</div>
          <div className={classes.headliner}>
            <Link href='/shows/Grand Ole Opry feat. Special Guests'>
              <span className={classes.blue}>
                Grand Ole Opry feat. Special Guests
              </span>
            </Link>
          </div>
          <div className={classes.thursday}>
            <Link href='/shows/99 Neighbors'>
              <span>99 Neighbors</span>
            </Link>
            <Link href='/shows/Andy Frasco and the UN'>
              <span>Andy Frasco & The U.N.</span>
            </Link>
            <Link href='/shows/Big Something'>
              <span>Big Something</span>
            </Link>
            <Link href='/shows/Briston Maroney'>
              <span>Briston Maroney</span>
            </Link>
            <Link href='/shows/Dabin'>
              <span>Dabin</span>
            </Link>
            <Link href='/shows/Devon Gilfillian'>
              <span>Devon Gilfillian</span>
            </Link>
            <Link href='/shows/The Funk Hunters'>
              <span>The Funk Hunters</span>
            </Link>
            <Link href='/shows/Hesh'>
              <span>He$h</span>
            </Link>
            <Link href='/shows/Joy Oladokun'>
              <span>Joy Oladokun</span>
            </Link>
            <Link href='/shows/Larkin Poe'>
              <span>Larkin Poe</span>
            </Link>
            <Link href='/shows/Liz Cooper and the Stampede'>
              <span>Liz Cooper & The Stampede</span>
            </Link>
            <Link href='/shows/Mize'>
              <span>Mize</span>
            </Link>
            <Link href='/shows/Nubya Garcia'>
              <span>Nubya Garcia</span>
            </Link>
            <Link href='/shows/Scarypoolparty'>
              <span>Scarypoolparty</span>
            </Link>
            <Link href='/shows/Spock'>
              <span>Spock</span>
            </Link>
            <Link href='/shows/Sweet Crude'>
              <span>Sweet Crude</span>
            </Link>
            <Link href='/shows/Taska Black'>
              <span>Taska Black</span>
            </Link>
            <Link href='/shows/Too Many Zooz'>
              <span>Too Many Zooz</span>
            </Link>
            <Link href='/shows/ZIA'>
              <span>ZIA</span>
            </Link>
          </div>
          <div className={classes.day}>Friday, &nbsp; Sept. &nbsp; 3</div>
          <div className={classes.headliner}>
            <Link href={'/shows/Foo Fighters'}>
              <span className={classes.green}>Foo Fighters</span>
            </Link>
            <Link href='/shows/Megan Thee Stallion'>
              <span className={classes.blue}>Megan Thee Stallion</span>
            </Link>
          </div>
          <div className={classes.subliner}>
            <Link href='/shows/Run the Jewels'>
              <span className={classes.pink}>Run the Jewels</span>
            </Link>
            <Link href='/shows/Janelle Monae'>
              <span className={classes.pink}>Janelle Monae</span>
            </Link>
            <Link href='/shows/Glass Animals'>
              <span className={classes.pink}>Glass Animals</span>
            </Link>
            <Link href='/shows/Deftones'>
              <span className={classes.pink}>Deftones</span>
            </Link>
            <Link href='/shows/Young Thug'>
              <span className={classes.pink}>Young Thug</span>
            </Link>
            <Link href='/shows/Tipper'>
              <span className={classes.pink}>Tipper</span>
            </Link>
            <Link href='/shows/Jack Harlow'>
              <span className={classes.pink}>Jack Harlow</span>
            </Link>
          </div>
          <div className={classes.friday}>
            <Link href='/shows/Grace Potter'>
              <span>Grace Potter</span>
            </Link>
            <Link href='/shows/Primus'>
              <span>Primus</span>
            </Link>
            <Link href='/shows/Nelly'>
              <span>Nelly</span>
            </Link>
            <Link href='/shows/The Disco Biscuits'>
              <span>The Disco Biscuits</span>
            </Link>
            <Link href='/shows/Dashboard Confessional'>
              <span>Dashboard Confessional</span>
            </Link>
            <Link href='/shows/Big Wild'>
              <span>Big Wild</span>
            </Link>
            <Link href='/shows/TroyBoi'>
              <span>TroyBoi</span>
            </Link>
            <Link href='/shows/The Marcus King Band'>
              <span>The Marcus King Band</span>
            </Link>
            <Link href='/shows/Lennon Stella'>
              <span>Lennon Stella</span>
            </Link>
            <Link href='/shows/Orville Peck'>
              <span>Orville Peck</span>
            </Link>
            <Link href='/shows/Kim Petras'>
              <span>Kim Petras</span>
            </Link>
            <Link href='/shows/Turkuaz w Jerry Harrison and Adrian Belew Remain in Light'>
              <span>
                Turkuaz w/ Jerry Harrison and Adrian Belew Remain in Light
              </span>
            </Link>
            <Link href='/shows/Svdden Death'>
              <span>Svdden Death</span>
            </Link>
            <Link href='/shows/Omar Apollo'>
              <span>Omar Apollo</span>
            </Link>
            <Link href='/shows/Lucii'>
              <span>Lucii</span>
            </Link>
            <Link href='/shows/Waxahatchee'>
              <span>Waxahatchee</span>
            </Link>
            <Link href='/shows/The Weather Station'>
              <span>The Weather Station</span>
            </Link>
            <Link href='/shows/Resistance Revival Chorus'>
              <span>Resistance Revival Chorus</span>
            </Link>
            <Link href='/shows/LP Giobbi'>
              <span>LP Giobbi</span>
            </Link>
            <Link href='/shows/Atliens'>
              <span>Atliens</span>
            </Link>
            <Link href='/shows/Mija'>
              <span>Mija</span>
            </Link>
            <Link href='/shows/Detox Unit'>
              <span>Detox Unit</span>
            </Link>
            <Link href='/shows/Rome in Silver'>
              <span>Rome in Silver</span>
            </Link>
            <Link href='/shows/Jac Ross'>
              <span>Jac Ross</span>
            </Link>
            <Link href='/shows/Mdou Moctar'>
              <span>Mdou Moctar</span>
            </Link>
            <Link href='/shows/Tripp St'>
              <span>Tripp St.</span>
            </Link>
            <Link href='/shows/NotLo'>
              <span>NotLö</span>
            </Link>
          </div>
          <div className={classes.day}>Saturday, &nbsp; Sept. &nbsp; 4</div>
          <div className={classes.headliner}>
            <Link href={'/shows/Lizzo'}>
              <span className={classes.green}>Lizzo</span>
            </Link>
            <Link href={'/shows/Tame Impala'}>
              <span className={classes.pink}>Tame Impala</span>
            </Link>
          </div>
          <div className={classes.subliner}>
            <Link href='/shows/My Morning Jacket'>
              <span className={classes.orange}>My Morning Jacket</span>
            </Link>
            <Link href='/shows/G-Eazy'>
              <span className={classes.orange}>G-Eazy</span>
            </Link>
            <Link href='/shows/Jason Isbell and the 400 Unit'>
              <span className={classes.orange}>
                Jason Isbell and the 400 Unit
              </span>
            </Link>
            <Link href='/shows/Phoebe Bridgers'>
              <span className={classes.orange}>Phoebe Bridgers</span>
            </Link>
            <Link href='/shows/Incubus'>
              <span className={classes.orange}>Incubus</span>
            </Link>
            <Link href='/shows/Seven Lions'>
              <span className={classes.orange}>Seven Lions</span>
            </Link>
          </div>
          <div className={classes.saturday}>
            <Link href={'/shows/King Gizzard and the Lizard Wizard'}>
              <span>King Gizzard and the Lizard Wizard</span>
            </Link>
            <Link href={'/shows/Sylvan Esso presents With'}>
              <span>Superjam: Sylvan Esso presents "With"</span>
            </Link>
            <Link href={'/shows/Kevin Gates'}>
              <span>Kevin Gates</span>
            </Link>
            <Link href={'/shows/Marc Rebillet'}>
              <span>Marc Rebillet</span>
            </Link>
            <Link href={'/shows/Goose'}>
              <span>Goose</span>
            </Link>
            <Link href={'/shows/Subtronics'}>
              <span>Subtronics</span>
            </Link>
            <Link href={'/shows/Surfaces'}>
              <span>Surfaces</span>
            </Link>
            <Link href={'/shows/JID'}>
              <span>J.I.D</span>
            </Link>
            <Link href={'/shows/Jon Batiste'}>
              <span>Jon Batiste</span>
            </Link>
            <Link href={'/shows/The Band Camino'}>
              <span>The Band CAMINO</span>
            </Link>
            <Link href={'/shows/Ashnikko'}>
              <span>Ashnikko</span>
            </Link>
            <Link href={'/shows/Yaeji'}>
              <span>Yaeji</span>
            </Link>
            <Link href={'/shows/Ekali'}>
              <span>Ekali</span>
            </Link>
            <Link href={'/shows/Tate McRae'}>
              <span>Tate McRae</span>
            </Link>
            <Link href={'/shows/Pinegrove'}>
              <span>Pinegrove</span>
            </Link>
            <Link href={'/shows/Uncle Acid and the Deadbeats'}>
              <span>Uncle Acid & the Deadbeats</span>
            </Link>
            <Link href={'/shows/Remi Wolf'}>
              <span>Remi Wolf</span>
            </Link>
            <Link href={'/shows/Wooli'}>
              <span>Wooli</span>
            </Link>
            <Link href={'/shows/Dr Fresch'}>
              <span>Dr. Fresch</span>
            </Link>
            <Link href={'/shows/William Black'}>
              <span>William Black</span>
            </Link>
            <Link href={'/shows/Christone Kingfish Ingram'}>
              <span>Christone "Kingfish" Ingram</span>
            </Link>
            <Link href={'/shows/Flamingosis'}>
              <span>Flamingosis</span>
            </Link>
            <Link href={'/shows/Hero the Band'}>
              <span>Hero the Band</span>
            </Link>
            <Link href={'/shows/Level Up'}>
              <span>Level Up</span>
            </Link>
            <Link href={'/shows/DJ Mel'}>
              <span>DJ Mel</span>
            </Link>
            <Link href={'/shows/Almost Monday'}>
              <span>Almost Monday</span>
            </Link>
            <Link href={'/shows/Lick'}>
              <span>Lick</span>
            </Link>
          </div>
          <div className={classes.day}>Sunday, &nbsp; Sept. &nbsp; 5</div>
          <div className={classes.headliner}>
            <Link href={'/shows/Tyler the Creator'}>
              <span className={classes.green}>Tyler, the Creator</span>
            </Link>
            <Link href={'/shows/Lana del Rey'}>
              <span className={classes.orange}>Lana del Rey</span>
            </Link>
          </div>
          <div className={classes.subliner}>
            <Link href={'/shows/Lil Baby'}>
              <span className={classes.yellow}>Lil Baby</span>
            </Link>
            <Link href={'/shows/Deadmau5'}>
              <span className={classes.yellow}>Deadmau5</span>
            </Link>
            <Link href={'/shows/Leon Bridges'}>
              <span className={classes.yellow}>Leon Bridges</span>
            </Link>
            <Link href={'/shows/Young the Giant'}>
              <span className={classes.yellow}>Young the Giant</span>
            </Link>
            <Link href={'/shows/Brittany Howard'}>
              <span className={classes.yellow}>Brittany Howard</span>
            </Link>
          </div>
          <div className={classes.sunday}>
            <Link href={'/shows/Flogging Molly'}>
              <span>Flogging Molly</span>
            </Link>
            <Link href={'/shows/Boombox Cartel'}>
              <span>Boombox Cartel</span>
            </Link>
            <Link href={'/shows/Greensky Bluegrass'}>
              <span>Greensky Bluegrass</span>
            </Link>
            <Link href={'/shows/The Struts'}>
              <span>The Struts</span>
            </Link>
            <Link href={'/shows/Caamp'}>
              <span>Caamp</span>
            </Link>
            <Link href={'/shows/Oliver Tree'}>
              <span>Oliver Tree</span>
            </Link>
            <Link href={'/shows/Peekaboo'}>
              <span>Peekaboo</span>
            </Link>
            <Link href={'/shows/Julien Baker'}>
              <span>Julien Baker</span>
            </Link>
            <Link href={'/shows/LSDream'}>
              <span>LSDream</span>
            </Link>
            <Link href={'/shows/Colony House'}>
              <span>Colony House</span>
            </Link>
            <Link href={'/shows/Flo Milli'}>
              <span>Flo Milli</span>
            </Link>
            <Link href={'/shows/Breland'}>
              <span>Breland</span>
            </Link>
            <Link href={'/shows/Niko Moon'}>
              <span>Niko Moon</span>
            </Link>
            <Link href={'/shows/Jamila Woods'}>
              <span>Jamila Woods</span>
            </Link>
            <Link href={'/shows/Bill Frisell'}>
              <span>
                Bill Frisell: Harmony featuring Petra Haden, Hank Roberts & Luke
                Bergman
              </span>
            </Link>
            <Link href={'/shows/Luzcid'}>
              <span>Luzcid</span>
            </Link>
            <Link href={'/shows/Elderbrook'}>
              <span>Elderbrook</span>
            </Link>
            <Link href={'/shows/Makaya McCraven'}>
              <span>Makaya McCraven</span>
            </Link>
          </div>
          <div className={classes.day}>The Who Stage</div>
          <div className={classes.who}>
            <Link href={'/shows/Bailey Bryan'}>
              <span>Bailey Bryan</span>
            </Link>
            <Link href={'/shows/Brandon "Taz" Niederauer'}>
              <span>Brandon "Taz" Niederauer</span>
            </Link>
            <Link href={'/shows/Bre Kennedy'}>
              <span>Bre Kennedy</span>
            </Link>
            <Link href={'/shows/Bren Joy<'}>
              <span>Bren Joy</span>
            </Link>
            <Link href={'/shows/Calder Allen'}>
              <span>Calder Allen</span>
            </Link>
            <Link href={'/shows/Charlotte Sands'}>
              <span>Charlotte Sands</span>
            </Link>
            <Link href={'/shows/Concrete Castles'}>
              <span>Concrete Castles</span>
            </Link>
            <Link href={'/shows/Early James'}>
              <span>Early James</span>
            </Link>
            <Link href={'/shows/Frances Cone'}>
              <span>Frances Cone</span>
            </Link>
            <Link href={'/shows/Goldpark'}>
              <span>Goldpark</span>
            </Link>
            <Link href={'/shows/Garcia Peoples'}>
              <span>Garcia Peoples</span>
            </Link>
            <Link href={'/shows/Grlwood'}>
              <span>Grlwood</span>
            </Link>
            <Link href={'/shows/Hailey Whitters'}>
              <span>Hailey Whitters</span>
            </Link>
            <Link href={'/shows/Jake Wesley Rogers'}>
              <span>Jake Wesley Rogers</span>
            </Link>
            <Link href={'/shows/Leon of Athens'}>
              <span>Leon of Athens</span>
            </Link>
            <Link href={'/shows/Michaela Anne'}>
              <span>Michaela Anne</span>
            </Link>
            <Link href={'/shows/Neal Francis'}>
              <span>Neal Francis</span>
            </Link>
            <Link href={'/shows/Ona'}>
              <span>Ona</span>
            </Link>
            <Link href={'/shows/Robyn Ottolini'}>
              <span>Robyn Ottolini</span>
            </Link>
            <Link href={'/shows/Rookie'}>
              <span>Rookie</span>
            </Link>
            <Link href={'/shows/Stephen Sanchez'}>
              <span>Stephen Sanchez</span>
            </Link>
            <Link href={'/shows/The Lil Smokies'}>
              <span>The Lil Smokies</span>
            </Link>
            <Link href={'/shows/The Unlikely Candidates'}>
              <span>The Unlikely Candidates</span>
            </Link>
            <h3>Silent Disco</h3>
            <Link href={'/shows/DJ Mel'}>
              <span>DJ Mel</span>
            </Link>
            <Link href={'/shows/Flamingosis'}>
              <span>Flamingosis</span>
            </Link>
          </div>
        </Card>
      </div>
    )
  }
}
