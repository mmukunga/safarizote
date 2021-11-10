import React from "react";
import axios from 'axios';
import { useCustomContext } from './CustomContext';
import Modal from "./Modal";

const Bookings = (props) => {
  const {state, dispatch} = useCustomContext(); 
  const [options, setOptions] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => {
    console.log('toggle');
    setIsOpen(!isOpen);
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

  const handleSubmit = formData => {
    console.log("Data submitted: ",  formData);
    toggle();
    console.log(state);
    dispatch({ type: 'INIT_BOOKING', payload: formData });
  }

  console.log(state);

  return (
    <div>
      <div className="dashboardmenu">
        <input type="button" name='boxfield' style={{color:'white', border:'1px dotted red'}} value="Hello!! 🛒Start Booking" onClick={() => setIsOpen(true)}/>
        <Modal isOpen={isOpen} toggle={toggle} handleSubmit={handleSubmit} options={options && options}/>
      </div>
    </div>
  );
}

export default Bookings;