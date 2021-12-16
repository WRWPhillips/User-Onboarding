import React, {useState, useEffect} from 'react';
import './App.css';
import Form from './components/Form';
import User from './components/User'
import axios from 'axios';
import schema from './validation/formValidation'
import * as yup from 'yup';

//added if statement trees to deal with bugs

const initialFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '', 
  tos: false,
}

const initialFormErrors = {
  first_name: '',
  last_name: '',
  email: '', 
  password: '',
  tos: '',
}

const initialUsers = [];
const initialDisabled = true;
const url1 = `https://reqres.in/api/users`
// const url2 = `https://fakeface.rest/face/view`

function App() {
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)
  // const [newAvatar, setNewAvatar] = useState('')
  
  const getUsers = () => {
    axios.get(url1)
      .then(resp => {
        console.log(resp);
        setUsers(resp.data);
      }).catch(err => console.error(err))
  }

  const postNewUser = newUser => {
    axios.post(url1, newUser)
      .then(resp => {
        console.log(resp.data);
        if(!users.data){
          setUsers([resp.data, ... users]);
        } else {
        setUsers([ resp.data, ...users.data ]);
        }
      }).catch(err => console.error(err))
      .finally(() => setFormValues(initialFormValues));
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: ''}))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0]}));
  }

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    // axios.get(url2)
    //   .then(resp => {
    //     setNewAvatar(resp)
    //   }).catch(err=> console.error(err));
    const newUser = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      tos: !!formValues.tos,
      // avatar: newAvatar,
    }
    console.log(newUser);
    postNewUser(newUser);

  }
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  console.log(users);
  if(!users.data){
    return (
      // <h3>loading data...</h3>
      <div className="App">
      <header className="App-header">
        <h1>
          ~New User Onboarding~
        </h1>
      </header>
      <div className='App-body'>
        <div className='Form-container'>
          <Form 
            values={formValues}
            change={inputChange}
            submit={formSubmit}
            disabled={disabled}
            errors={formErrors}
          />
        </div>
        <div className='User-box'>
          <h2>Current Userlist</h2>
          <div className='Users'>
            { 
              users.map(user => {
                return (
                  <User key={user.id} details={user} />
                )
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
  } else {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          ~New User Onboarding~
        </h1>
      </header>
      <div className='App-body'>
        <div className='Form-container'>
          <Form 
            values={formValues}
            change={inputChange}
            submit={formSubmit}
            disabled={disabled}
            errors={formErrors}
          />
        </div>
        <div className='User-box'>
          <h2>Current Userlist</h2>
          <div className='Users'>
            { 
              users.data.map(user => {
                return (
                  <User key={user.id} details={user} />
                )
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default App;
