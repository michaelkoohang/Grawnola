import React from 'react';
import {Container, List} from "semantic-ui-react";
import {map} from 'lodash';
import './References.css';

import refs from '../../data/references/references.json';

function References() {

  return (
    <Container className='references-container'>
      <h1>References</h1>
      <hr />
      <h3>Narrative</h3>
      <List bulleted inverted>
        { 
          map((refs.narrative), (ref) => (
            <List.Item>
              {ref.slide}
              <List.List>
              {
                map((ref.items), item => (
                  <List.Item>
                    <a href={item.link}target='_blank' rel="noopener noreferrer">{item.name}</a>
                  </List.Item>
                ))      
              }
              </List.List>
            </List.Item>
          ))
        }  
      </List>
      <h3>Interactive</h3>
      <List bulleted inverted>
        {
          map((refs.interactive), (ref) => (
            <List.Item>
              {ref.section}
              <List.List>
              {
                map((ref.items), item => (
                  <List.Item>
                    <a href={item.link}target='_blank' rel="noopener noreferrer">{item.name}</a>
                  </List.Item>
                ))      
              }
              </List.List>
            </List.Item>
          ))
        } 
      </List>
    </Container>
  );
}

export default References;
