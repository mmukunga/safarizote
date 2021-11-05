import React from "react";
import { useCustomContext } from './CustomContext';

const Bookings = (props) => {
  const [state, dispatch] = useCustomContext(); 
  const Tour = ({ nextId, title, onRemove }) => {
    console.log('1..tour..');
    console.log(title);
    console.log('2..tour..');
    return (
      <div>
        Tour: nextId-{nextId} Title-{title}
        <button onClick={() => onRemove(nextId)}>X</button>
      </div>
    );
  }
  const el = {nextId: 1010, title: 'Masai Mara'};
  
  console.log(state);
  console.log(state.tours);

  const handleClick = el => {
    props.onChange(el); 
  }

  const handleChange = el => {
    const { name, value } = el.target;
    if (el.target.type === "select") {
      dispatch({ type: 'ADD_SAFARI', payload: el.target });
    } else {
      dispatch({ type: 'INIT_BOOKING', payload: el.target });
    }  
    
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submit');
  }

  const options = [
    {
      nextId: 0,
      title: "Masaai Mara",
    },
    {
      nextId: 1,
      title: "Kilimanjaro",
    }
  ];

  console.log(state);

  return (
    <div>
      <label>Click me {state.name}
         <input name={state.name} onClick={handleClick}/>
      </label>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input id='name' name="name" onChange={handleChange}/>
          </label>
        </div>
        <div>
          <label>
            Email:
            <input id='email' name="email" onChange={handleChange}/>
          </label>
        </div>
        <div>
          <label>
            Safaris:
            <select id="safari" name="safari" onChange={handleChange}>
              {options.map((option) => (
                <option value={option.nextId}>{option.title}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Is Going:
            <input type="checkbox" id='isGoing' name="isGoing" onChange={handleChange}/>
          </label>
        </div>
        <button>Submit</button>
      </form>  
      
      {state.tours.map(({ nextId, title }) => (
        <Tour key={nextId} title={title}
          onRemove={() => dispatch({ type: 'REMOVE_TOUR', nextId })}
        />
      ))}

      {state.tours.map((tour, index) => (
          <p>Hello, {tour.nextId} from {tour.title}!</p>
      ))}
    </div>
  );
}

export default Bookings;