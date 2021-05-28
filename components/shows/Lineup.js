import React from 'react'
import classes from './Lineup.module.css'
import Link from 'next/link'

export default class Lineup extends React.Component {
  render(props) {
    return (
      <div className={classes.center}>
        <div className={classes.day}>Thursday, &nbsp; Sept. &nbsp; 2</div>

        <div className={classes.headliner}>
          <span className={classes.blue}>
            Grand Ole Opry feat. Special Guests
          </span>
        </div>
        <div className={classes.unliner}>
          <span>99 Neighbors</span>
          <span>Andy Frasco & the UN</span>
          <span>
            Big Something
            <br />
          </span>
          <span>Briston Maroney</span>
          <span>Dabin</span>
          <span>
            Devon Gilfillian
            <br />
          </span>
          <span>The Funk Hunters</span>
          <span>He$h</span>
          <span>
            Joy Oladokun
            <br />
          </span>
          <span>Larkin Poe</span>
          <span>Liz Cooper & the Stampede</span>
          <span>
            Mize
            <br />
          </span>
          <span>Nubya Garcia</span>
          <span>ScaryPoolParty</span>
          <span>
            Spock
            <br />
          </span>
          <span>Sweet Crude</span>
          <span>Taska Black</span>
          <span>Too Many Zoos</span>
          <span>Zia</span>
        </div>

        <div className={classes.day}>Friday, &nbsp; Sept. &nbsp; 3</div>
        <div className={classes.headliner}>
          <span className={classes.green}>
            <Link href='/shows/Foo Fighters'>Foo Fighters</Link>
          </span>
          <span className={classes.blue}>
            <Link href='/shows/Megan Thee Stallion'>Megan Thee Stallion</Link>
          </span>
        </div>
        <div className={classes.subliner}>
          <span className={classes.pink}>Run the Jewels</span>
          <span className={classes.pink}>Janelle Monae</span>
          <span className={classes.pink}>Glass Animals</span>
          <br />
          <span className={classes.pink}>Deftones</span>
          <span className={classes.pink}>Young Thug</span>
          <span className={classes.pink}>Tipper</span>
          <span className={classes.pink}>Jack Harlow</span>
        </div>
        <div className={classes.unliner}>
          <span>Grace Potter</span>
          <span>Primus</span>
          <span>Nelly</span>
          <span>
            The Disco Biscuits
            <br />
          </span>
          <span>Dashboard Confessional</span>
          <span>Big Wild</span>
          <span>Troyboi</span>
          <span>
            Marcus King Band
            <br />
          </span>
          <span>Lennon Stella</span>
          <span>Orville Peck</span>
          <span>
            Kim Petras
            <br />
          </span>
          <span>
            Turkuaz w/ Jerry Harrison and Adrian Belew <em>Remain in Light</em>
            <br />
          </span>
          <span>Svdden Death</span>
          <span>Omar Apollo</span>
          <span>Lucii</span>
          <span>
            Waxahatchee
            <br />
          </span>
          <span>The Weather Station</span>
          <span>Resistance Revival Chorus</span>
          <span>
            LP Giobbi
            <br />
          </span>
          <span>Atliens</span>
          <span>Mija</span>
          <span>Detox Unit</span>
          <span>
            Rome in Silver
            <br />
          </span>
          <span>Jac Ross</span>
          <span>Mdou Moctar</span>
          <span>Tripp St.</span>
          <span>Notlo</span>
        </div>

        <div className={classes.day}>Saturday, &nbsp; Sept. &nbsp; 4</div>
        <div className={classes.headliner}>
          <span className={classes.green}>Lizzo</span>
          <span className={classes.pink}>Tame Impala</span>
        </div>
        <div className={classes.subliner}>
          <span className={classes.orange}>My Morning Jacket</span>
          <span className={classes.orange}>
            G-Eazy
            <br />
          </span>
          <span className={classes.orange}>
            Jason Isbell and the 400 Unit
            <br />
          </span>
          <span className={classes.orange}>Phoebe Bridges</span>
          <span className={classes.orange}>Incubus</span>
          <span className={classes.orange}>Seven Lions</span>
        </div>
        <div className={classes.unliner}>
          <span>
            King Gizzard and the Lizard Wizard
            <br />
          </span>
          <span>
            Superjam: Sylvan Esso presents "With"
            <br />
          </span>
          <span>Kevin Gates</span>
          <span>Marc Rebillet</span>
          <span>
            Goose
            <br />
          </span>
          <span>Subtronics</span>
          <span>Surfaces</span>
          <span>J.I.D</span>
          <span>
            Jon Batiste
            <br />
          </span>
          <span>The Band Camino</span>
          <span>Ashnikko</span>
          <span>Yaeji</span>
          <span>
            Ekali
            <br />
          </span>
          <span>Tate McRae</span>
          <span>Pinegrove</span>
          <span>
            Uncle Acid & the Deadbeats
            <br />
          </span>
          <span>Remi Wolf</span>
          <span>Wooli</span>
          <span>Dr. Fresch</span>
          <span>
            William Black
            <br />
          </span>
          <span>Christone "Kingfish" Ingram</span>
          <span>Flamingosis</span>
          <span>
            Hero the Band
            <br />
          </span>
          <span>Level Up</span>
          <span>DJ Mel</span>
          <span>Almost Monday</span>
          <span>Lick</span>
        </div>

        <div className={classes.day}>Sunday, &nbsp; Sept. &nbsp; 5</div>
        <div className={classes.headliner}>
          <span className={classes.green}>Tyler, the Creator</span>
          <span className={classes.orange}>Lana del Rey</span>
        </div>
        <div className={classes.subliner}>
          <span className={classes.yellow}>Lil Baby</span>
          <span className={classes.yellow}>Deadmau5</span>
          <span className={classes.yellow}>
            Leon Bridges
            <br />
          </span>
          <span className={classes.yellow}>Young the Giant</span>
          <span className={classes.yellow}>Brittany Howard</span>
        </div>
        <div className={classes.unliner}>
          <span>
            <Link href='/shows/Flogging Molly'>Flogging Molly</Link>
          </span>
          <span>Boombox Cartel</span>
          <span>
            Greensky Bluegrass
            <br />
          </span>
          <span>The Struts</span>
          <span>Caamp</span>
          <span>Oliver Tree</span>
          <span>
            Peekaboo
            <br />
          </span>
          <span>Julien Baker</span>
          <span>LSDream</span>
          <span>Colony House</span>
          <span>
            Flo Milli
            <br />
          </span>
          <span>Breland</span>
          <span>Niko Moon</span>
          <span>Jamila Woods</span>
          <span>
            Bill Frisell
            <br />
          </span>
          <span>
            Harmony featuring Petra Haden, Hank Roberts & Luke Bergman
            <br />
          </span>
          <span>Luzcid</span>
          <span>Elderbrook</span>
          <span>Makaya McCraven</span>
        </div>
      </div>
    )
  }
}
