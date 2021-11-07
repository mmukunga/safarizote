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
        const nodes = [...response.data];
        var array_nodes = [];
        nodes.forEach(function(d) {
            array_nodes.push({
              'id': d['id'],
              'title': d['title']
            });
          });

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
  const Tour = ({ id, safariId, onRemove }) => {
    return (
        <div style={{display:'flex', textAlign:'left', width:'100%', border:'2px solid red'}}>
          <label for="safari" style={{width:'60%'}}>Tour: id-{id} SafariID-{safariId}</label>
          <button style={{width:'10%'}} onClick={() => onRemove(id)}>X</button>
        </div>
    );
  }

  const handleChange = el => {
    const { name, value } = el.target;
    console.log(state);
    if (el.target.nodeName === "SELECT") {
      dispatch({ type: 'ADD_TOUR', payload: el.target });
    } else {
      dispatch({ type: 'INIT_BOOKING', payload: el.target });
    }    
  }

  const handleSubmit = e => {
    e.preventDefault();
    toggle();
    console.log(state);
  }

  console.log(state);

  return (
    <div>
      <h1>Hello!! {state.name}</h1>
      <input type="button" style={{border:'2px solid red'}} value="Start Booking" onClick={() => setIsOpen(true)}/>
      <Modal isOpen={isOpen} toggle={toggle} handleChange={handleChange} handleSubmit={handleSubmit} options={options && options}/>

      <label>Safari<input type="checkbox" id='safari' name="safari" onChange={handleBooking}/></label>

      {state.tours.map(({ id, safariId }) => (
        <Tour key={id} safariId={safariId}
          onRemove={() => dispatch({ type: 'REMOVE_TOUR', id })}
        />
      ))}
    </div>
  );
}

export default Bookings;