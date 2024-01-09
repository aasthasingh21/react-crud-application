import React from 'react'
import "./Popup.css";
import { useSelector } from "react-redux";


const Popup = ({id, showPopup, setshowPopup}) => {

    const allusers = useSelector((state) => state.app.users); // get all the users

    const singleUser = allusers.filter((ele) => ele.id === id);  // it filters out single user by matching the id 


  return (
    <div className='popupBackground'>
        <div className='popupContainer'>
            <button onClick={() => setshowPopup(false)}>Close</button>
            <h2>{singleUser[0].name}</h2>
            <h2>{singleUser[0].email}</h2>
            <h2>{singleUser[0].age}</h2>
            <h2>{singleUser[0].gender}</h2>
        </div>
      
    </div>
  )
}

export default Popup
