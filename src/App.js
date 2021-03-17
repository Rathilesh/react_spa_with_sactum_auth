import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Login from './components/Login';
import apiClient from './services/api';

const App = () => {


  //const [books, setBooks] = . useState(null);
  let [responseData, setResponseData] = React.useState('')
  const [items, setItems] = useState([]);

  useEffect(() => {




  }, [])


  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem('loggedIn') == 'true' || false
  );
  const login = () => {

    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);




    axios.defaults.withCredentials = true;

    const api123 = axios.create({
      baseURL: 'http://localhost:8000/',
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN"
      // withCredentials: true
    })


    api123.get('/api/users').then(response => {

      //clear cookie


      console.log(response);
      //setUsers(response.data) 
      setItems(response.data)

    });






  };
  const logout = () => {

    axios.defaults.withCredentials = true;

    const api123 = axios.create({
      baseURL: 'http://localhost:8000/',
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN"
      // withCredentials: true
    })


    api123.post('/logout').then(response => {

      //clear cookie


      console.log(response);
      if (response.status === 204) {
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
      }
    })

  };


  const authLink = loggedIn
    ? <button onClick={logout} className="nav-link btn btn-link">Logout</button>
    : <NavLink to='/login' className="nav-link">Login</NavLink>;
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to='/' className="nav-link">Dashboard</NavLink>
            </li>
            <li className="nav-item">
              {authLink}
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-5 pt-5">

        {items.map(item => (
          <li key={item.id}>
            {item.name} {item.email}
          </li>
        ))}
        <Switch>


          <Route path='/' exact render={props => (
            <h1>here dashboard contents</h1>





          )} />
          <Route path='/login' render={props => (
            <Login {...props} login={login} />
          )} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;