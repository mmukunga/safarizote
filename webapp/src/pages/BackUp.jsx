import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from 'axios';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

  const BackUp = () => {
    const [category, setCategory] = React.useState([]);
    const [data, setData] = React.useState([]);    
    const [treeState, setTreeState] = React.useState({checked: [], expanded: []});
    const [nodes, setNodes] = React.useState([{
      value: '',
      label: '',
      children: [],
    }]);

    React.useEffect(() => {
      axios.get("/api/categories").then(response => {
          setCategory(response.data);

          const parents = [];
          response.data[0].children.forEach(val => {
            const children = [];
            val.children.forEach(item => {
              children.push({
                value: item.id,
                label: item.name,
              });
            });

            parents.push({
              value: val.id,
              label: val.name,
              children,
            });  
          });

          const tempNodes = {
            value: category.id,
            label: category.name,
            children: parents,
          }
          setNodes([tempNodes]);
      }).catch(error => {
          console.log(error);
      });
    }, []);  

    const onCheck = (checked) => {
        console.log(treeState.checked);
        setTreeState({ ...treeState, checked: checked });
    }
    
    const onExpand = (expanded) => {
        console.log(treeState.expanded);
        setTreeState({...treeState, expanded: expanded });
    }


    const sendDeleteRequest = async (id) => {
      try {
          const resp = await axios.get(`/api/backUp/${id}`)
          console.log(resp.data);
          return resp.data;
      } catch (err) {
          // Handle Error Here
          console.error(err);
          return err;
      }
  };

    const getInitialProps = async () => {
      let restaurants = [];
      try {
        treeState.checked.forEach(async(id) => {
          const res = await axios.get(`/api/backUp/${id}`);
          console.log(res);
          restaurants.push(res.data);
        });
        return restaurants;
      } catch (error) {
        return { error };
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(treeState.checked);
      let selectedItems = [].push(treeState.checked);
      console.log(selectedItems);

      sendDeleteRequest(248).then(function(result) {
          console.log(result) // "Some User token"
      });

      treeState.checked.forEach(id => {
        console.log(id);
        axios.get(`/api/backUp/${id}`).then((response) => { 
            console.log(response);
            console.log(response.data);
            let selected = response.data;
            selected.isChecked = true;
            setData([...data, selected]);
        });
      });
      
      console.log(data);
      
      const options = {
        headers: {
            'Content-Type': 'application/json',
        }
      };

      axios.post("/api/doBackUp", data, options).then((response) => { 
          console.log(response);
        }).catch(error => {
          console.log(error);
      });

      console.log("Submited OK!!");
    };

    const { checked, expanded } = treeState;

    return (
      <Card className="InnerCard" fontColor="black">
        <strong>Tree BackUp</strong>
        <h3>Check and Uncheck</h3>
        <form onSubmit={handleSubmit}>
          <div className="BackUps">
            <CheckboxTree
                checked={checked}
                expanded={expanded}
                iconsClass="fa5"
                nodes={nodes}
                onCheck={onCheck}
                onExpand={onExpand}
            />
          </div>
          <div className="row">
            <input type="submit" value="Submit!" className="lg-button btn-primary"/>
          </div>    
        </form>
      </Card>
    );
  }

  export default BackUp;