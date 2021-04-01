import React from 'react';
import parse from "html-react-parser";

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
                <div class="tableCol">{Number.isInteger(props.title) ? props.title : parse(props.title)}</div>
                <div class="tableCol">{Number.isInteger(props.description) ? props.description : parse(props.description)}</div>
            </div>
        </div>
        )
    }
    return (
    <div>
      Macharia XX
      <div style={{ margin: '1em' }}>            
            <div class="tableWrap"  style={{ background: 'green' }}>
                <div class="tableCol">Title</div>
                <div class="tableCol">Description</div>
            </div>
        </div>
      {props && props.data.map(card => (
        <Card {...card} />
      ))}
    </div>
  );
} 
export default Tableless; 