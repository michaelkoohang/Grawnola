import React from 'react';
import {Icon, Table} from "semantic-ui-react";
import {map} from 'lodash';

function Emissions(props) {
  const {gases, sectors} = props.data;

  return (
    <div className='table-container'>
      <Table celled inverted structured>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='8' textAlign='center'>
              Opportunities for Reducing Emissions
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell rowSpan='2'>
              Gas
            </Table.HeaderCell>
            <Table.HeaderCell colSpan='7' textAlign='center'>
              Sectors
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            {map(sectors, sector => (
              <Table.HeaderCell key={sector.key}>{sector.name}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {map(gases, gas => (
            <Table.Row key={gas.key}>
              <Table.Cell>{gas.name}</Table.Cell>
              {map(gas.emissions, (sector, i) => (
                <Table.Cell key={`${gas.key}-sector-${i}`} textAlign='center'>
                  {sector.value
                    ? <Icon color='green' name='checkmark' size='large' />
                    : ''
                  }
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Emissions;
