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
              name='help'
              href='/'
            />
            <Menu.Item
              name='data'
              href='/'
            />
            <Menu.Item
              name='team'
              href='/'
            />
            <Menu.Item
              name='references'
              href='/'
            />
          </Menu>
        </Grid>
        <Grid id='footer-text' columns={1} stackable textAlign='center'>
          <Icon name='fire'/><span id='grawnola'>grawnola</span>
        </Grid>
      </Segment>
    </div>
  );
}

export default Footer;
