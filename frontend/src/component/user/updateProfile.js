import React, { Fragment, useEffect, useState } from "react";
import "./updateProfile.css";
import Loader from "../loader/loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/metaData/metaData";
import { fetchUserUpdateProfile, reset } from "../../slice/userProfileslice";
import { fetchLoadUser } from "../../slice/userSlice";
import ProfilePng from "../../images/user.png";

// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
// import FaceIcon from "@mui/icons-material/Face";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isloading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const { error, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(ProfilePng);

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(fetchUserUpdateProfile(myForm));
  };

  const UpdateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar.url);
    }
    if (error) {
      console.error();
    }

    if (isUpdated) {
      dispatch(fetchLoadUser());
      navigate("/account");
      dispatch(reset());
    }
  }, [dispatch, user, error, navigate, isUpdated]);

  return (
    <Fragment>
      {isloading ? (
        <Loader />
      ) : (
        <Fragment>
          {!isAuthenticated ? (
            navigate("/login")
          ) : (
            <Fragment>
              <MetaData title="Update Profile" />
              <div className="updateProfileContainer">
                <div className="updateProfileBox">
                  <h2 className="updateProfileHeading">Update Profile</h2>
                  <form
                    className="updateProfileForm"
                    encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}
                  >
                    <div className="updateProfileName">
                      {/* <FaceIcon /> */}
                      <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="updateProfileEmail">
                      {/* <MailOutlineIcon /> */}
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div id="updateProfileImage">
                      <img src={avatarPreview} alt="Avatar Preview" />
                      {/* <LockOpenIcon /> */}
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={UpdateProfileDataChange}
                      />
                    </div>

                    <input
                      type="submit"
                      value="Update"
                      className="updateProfileBtn"
                      //   disabled={loading ? true : false}
                    />
                  </form>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
