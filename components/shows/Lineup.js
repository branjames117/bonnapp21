import React from 'react'
import classes from './Lineup.module.css'
import Link from 'next/link'
import Card from '../layout/Card'

export default class Lineup extends React.Component {
  render() {
    return (
      <Card>
        <div className={classes.container}>
          <div className={classes.day}>Thursday, &nbsp; Sept. &nbsp; 2</div>
          <div className={classes.headliner}>
            <Link href='/shows/Grand Ole Opry feat. Special Guests'>
              <span className={classes.blue}>
                Grand Ole Opry feat. Special Guests
              </span>
            </Link>
          </div>
          <div className={classes.unliner}>
            <Link href='/shows/99 Neighbors'>99 Neighbors</Link>
            <Link href='/shows/Andy Frasco & the UN'>Andy Frasco & the UN</Link>
            <Link href='/shows/Big Something'>Big Something</Link>
            <Link href='/shows/Briston Maroney'>Briston Maroney</Link>
            <Link href='/shows/Dabin'>Dabin</Link>
            <Link href='/shows/Devon Gilfillian'>Devon Gilfillian</Link>
            <Link href='/shows/The Funk Hunters'>The Funk Hunters</Link>
            <Link href='/shows/Hesh'>He$h</Link>
            <Link href='/shows/Joy Oladokun'>Joy Oladokun</Link>
            <Link href='/shows/Larkin Poe'>Larkin Poe</Link>
            <Link href='/shows/Liz Cooper & the Stampede'>
              Liz Cooper & the Stampede
            </Link>
            <Link href='/shows/Mize'>Mize</Link>
            <Link href='/shows/Nubya Garcia'>Nubya Garcia</Link>
            <Link href='/shows/Scarypoolparty'>Scarypoolparty</Link>
            <Link href='/shows/Spock'>Spock</Link>
            <Link href='/shows/Sweet Crude'>Sweet Crude</Link>
            <Link href='/shows/Taska Black'>Taska Black</Link>
            <Link href='/shows/Too Many Zooz'>Too Many Zooz</Link>
            <Link href='/shows/ZIA'>ZIA</Link>
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
          <div className={classes.unliner}>
            <Link href='/shows/Grace Potter'>Grace Potter</Link>
            <Link href='/shows/Primus'>Primus</Link>
            <Link href='/shows/Nelly'>Nelly</Link>
            <Link href='/shows/The Disco Biscuits'>The Disco Biscuits</Link>
            <Link href='/shows/Dashboard Confessional'>
              Dashboard Confessional
            </Link>
            <Link href='/shows/Big Wild'>Big Wild</Link>
            <Link href='/shows/TroyBoi'>TroyBoi</Link>
            <Link href='/shows/The Marcus King Band'>The Marcus King Band</Link>
            <Link href='/shows/Lennon Stella'>Lennon Stella</Link>
            <Link href='/shows/Orville Peck'>Orville Peck</Link>
            <Link href='/shows/Kim Petras'>Kim Petras</Link>
            <Link href='/shows/Turkuaz w Jerry Harrison and Adrian Belew Remain in Light'>
              Turkuaz w/ Jerry Harrison and Adrian Belew Remain in Light
            </Link>
            <Link href='/shows/Svdden Death'>Svdden Death</Link>
            <Link href='/shows/Omar Apollo'>Omar Apollo</Link>
            <Link href='/shows/Lucii'>Lucii</Link>
            <Link href='/shows/Waxahatchee'>Waxahatchee</Link>
            <Link href='/shows/The Weather Station'>The Weather Station</Link>
            <Link href='/shows/Resistance Revival Chorus'>
              Resistance Revival Chorus
            </Link>
            <Link href='/shows/LP Giobbi'>LP Giobbi</Link>
            <Link href='/shows/Atliens'>Atliens</Link>
            <Link href='/shows/Mija'>Mija</Link>
            <Link href='/shows/Detox Unit'>Detox Unit</Link>
            <Link href='/shows/Rome in Silver'>Rome in Silver</Link>
            <Link href='/shows/Jac Ross'>Jac Ross</Link>
            <Link href='/shows/Mdou Moctar'>Mdou Moctar</Link>
            <Link href='/shows/Tripp St'>Tripp St.</Link>
            <Link href='/shows/NotLo'>NotLö</Link>
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
              <span className={classes.orange}>Phoebe Bridges</span>
            </Link>
            <Link href='/shows/Incubus'>
              <span className={classes.orange}>Incubus</span>
            </Link>
            <Link href='/shows/Seven Lions'>
              <span className={classes.orange}>Seven Lions</span>
            </Link>
          </div>
          <div className={classes.unliner}>
            <Link href={'/shows/King Gizzard and the Lizard Wizard'}>
              King Gizzard and the Lizard Wizard
            </Link>
            <Link href={'/shows/Sylvan Esso presents With'}>
              Superjam: Sylvan Esso presents "With"
            </Link>
            <Link href={'/shows/Kevin Gates'}>Kevin Gates</Link>
            <Link href={'/shows/Marc Rebillet'}>Marc Rebillet</Link>
            <Link href={'/shows/Goose'}>Goose</Link>
            <Link href={'/shows/Subtronics'}>Subtronics</Link>
            <Link href={'/shows/Surfaces'}>Surfaces</Link>
            <Link href={'/shows/JID'}>J.I.D</Link>
            <Link href={'/shows/Jon Batiste'}>Jon Batiste</Link>
            <Link href={'/shows/The Band Camino'}>The Band CAMINO</Link>
            <Link href={'/shows/Ashnikko'}>Ashnikko</Link>
            <Link href={'/shows/Yaeji'}>Yaeji</Link>
            <Link href={'/shows/Ekali'}>Ekali</Link>
            <Link href={'/shows/Tate McRae'}>Tate McRae</Link>
            <Link href={'/shows/Pinegrove'}>Pinegrove</Link>
            <Link href={'/shows/Uncle Acid & the Deadbeats'}>
              Uncle Acid & the Deadbeats
            </Link>
            <Link href={'/shows/Remi Wolf'}>Remi Wolf</Link>
            <Link href={'/shows/Wooli'}>Wooli</Link>
            <Link href={'/shows/Dr Fresch'}>Dr. Fresch</Link>
            <Link href={'/shows/William Black'}>William Black</Link>
            <Link href={'/shows/Christone Kingfish Ingram'}>
              Christone "Kingfish" Ingram
            </Link>
            <Link href={'/shows/Flamingosis'}>Flamingosis</Link>
            <Link href={'/shows/Hero the Band'}>Hero the Band</Link>
            <Link href={'/shows/Level Up'}>Level Up</Link>
            <Link href={'/shows/DJ Mel'}>DJ Mel</Link>
            <Link href={'/shows/Almost Monday'}>Almost Monday</Link>
            <Link href={'/shows/Lick'}>Lick</Link>
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
          <div className={classes.unliner}>
            <Link href={'/shows/Flogging Molly'}>Flogging Molly</Link>
            <Link href={'/shows/Boombox Cartel'}>Boombox Cartel</Link>
            <Link href={'/shows/Greensky Bluegrass'}>Greensky Bluegrass</Link>
            <Link href={'/shows/The Struts'}>The Struts</Link>
            <Link href={'/shows/Caamp'}>Caamp</Link>
            <Link href={'/shows/Oliver Tree'}>Oliver Tree</Link>
            <Link href={'/shows/Peekaboo'}>Peekaboo</Link>
            <Link href={'/shows/Julien Baker'}>Julien Baker</Link>
            <Link href={'/shows/LSDream'}>LSDream</Link>
            <Link href={'/shows/Colony House'}>Colony House</Link>
            <Link href={'/shows/Flo Milli'}>Flo Milli</Link>
            <Link href={'/shows/Breland'}>Breland</Link>
            <Link href={'/shows/Niko Moon'}>Niko Moon</Link>
            <Link href={'/shows/Jamila Woods'}>Jamila Woods</Link>
            <Link href={'/shows/Bill Frisell'}>
              Bill Frisell: Harmony featuring Petra Haden, Hank Roberts & Luke
              Bergman
            </Link>
            <Link href={'/shows/Luzcid'}>Luzcid</Link>
            <Link href={'/shows/Elderbrook'}>Elderbrook</Link>
            <Link href={'/shows/Makaya McCraven'}>Makaya McCraven</Link>
          </div>
          <div className={classes.day}>The Who Stage</div>
          <div className={classes.unliner}>
            <Link href={'/shows/Bailey Bryan'}>Bailey Bryan</Link>
            <Link href={'/shows/Brandon "Taz" Niederauer'}>
              Brandon "Taz" Niederauer
            </Link>
            <Link href={'/shows/Bre Kennedy'}>Bre Kennedy</Link>
            <Link href={'/shows/Bren Joy<'}>Bren Joy</Link>
            <Link href={'/shows/Calder Allen'}>Calder Allen</Link>
            <Link href={'/shows/Charlotte Sands'}>Charlotte Sands</Link>
            <Link href={'/shows/Concrete Castles'}>Concrete Castles</Link>
            <Link href={'/shows/Early James'}>Early James</Link>
            <Link href={'/shows/Frances Cone'}>Frances Cone</Link>
            <Link href={'/shows/Goldpark'}>Goldpark</Link>
            <Link href={'/shows/Garcia Peoples'}>Garcia Peoples</Link>
            <Link href={'/shows/Grlwood'}>Grlwood</Link>
            <Link href={'/shows/Hailey Whitters'}>Hailey Whitters</Link>
            <Link href={'/shows/Jake Wesley Rogers'}>Jake Wesley Rogers</Link>
            <Link href={'/shows/Leon of Athens'}>Leon of Athens</Link>
            <Link href={'/shows/Michaela Anne'}>Michaela Anne</Link>
            <Link href={'/shows/Neal Francis'}>Neal Francis</Link>
            <Link href={'/shows/Ona'}>Ona</Link>
            <Link href={'/shows/Robyn Ottolini'}>Robyn Ottolini</Link>
            <Link href={'/shows/Rookie'}>Rookie</Link>
            <Link href={'/shows/Stephen Sanchez'}>Stephen Sanchez</Link>
            <Link href={'/shows/The Lil Smokies'}>The Lil Smokies</Link>
            <Link href={'/shows/The Unlikely Candidates'}>
              The Unlikely Candidates
            </Link>
          </div>
          <h3>Silent Disco:</h3>
          <Link href={'/shows/DJ Mel'}>DJ Mel</Link>
          {' • '}
          <Link href={'/shows/Flamingosis'}>Flamingosis</Link>
        </div>
      </Card>
    )
  }
}
