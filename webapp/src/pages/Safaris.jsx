import React from "react";

const initialState = {
  nextId: 0,
  tours: [{nextId: 0, title:'Masaai Mara' }],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOUR': {
      console.log(action);
      const nextId = state.nextId + 1;
      const {name, value} = action.payload;
      console.log(action.payload);
      return {
        nextId,
        tours: [...state.tours, { nextId: nextId, [name]: value }],
      };
    }
    case 'REMOVE_TOUR': {
      const nextId = state.nextId;
      const result = state.tours.filter((tour) => tour.nextId !== action.payload);
      return {
        nextId,
        tours: [...result],
      };
    }
  }
};

const Safaris = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);  
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

  return (
    <>
      <button onClick={() => dispatch({ type: 'ADD_TOUR', payload: el })}>Add Tour</button>
      {state.tours.map(({ nextId, title }) => (
        <Tour key={nextId} title={title}
          onRemove={() => dispatch({ type: 'REMOVE_TOUR', nextId })}
        />
      ))}

    {state.tours.map((tour, index) => (
        <p>Hello, {tour.nextId} from {tour.title}!</p>
    ))}

    </>
  );
}

export default Safaris;