import React from "react";
import { useCustomContext } from './CustomContext';
import Modal from "./Modal";

const BookingForm = (props) => {
  const {state, dispatch} = useCustomContext(); 

  const [status, setStatus] = React.useState({
    modal: false,
    name: '',
    modalInputName: ''
  });

  const [isOpen, setIsOpen] = useState(false);
 
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

  const togglePopup = () => {
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
      <h1>Hello!! {this.state.name}</h1>
      <input type="button" value="Click to Open Popup" onClick={togglePopup}/>
    {isOpen && <Modal
      content={
      <>
        <b>Design your Popup</b>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
           incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
           exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
           irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
           officia deserunt mollit anim id est laborum.
        </p>
        <button>Test button</button>
      </>
      }
      handleClose={togglePopup}
    />
    }

      <label>SAfarsi<input type="checkbox" id='safari' name="safari" onChange={handleBooking}/></label>

      <form onSubmit={handleSubmit}>        
        <div>
          <label>Going<input type="checkbox" id='isGoing' name="isGoing" onChange={handleChange}/></label>
        </div>
        <div>
          <label>Full Names<input id='name' name="name" onChange={handleChange}/></label>
        </div>
        <div>
          <label>Email<input id='email' name="email" onChange={handleChange}/></label>
        </div>
        <div>
          <label>Message<textarea id='message' name="message" onChange={handleChange}/></label>
        </div>
        <div>
          <label>Safaris
            <select id="safari" name="safari" onChange={handleChange}>
              {options.map((option) => (
                <option value={option.nextId}>{option.title}</option>
              ))}
            </select>
          </label>
        </div>
        <button>Submit</button>
      </form>  
      
      {state.tours.map(({ nextId, title }) => (
        <Tour key={nextId} title={title}
          onRemove={() => dispatch({ type: 'REMOVE_TOUR', nextId })}
        />
      ))}
    </div>
  );
}

export default BookingForm;