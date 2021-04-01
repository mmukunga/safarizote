import React from 'react';

const Tableless = props => {
    console.log('Mukunga1');
    //const { cards } = props;
    console.log(props);
    console.log('Mukunga2');
    const Card = (props) => {
        console.log('Mukunga3');
        console.log(props);
        console.log('Mukunga4');
        return (
        <div style={{ margin: '1em' }}>            
            <div class="tableWrap">
                <div class="tableCol">{props.title}</div>
                <div class="tableCol">{props.description}</div>
            </div>
        </div>
        )
    }
    return (
    <div>
      Macharia XX
      {props && props.data.map(card => (
        <Card {...card} />
      ))}
    </div>
  );
} 
export default Tableless; 