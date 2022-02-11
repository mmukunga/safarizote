import React, { useReducer } from "react";
import moment from "moment";
import { makeStyles } from '@material-ui/core/styles';
import Card from "./Card"; 

const initialState = [];
const headers = ['r0', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9'];

function tippingReducer(state, action) {
  switch (action.type) {
    case 'NY_RAD': {
      return [
        ...state, 
        action.payload
      ];
    }
    case "reset":
      return initialState;
    default:
      return state;
  }
}

const Tipping = () => {
  const [state, dispatch] = useReducer(tippingReducer, initialState);
  const reset = () => dispatch({ type: "reset" });

  React.useEffect(() => {  
      function fetchData () {
        for (const [value] of headers.entries()) {
          let arr = [];
          while (arr.length < 7) {
            const nyval = Math.floor(Math.random() * Math.floor((34-0)+1));
            if (!arr.includes(nyval)) {
              arr = [...arr, nyval];
            }
          }
          arr.sort((a, b) => a - b);

          const nyRad = {
              id: value,
              rekke: [...arr],
          };
          dispatch({type: 'NY_RAD', payload: nyRad});
        }
      }

      fetchData ();

  }, []);

  function Bar({height}) {
    const useStyles = makeStyles({
        bar:{
            fontSize: "14px",
            height: "30px",
            width: "50px",
            border: "2px solid red",
            color: "red",
            margin: "2px"
        }
    });
    const classes = useStyles();
    return (
        <>
            <div data-testid="tipping-child" className={classes.bar} >
                {height}
            </div>
        </>
    )
  };

  const kuppong = state.map((item, idx) => {
    return ( 
      <ul key={idx} className="tipping"> 
        { <li key={idx} className="header"><Bar key={idx} height={item.id}/></li>}
        { item.rekke.map((el, idy) => {
            return (<li key={idy}><Bar key={idy} height={el}/></li>);
          })
        }
      </ul> 
    );
  });

  return (
    <Card className="Tipping" styleProps={{width: '98%'}} title="Tipping">
      <div data-testid="tipping-parent" className="container">
        <div style={{width:'100%'}}>
          {moment().format('dddd')}, <span>{moment().format('LL')}</span> 
          <button onClick={reset}> Reset </button>
        </div>
        <div className="layout">{kuppong}</div>  
      </div>
    </Card>  
  );
}

export default Tipping;