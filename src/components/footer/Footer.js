import React from 'react';
import {Grid, Icon, Menu, Segment} from "semantic-ui-react";
import './Footer.css';

function Footer() {

  return (
    <div className="footer">
      <Segment inverted>
        <Grid columns={1} stackable textAlign='center'>
          <Menu inverted secondary>
            <Menu.Item
              name='Story'
              href='#/'
            />
            <Menu.Item
              name='Your Impact'
              href='#/interactive'
            />
            <Menu.Item
              name='Team'
              href='#/team'
            />
            <Menu.Item
              name='References'
              href='#/references'
            />
          </Menu>
        </Grid>
        <Grid id='footer-text' columns={1} stackable textAlign='center'>
          <Icon name='tree'/><span id='grawnola'>grawnola</span>
        </Grid>
      </Segment>
    </div>
  );
}

export default Footer;
