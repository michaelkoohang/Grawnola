import React, {useEffect, useState} from 'react';
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
      <Progress
        color='green'
        progress='value'
        total={total}
        value={props.offsets}>
          <p style={{color: '#32D74B'}}>Offsets (kg)</p>
      </Progress>
      <Progress
        color='red'
        progress='value'
        value={props.emissions}
        total={total}>
          <p style={{color: '#FF453A'}}>Emissions (kg)</p>
      </Progress>
    </Container>
  );
}

export default Comparison;


