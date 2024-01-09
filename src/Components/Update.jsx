import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../features/userDetailslice';

const Update = () => {

    const {id} = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [updateData, setupdateData] = useState();

    const {users, loading} = useSelector((state) => state.app); // get all the users

    useLayoutEffect(() => {

        if(id) {
            const singleUser = users.filter((ele) => ele.id === id); // particular user
            setupdateData(singleUser[0]);
        }

    }, []);

    const newData = (e) => {
        setupdateData({...updateData, [e.target.name] : e.target.value})  // we dont add new data here, we just add the changes in the same data
    }
    console.log(updateData);

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateUser(updateData))
        navigate("/read")   // after submission it should come back to read page
    };


  return (
    <div>
        <h2 className='my-2'>Edit your Data</h2>
        <form className='w-50 mx-auto my-5' onSubmit={handleUpdate}>
            <div class="mb-3">
               <label class="form-label">Name</label>
               <input type="text" name='name' class="form-control" value={updateData && updateData.name} onChange={newData} />
            </div>
            <div class="mb-3">
               <label class="form-label">Email</label>
               <input type="email" name='email' class="form-control" value={updateData && updateData.email} onChange={newData} />
            </div>
            <div class="mb-3">
               <label class="form-label">Age</label>
               <input type="number" name='age' class="form-control" value={updateData && updateData.age} onChange={newData} />
            </div>
            <div class="mb-3">
                {/* here name:gender will allow to choose only one at a time, here value is fixed just check the gender whoever it matches use that data */}
                <input class="form-check-input" name='gender' value="Male" type="radio" checked={updateData && updateData.gender === "Male"} onChange={newData} /> 
                <label class="form-check-label">Male</label>
            </div>
            <div class="mb-3">
                <input class="form-check-input" name='gender' value="Female" type="radio" checked={updateData && updateData.gender === "Female"} onChange={newData} />
                <label class="form-check-label">Female</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Update
