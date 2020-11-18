import React, {useEffect, useState} from 'react';
import {round} from 'lodash'
import {Container, Progress} from 'semantic-ui-react';

function Comparison({emissions, offsets}) {

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (offsets > emissions) {
      setTotal(round(offsets, 2));
    } else {
      setTotal(round(emissions, 2));
    }
  }, [emissions, offsets]);

  return (
    <Container className='comparison-container'>
      <Progress
        color='green'
        progress='value'
        total={total}
        value={round(offsets, 2)}>
          <p style={{color: '#32D74B'}}>Offsets (kg)</p>
      </Progress>
      <Progress
        color='red'
        progress='value'
        value={round(emissions, 2)}
        total={total}>
          <p style={{color: '#FF453A'}}>Emissions (kg)</p>
      </Progress>
    </Container>
  );
}

export default Comparison;


