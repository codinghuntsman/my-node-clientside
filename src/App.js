import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  //-------Getting data from server side.--------------
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])



  const handleFormSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    //---------Post data to server----------
    fetch('http://localhost:5000/user', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUser = [...users, data];
        setUsers(newUser);
      });



  }
  return (
    <div className="App">
      <h2>my own user is: {users.length}</h2>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="name" id="" placeholder='name' required />
        <br />
        <input type="email" name="email" id="" placeholder='email' required />
        <br />
        <input type="submit" value="Submit" />
      </form>

      {
        users.map(user => <h6 key={user.id}>id: {user.id} name: {user.name} email: {user.email}</h6>)
      }
    </div>
  );
};

export default App;
