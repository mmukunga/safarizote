import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Card from "./Card";
import { Input, Submit, InputWrapper } from "./Components";
import { SmartForm } from './SmartForm';
import Emoji from "./Emoji";

const defaultValues = {
    amboseli: "",
    kilimanjaro: "",
    lakeNakuru: "",
    masaaiMara: "",
    mombasa: "",
    mtKenya: ""
  };

const TourCharges = () => {
    const [safaris, setSafaris] = React.useState();
    const [state, setState] = React.useState('');
    const [inputFields, setInputFields] = React.useState([
      { name: '', age: '' }
    ]);
    const { register, handleSubmit } = useForm({
      mode: "onSubmit", defaultValues
    });

    React.useEffect(() => {
      const fetchData = async () => {
          axios.get('/api/safaris')
          .then((response) => {
            setSafaris(response.data);
          }).catch(function(error) {
            console.log(error);
          });
      };
      fetchData();
    }, []);

    const post = async (url, data) => {
      console.log(data);
      return await axios.post(url,  JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
      });
    }
    
    const onSubmit = async (data) => {
      console.log(data);
      const updated = safaris.map(safari => {
          const val = Object.keys(data).find((nameKey) => {
              return nameKey === safari.name;
          });
          if (data[val] !== "") {
            return {...safari, price: data[val]};
          }
          return safari;
      });

      post("/api/updateAll", updated).then((response) => {
        console.log(response);
        setSafaris(() => response.data);
      }).catch(error => {
        console.log(error);
      });
    };

    console.log(Object.keys(defaultValues));

    const hasLabel = {labeled: true};

    console.log(safaris);
    return (
      <Card className="Card" title="Prices">
        <div className="table">
        <div className="th">
            <div className="td">Id</div>
            <div className="td">Name</div>
            <div className="td">Title</div>
            <div className="td">Price</div>
        </div>
          {safaris != undefined && safaris.map((item)=> {
            return (
              <div key={item.id} className="tr">
                <div className="td">{item.id}</div> 
                <div className="td">{item.name}</div>
                <div className="td"><div dangerouslySetInnerHTML={{__html: item.title}} /></div>
                <div className="td">{item.price}</div>
              </div>
              );
          })}
      </div>
      
      <SmartForm defaultValues={defaultValues} onSubmit={onSubmit}>
        <InputWrapper type="text" labelObj={hasLabel} id="amboseli" name="amboseli" value="400" />
        <InputWrapper type="text" labelObj={hasLabel} id="kilimanjaro" name="kilimanjaro" value="550" />
        <InputWrapper type="text" labelObj={hasLabel} id="lakeNakuru" name="lakeNakuru" value="180" />
        <InputWrapper type="text" labelObj={hasLabel} id="masaaiMara" name="masaaiMara" value="325" />
        <InputWrapper type="text" labelObj={hasLabel} id="mombasa" name="mombasa" value="675" />
        <InputWrapper type="text" labelObj={hasLabel} id="mtKenya" name="mtKenya" value="450.20" />
        <InputWrapper type="text" labelObj={hasLabel} id="nairobi" name="nairobi" value="110.45" />
        <div className="btn">
          <Submit name="Submit" type="submit"><Emoji label='Send'/>Submit</Submit>
        </div>
      </SmartForm>
      </Card>
    );
  }
  
  export default TourCharges;