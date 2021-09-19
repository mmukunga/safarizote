import React, { useState } from "react";
const BackUp = () => {
  const [name,  setName]  = useState("");
  const [value, setValue] = useState('');
  const [users, setUsers] = useState([]);

  const [items] = React.useState([
    { label: "Luke Skywalker", value: "Luke Skywalker" },
    { label: "C-3PO", value: "C-3PO" },
    { label: "R2-D2", value: "R2-D2" }
  ]);

    React.useEffect(() => {
      const fetchUsers = async () => {
          const response = await axios.get("/api/listAll");
          try {
              console.log(response);
              setUsers(response.data);
          } catch (err) {
              console.log(err);
          }
      };

      fetchUsers();
    }, []);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (evt) => {
      evt.preventDefault();
      alert(`Submitting Name ${name}`)
  }
  return (
    <div className='backUp'>
      <h1>BackUp BackUp</h1>
      <form onSubmit={handleSubmit}>
        <select onChange={onChange}>
          {items.map(item => (
            <option 
               key={item.value} 
               value={item.value}>
               {item.label}
            </option>
          ))}
        </select>
        <div>Input value: {value}</div>
        <label>Frirst Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>Welcome to my backUp!!</p>
      <div className="userList">
            {users && users.map(user => (
                <li key={user.login.uuid}>
                    {user.name.first} {user.name.last}
                </li>
            ))}
        </div>
    </div>
  );
}

export default BackUp