import React from 'react';
import './StoryBlock.css';
import text from '../../../data/narrative/text.json';
import {Container, Grid, Icon, Image} from "semantic-ui-react";
import Sheet from "./graphic/sheet/Sheet";
import EmissionsTotals from "./graphic/emissions/EmissionsTotals";
import earthBad from '../../../img/earth-bad.png';

function StoryBlock(props) {

  return (
    <div className="story-block">
      { props.story >= 0 &&
        <Grid columns={2}>
          <Grid.Column >
            <h1 className="story-heading" dangerouslySetInnerHTML={{__html: text[props.story].heading}}/>
            {text[props.story].subtext.length > 0 &&
            <p className="story-subtext" dangerouslySetInnerHTML={{__html: text[props.story].subtext}}/>
            }
            {text[props.story].facts.length > 0 &&
            text[props.story].facts.map((fact, index) => (
              <div className="fact" key={index}>
                <Icon className="fact-icon" name={fact.icon} color={fact.icon_color}/>
                <p className="fact-text" dangerouslySetInnerHTML={{__html: fact.text}}/>
              </div>
            ))
            }
          </Grid.Column>
          <Grid.Column>
            { props.story === 0 && // temp and co2
              <Container>
                <Image className="earth-bad" src={earthBad} alt="Red earth" fluid centered/>
              </Container>
            }
            { props.story === 1 && // sea levels and ice caps
              <p>INSERT GRAPH</p>
            }
            { props.story === 2 && // greenhouse gases
              <EmissionsTotals />
              // <Sheet type="emissions"/>
            }
            { props.story === 3 &&
              // <Sheet type="offsets"/>
              <p>INSERT GRAPH</p>
            }
            { props.story === 4 &&
              <p>INSERT GRAPH</p>
            }
          </Grid.Column>
        </Grid>
      }
    </div>
  );
}

export default StoryBlock;
