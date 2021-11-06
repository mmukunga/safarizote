import React from "react";
import axios from 'axios';
import { useCustomContext } from './CustomContext';
import Modal from "./Modal";

const Bookings = (props) => {
  const {state, dispatch} = useCustomContext(); 
  const [options, setOptions] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [status, setStatus] = React.useState({
    modal: false,
    name: '',
    modalInputName: ''
  });

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

  React.useEffect(() => {
      axios.get('/api/safaris').then(response => {
        console.log(response);
        const nodes = [...response.data];
        console.log(nodes);
       
        var array_nodes = [];
        nodes.forEach(function(d) {
            array_nodes.push({
              'id': d['id'],
              'title': d['title']
            });
          });

        console.log(array_nodes);
        setOptions(array_nodes);

      }).catch(err => {
      console.log(err);
    });
  }, []);
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
  const Tour = ({ id, title, onRemove }) => {
    console.log('1..tour..');
    console.log(title);
    console.log('2..tour..');
    return (
      <div>
        Tour: id-{id} Title-{title}
        <button onClick={() => onRemove(id)}>X</button>
      </div>
    );
  }
  const el = {id: 1010, title: 'Masai Mara'};
  
  console.log(state);
  console.log(state.tours);

  const handleChange = el => {
    const { name, value } = el.target;
    console.log(name);
    console.log(value);
    console.log(el.target.nodeName);
    if (el.target.nodeName === "SELECT") {
      dispatch({ type: 'ADD_TOUR', payload: el.target });
    } else {
      dispatch({ type: 'INIT_BOOKING', payload: el.target });
    }    
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('...Submited...');
    toggle();
  }

  console.log(state);
  console.log(options);

  return (
    <div>
      <h1>Hello!! {state.name}</h1>
      <input type="button" style={{border:'2px solid red'}} value="Start Booking" onClick={() => setIsOpen(true)}/>
      <Modal isOpen={isOpen} toggle={toggle} handleChange={handleChange} handleSubmit={handleSubmit} options={options && options}/>

      <label>Safari<input type="checkbox" id='safari' name="safari" onChange={handleBooking}/></label>

      {state.tours.map(({ id, title }) => (
        <Tour key={id} title={title}
          onRemove={() => dispatch({ type: 'REMOVE_TOUR', id })}
        />
      ))}
    </div>
  );
}

export default Bookings;