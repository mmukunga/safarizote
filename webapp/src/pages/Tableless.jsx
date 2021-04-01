import React from 'react';

const Tableless = props => {
    const { cards } = props;
    const Card = props => {
        return (
        <div style={{ margin: '1em' }}>            
            <div class="tableWrap">
                <div class="tableCol">{props.title}</div>
                <div class="tableCol">{props.description}</div>
            </div>
        </div>
        )
    }
    return(
    <div>
      {cards.map(card => (
        <Card {...card} />
      ))}
    </div>
  );
} 
export default Tableless; 