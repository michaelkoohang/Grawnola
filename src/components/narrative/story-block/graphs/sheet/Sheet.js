import React from 'react';
import './Sheet.css';
import emissions from '../../../../../data/narrative/emissions.json';
import offsets from '../../../../../data/narrative/offsets.json';
import {Icon} from "semantic-ui-react";

function Sheet(props) {

  return (
    <div className="sheet">
      { props.type === "emissions" &&
        emissions.map((item, index) => (
          <div className="item" key={index}>
            <Icon className="item-icon" name={item.icon} color="red"/>
            <p className="item-text" dangerouslySetInnerHTML={{__html: item.text}}/>
          </div>
        ))
      }
      { props.type === "offsets" &&
      offsets.map((item, index) => (
        <div className="item" key={index}>
          <Icon className="item-icon" name={item.icon} color="green"/>
          <p className="item-text" dangerouslySetInnerHTML={{__html: item.text}}/>
        </div>
      ))
      }
    </div>
  );
}

export default Sheet;
