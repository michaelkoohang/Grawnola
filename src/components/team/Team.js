import React from 'react';
import {Container, Card, Icon} from "semantic-ui-react";
import './Team.css';
import bea from '../../img/bea.JPG';
import michael from '../../img/michael.jpg';
import kunal from '../../img/kunal.jpg';
import toma from '../../img/toma.jpg';

const emails = {
  bea: <a href="mailto:bepa@gatech.edu"><Icon name='mail' />bepa@gatech.edu</a>,
  michael: <a href="mailto:koohang@gatech.edu"><Icon name='mail' />koohang@gatech.edu</a>,
  kunal: <a href="mailto:@gatech.edu"><Icon name='mail' />kdhodapkar3@gatech.edu</a>,
  toma: <a href="mailto:tzubatiy3@gatech.edu"><Icon name='mail' />tzubatiy3@gatech.edu</a>
}

function Teams() {

  return (
    <Container className='team-container'>
      <h1>Meet the Team</h1>
      <Card.Group itemsPerRow={4}>
      <Card
        image={bea}
        header='Beatriz Palacios'
        meta='Computer Science Ph.D. Candidate'
        description='Beatriz is a Ph.D. student at Georgia Tech. She enjoys hiking and cooking tasty Venezuelan food. Her advisor is Dr. Ellen Zegura.'
        extra={emails.bea}
      />
      <Card
        image={michael}
        header='Michael Koohang'
        meta='Computer Science M.S. Candidate'
        description='Michael is an incoming Software Engineer at Nike. He enjoys playing soccer and riding his electric skateboard. His advisor is Dr. Ellen Zegura.'
        extra={emails.michael}
      />
      <Card
        image={kunal}
        header='Kunal Dhodapkar'
        meta='MS-HCI Candidate'
        description='Kunal is a techie-turned-designer. Currently in the MS-HCI program at Georgia Tech, he loves designing experiences that empower people. His advisor is Dr. Elizabeth Mynatt.'
        extra={emails.kunal}
      />
      <Card
        image={toma}
        header='Tamara Zubatiy'
        meta='Human-Centered Computing Ph.D. Candidate'
        description='Tamara is a Ph.D. student at Georgia Tech studying Human-Centered Computing. She is a researcher at the Everyday Computing Lab and her advisor is Dr. Elizabeth Mynatt.'
        extra={emails.toma}
      />
      </Card.Group>
    </Container>
  );
}

export default Teams;
