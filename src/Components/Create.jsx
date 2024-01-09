import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createUser } from '../features/userDetailslice';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    
    const [users, setUsers] = useState({}); // to store the data by users

    const navigate = useNavigate(); // to send to that page

    const dispatch = useDispatch();  // since we have to send the data to the backend(here mockapi)

    const getUserData = (e) => { 
        setUsers({...users, [e.target.name]: e.target.value}); // spread operators (e = inputed data in form)
      
    };

   const handleSubmit = (e) => {   // when submited this function will run and send the data to the server
        e.preventDefault(); // when submitted page will be refreshed so preventdefault
        console.log(users);
        dispatch(createUser(users)); // we submit button is hit will be dispatched and run createuser function with users = the user data
        navigate("/read")  // use the path same as in of route

    };

  return (
    <div>
        <h2 className='my-2'>Enter your Data</h2>
        <form className=' w-50 mx-auto my-5' onSubmit={handleSubmit}>
            <div class="mb-3">
               <label class="form-label">Name</label>
               <input type="text" name='name' class="form-control" onChange={getUserData}/>
            </div>
            <div class="mb-3">
               <label class="form-label">Email</label>
               <input type="email" name='email' class="form-control" onChange={getUserData}/>
            </div>
            <div class="mb-3">
               <label class="form-label">Age</label>
               <input type="number" name='age' class="form-control" onChange={getUserData}/>
            </div>
            <div class="mb-3">
                {/* here name:gender will allow to choose only one at a time */}
                <input class="form-check-input" name='gender' value="Male" type="radio" onChange={getUserData} />
                <label class="form-check-label">Male</label>
            </div>
            <div class="mb-3">
                <input class="form-check-input" name='gender' value="Female" type="radio" onChange={getUserData} />
                <label class="form-check-label">Female</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Create;
