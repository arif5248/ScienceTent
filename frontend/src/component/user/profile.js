import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/metaData/metaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader/loader";
import ProfilePng from "../../images/user.png";
import { Link, useNavigate } from "react-router-dom";

import "./profile.css";
import { fetchUserLogout } from "../../slice/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logoutUser() {
    dispatch(fetchUserLogout());
    navigate("/home");
    console.log("++++++++++++++++++++++Logout Done============");
  }

  const { user, isLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          {!isAuthenticated ? (
            navigate("/login")
          ) : (
            <Fragment>
              <MetaData title={`${user.name}'s Profile`} />

              <div className="container profile-container">
                <div>
                  <h1>My Profile</h1>
                  <img src={ProfilePng} alt={user.name} />
                  <Link to="/me/update">Edit Profile</Link>
                </div>

                <div>
                  <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                  </div>

                  <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                  </div>

                  <div>
                    <h4>joined On</h4>
                    <p>{String(user.createdAt).substr(0, 10)}</p>
                  </div>

                  <div>
                    <Link to="/orders">My Order</Link>
                    <Link to="/password/update">Change Password</Link>
                    <Link onClick={logoutUser}>Logout</Link>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Profile;
