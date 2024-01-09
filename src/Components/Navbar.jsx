import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // we use link to redirect to other pages respectively
import { searchUser } from "../features/userDetailslice";



const Navbar = () => {

  const allusers = useSelector((state) => state.app.users); // to get the count of all the data in all post

  const dispatch = useDispatch(); // to dispatch the data entered by the user in search bar

  const [searchData, setsearchData] = useState("")  // to hold/capture the data search by the user in search bar

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid ">
          <h4 className="navbar-brand" href="#">RTK</h4>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Create Post 
                  </Link>
              </li>
              <li className="nav-item">
                <Link to="/read" className="nav-link"> 
                {/* to get the count/number of users */}
                  All Post 
                </Link>
              </li>
            </ul>
            <input
              className="form-control me-2 w-50"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setsearchData(e.target.value)}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
