import React from "react";
import {LogContext} from "./LogContext";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Label, Submit, Button, Select, InputWrapper } from "./Components";
import { SmartForm } from './SmartForm';
import Card from "./Card";
import Emoji from "./Emoji";

const  Shoppings = () => {
  const defaultValues = {
    product:'',
    shop:'',
    price:'',
    quantity:''    
  } 
  const [state, setState] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const [shop, setShop] = React.useState("Joka");
  const context = React.useContext(LogContext);
  const log = context.log;
  const persistLog =  context.persistLog;

  const options = [
      {label: 'Joka', value: 'Joka'},
      {label: 'IKEA Furuset', value: 'IKEA'},
      {label: 'Rema 1000', value: 'Rema 1000'},
      {label: 'NordBy Senter', value: 'NordBy'}
  ];

  const addShopping = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  const removeShopping = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  };

  const clearShoppings = () => {
    setIndexes([]);
  };

  React.useEffect(() => {
    axios.get('/api/products')
        .then(response => setProducts(response.data))
        .catch(error => {
            setState('Error');
            const path= '/api/products';
            persistLog(error, path);
        });
  }, []);

  const post = async (url, data) => {
    console.log(data);
    const newList = data.shoppings.map((item) => {
      return {...item, shop: shop }; 
    });
    return await axios.post(url,  JSON.stringify(newList), {
      headers: { 'Content-Type': 'application/json;charset=utf-8' }
    });
  }

  const onSubmit = async (data) => {
    post("/api/saveProducts", data).then((response) => {
      response.status === 200 ? setState("Success") : setState("Error");
      setProducts(response.data);
    }).catch(error => {
      setState('Error');
      console.log(error);
    });
  };
  const hasLabel = {label: false};
  return (
    <Card className="Card"  title='Shopping'>
      <div className='shoppings'> 
      <SmartForm defaultValues={defaultValues} onSubmit={onSubmit}>
      <Select name="shop" options={options} />  
      <div className="table"> 
        <div className="th">
            <div className="td"><Label id="product" label="product">Product</Label></div>
            <div className="td"><Label id="price" label="price">Price</Label></div>
            <div className="td"><Label id="quantity" label="quantity">Quantity</Label></div>
            <div className="td btn"><Button onClick={addShopping}><Emoji label='Add'/></Button></div>
          </div>   
          {indexes.map(index => {
            const fieldName = `shoppings[${index}]`;
            return (
              <div key={index} className="tr">     
              <div className="td"><InputWrapper type="text" labelObj={hasLabel} id={`${fieldName}.product`} name={`${fieldName}.product`}/></div>
              <div className="td"><InputWrapper type="text" labelObj={hasLabel} id={`${fieldName}.price`} name={`${fieldName}.price`}/></div>
              <div className="td"><InputWrapper type="text" labelObj={hasLabel} id={`${fieldName}.quantity`} name={`${fieldName}.quantity`}/></div>
              <div className="td btn"><Button onClick={removeShopping(index)}><Emoji label='Remove'/></Button></div>            
              </div>
            );
          })}
          <div className="table-caption">
            <Button onClick={clearShoppings}><Emoji label='Litter'/>Reset</Button>
            <Submit name="Submit" type="submit"><Emoji label='Send'/>Submit</Submit>
          </div>
        </div> 
      </SmartForm>

      <div className="table">
        <div className="th">
            <div className="td">Item</div>
            <div className="td">Shop</div>
            <div className="td">Price</div>
            <div className="td">Qty</div>
        </div>
          {products.map((item)=> {
            return (
              <div key={item.id} className="tr">
                <div className="td">{item.product}</div> 
                <div className="td">{item.shop}</div>
                <div className="td">{item.price}</div>
                <div className="td">{item.quantity}</div>
              </div>
              );
          })}
      </div>
      <span className='app-status'>Shop: {shop} {state}</span>
    </div>  
    </Card>  
  );
}

export default Shoppings;      