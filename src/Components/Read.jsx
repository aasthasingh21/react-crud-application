import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'; // useselector : to read the data
import { deleteUser, showUser } from '../features/userDetailslice';
import Popup from './Popup';
import { Link } from 'react-router-dom';

const Read = () => {

   
    const dispatch = useDispatch();

    // when we tap on view popup page will open up : so the id from here will be match with user data and display the information accordingly
    const [id, setid] = useState();    

    const [allData, setallData] = useState("")

    const [showPopup, setshowPopup] = useState(false); // default its false, but when clicked view its becomes true and popup page shows up

    const {users, loading, searchData} = useSelector((state) => state.app);  // to read the data which we get (state.app = entire data (show users and loading from that))

    useEffect(() => {
        dispatch(showUser());    // to hit the read page data
    }, []);
    
    if(loading) {     // if loading show this, or return the read page
        return <h2>Loading</h2>
    }

  return (
        <div>
            {/* when view hit these infos are shown */}
            {showPopup && (
                <Popup 
                    id={id} 
                    showPopup={showPopup} 
                    setshowPopup={setshowPopup}
                />
            )}
            <h2>Your Data</h2>
            <input class="form-check-input mx-2" name='gender' checked={allData === ""} type="radio" onChange={(e) => setallData("")} />
            <label class="form-check-label">All</label>
            <input class="form-check-input mx-2" name='gender' checked={allData === "Male"} value="Male" type="radio" onChange={(e) => setallData(e.target.value)}  />
            <label class="form-check-label">Male</label>
            <input class="form-check-input mx-2" name='gender' checked={allData === "Female"} value="Female" type="radio"onChange={(e) => setallData(e.target.value)}  />
            <label class="form-check-label">Female</label>
           
            <div>
                {users && 

                users.filter((ele) => {
                    if(searchData.length === 0) {  // if user search nothing then return everything on the page
                        return ele;
                    } else {
                        return ele.name
                        .toLowerCase() // if user search something match with the data and show accordingly
                        .includes(searchData.toLowerCase());
                    }
                })
                .filter((ele) => {
                    if(allData === "Male") {
                        return ele.gender === allData;
                    } else if (allData === "Female") {
                        return ele.gender === allData;
                    } else return ele;
                })

                .map((ele) => (   // run a loop (if you get the user then run a loop and get the data respectively)
                  <div key={ele.id} className="card w-50 mx-auto my-2">
                        <div classNameName="card-body">
                            <h5 className="card-title">{ele.name}</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">{ele.email}</h6>
                            <p className="card-text">{ele.gender}</p>
                            <button href="#" className="card-link" onClick={() => [setid(ele.id), setshowPopup(true)]}>
                                View
                            </button>
                            <Link to={`/edit/${ele.id}`} className="card-link">
                                Edit
                            </Link>
                            <Link onClick={() => dispatch(deleteUser(ele.id))} href="#" className="card-link">
                                Delete
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Read;
