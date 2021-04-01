import React from 'react';

const Tableless = props => {
    console.log('Mukunga1');
    const { cards } = props;
    console.log('Mukunga2');
    const Card = ({title, description}) => {
        console.log('Mukunga');
        return (
        <div style={{ margin: '1em' }}>            
            <div class="tableWrap">
                <div class="tableCol">{title}</div>
                <div class="tableCol">{description}</div>
            </div>
        </div>
        )
    }
    return (
    <div>
      Macharia XX
      {cards && cards.data.map(card => (
        <Card {...card} />
      ))}
    </div>
  );
} 
export default Tableless; 