import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from './Card';


const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get("/api/allUsers");
            setUsers(data);
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
      }, []);
    return (
      <Card className="Tipping" styleProps={{width: '98%'}} title="Tipping">
      <div data-testid="tipping-parent" className="container">
        <h1>Allowed Users</h1>
        {users.map((el) => (
        <article key={el.id} style={{textAlign:'left'}}>
          <span><strong>{el.email}</strong> tel. {el.phone}</span>
        </article>
      ))}
    </div>
    </Card>
    )
};

export default Users;