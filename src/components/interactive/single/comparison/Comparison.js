import React, {useEffect, useState} from 'react';
import './Comparison.css';
import {Container, Progress} from "semantic-ui-react";

function Comparison(props) {

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (props.offsets > props.emissions) {
      setTotal(props.offsets);
    } else {
      setTotal(props.emissions);
    }
  }, [props]);

  return (
    <Container className='comparison-container'>
      <Progress progress='value' value={props.offsets} total={total} success>Offsets (kg)</Progress>
      <Progress progress='value' value={props.emissions} total={total} error>Emissions (kg)</Progress>
    </Container>
  );
}

export default Comparison;


