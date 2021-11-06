import React from "react";
import { useCustomContext } from './CustomContext';
import Modal from "./Modal";

const Bookings = (props) => {
  const {state, dispatch} = useCustomContext(); 
  const [isOpen, setIsOpen] = React.useState(false);
  const [status, setStatus] = React.useState({
    modal: false,
    name: '',
    modalInputName: ''
  });

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

  const toggle = () => {
    console.log(toggle)
    setIsOpen(!isOpen);
  }

  const handleBooking = (e) => {
    const {name, value} = e.target;
    setStatus({
      [name]: value
    });
  }

  /*
    const handleSubmit = (e) => {
      setStatus({ name: status.modalInputName });
      modalClose();
    }

    const modalOpen = () => {
      setStatus({ modal: true });
    }

    const modalClose = () => {
      setStatus({
        modalInputName: "",
        modal: false
      });
    }
  */

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
  console.log(state);

  return (
    <div>
      <h1>Hello!! {state.name}</h1>
      <input type="button" style={{border:'2px solid red'}} value="Start Booking" onClick={() => setIsOpen(true)}/>
      <Modal isOpen={isOpen} toggle={toggle} handleChange={handleChange} handleSubmit={handleSubmit}/>

      <label>Safari<input type="checkbox" id='safari' name="safari" onChange={handleBooking}/></label>

      {state.tours.map(({ nextId, title }) => (
        <Tour key={nextId} title={title}
          onRemove={() => dispatch({ type: 'REMOVE_TOUR', nextId })}
        />
      ))}
    </div>
  );
}

export default Bookings;