import React from "react";

const initialState = {
  nextId: 0,
  tours: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOUR': {
      const nextId = state.nextId + 1;
      const {name, value} = action.payload;
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
  const [{ tours }, dispatch] = React.useReducer(reducer, initialState);  
  const Tour = ({ nextId, tour, onRemove }) => {
    return (
      <div>
        Tour: nextId-{tour.nextId} Title-{tour.title}
        <button onClick={() => onRemove(nextId)}>X</button>
      </div>
    );
  }

  return (
    <>
      <button onClick={() => dispatch({ type: 'ADD_TOUR' })}>Add Tour</button>
      {tours.map(({ nextId, tour }) => (
        <Tour key={nextId} tour={tour}
          onRemove={() => dispatch({ type: 'REMOVE_TOUR', nextId })}
        />
      ))}

    {tours.map((tour, index) => (
        <p>Hello, {tour.nextId} from {tour.title}!</p>
    ))}

    </>
  );
}

export default Safaris;