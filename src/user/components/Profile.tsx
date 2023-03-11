import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Navigate } from 'react-router-dom';
import UserService from "../service/userService";

import { dropLogin } from "../../auth/actions/auth";
import { loadUserProfile, clearStoreUserProfile, deleteUserProfile } from "../actions/user";
import { userProfile } from "../interface";



const Profile = () => {
  const dispatch: any = useAppDispatch();

  const { user: currentUser } = useAppSelector((state) => state.authReducers.auth);
  const { profile } = useAppSelector((state) => state.userProfileReducers.profile);

  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  const [StateProfile, setStateProfile] = useState<userProfile | undefined>()
  // ({location:"", birthDate:"", bio:"", username:"", email:"", first_name:"", last_name:""})

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("") // to load
  const [lastName, setLastName] = useState("") // to load

  const [location, setLocation] = useState("") // to load
  const [birthDate, setBirthDate] = useState<any>("") // to load
  const [bio, setBio] = useState("") // to load


  // const onChangeUsername = (e) => { const username = e.target.value; setUsername(username); }; // blocked for change
  // const onChangeEmail = (e) => { const email = e.target.value; setEmail(email); };// blocked for change
  const onChangeFirstName = (e: any) => { const first_name = e.target.value; setFirstName(first_name); };
  const onChangeLastName = (e: any) => { const last_name = e.target.value; setLastName(last_name); };
  const onChangeLocation = (e: any) => { const location = e.target.value; setLocation(location); };
  const onChangeBirthDate = (e: any) => { const birthDate = e.target.value; setBirthDate(birthDate); };
  const onChangeBio = (e: any) => { const bio = e.target.value; setBio(bio); };


  const [clickedButton, setClickedButton] = useState('');

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    if (button.name === "save") {
      handlerSaveProfile()
    } else if (button.name === "delete") {
      handlerDeleteProfile()
    }
    setClickedButton(button.name);
  };

  const handlerSaveProfile = () => { //event: FormEvent<HTMLFormElement>
    // console.log("save pressed");

    // event.preventDefault();
    setSaveLoading(true)
    if (StateProfile && (
      firstName !== StateProfile.first_name ||
      lastName !== StateProfile.last_name ||
      bio !== StateProfile.bio ||
      location !== StateProfile.location ||
      birthDate !== StateProfile.birth_date)) {

      if (birthDate === '') { setBirthDate(null) }

      var profileData = {
        location: location,
        birth_date: birthDate,
        bio: bio,
        username: username,
        email: email,
        first_name: firstName,
        last_name: lastName,
        is_superuser: profile.is_superuser
      }

      UserService.modProfile(profileData)
        .finally(() => {
          fillUserProfile();
          setSaveLoading(false);
        })

      setClickedButton("")
    } else { setSaveLoading(false) }
  }

  const handlerDeleteProfile = () => { //event: FormEvent<HTMLFormElement>
    // event.preventDefault();
    setSaveLoading(true)
    if (StateProfile) {

      dispatch(deleteUserProfile())
      dispatch(dropLogin())
      setSaveLoading(false)

      setClickedButton("")
    } else { setSaveLoading(false) }
  }


  // const logOut = useCallback(() => dispatch(logout() as any), [dispatch]);
  const fillUserProfile = useCallback(() => {
    dispatch(loadUserProfile())
      .then(
        (response: any) => {
          setStateProfile(response.data)
          // console.log("Profile - loadUserData | user response:\n", response.data);
        },
        (error: any) => {
          // console.log("Profile - loadUserData | user ERROR:", error);
        }
      );
  }, [dispatch])

  const clearUserProfile = useCallback(() => {
    dispatch(clearStoreUserProfile())
    setStateProfile(undefined)
  }, [dispatch])




  useEffect(() => {
    if (!profile) {
      // console.log("useEffect in Profile, go get user");
      fillUserProfile()
    } else {
      // console.log("User for profile:", currentUser);
      if (!currentUser || currentUser?.id !== profile.id) {
        // console.log("IDs:", currentUser?.id, profile.id);

        clearUserProfile()
      }

      setStateProfile(profile);
    }
  }, [profile, fillUserProfile, currentUser, clearUserProfile]);


  useEffect(() => {
    if (StateProfile && loading) {
      // console.log("loaded", loading);
      // console.log("Profile user in store", StateProfile);
      setEmail(StateProfile.email || "")
      setUsername(StateProfile.username || "")
      setFirstName(StateProfile.first_name || "")
      setLastName(StateProfile.last_name || "")
      setLocation(StateProfile.location || "")
      setBirthDate(StateProfile.birth_date ? StateProfile.birth_date : "")
      setBio(StateProfile.bio || "")

      setLoading(false)
    }
  }, [loading, StateProfile])

  return (
    < >
      {!currentUser && <Navigate to="/" />}
      <div className="card card-container" style={{ width: "30rem", maxWidth: "40vw" }}>
        <header className="jumbotron card-header">
          <h3>
            <strong>{currentUser?.name}</strong> Profile
          </h3>
        </header>

        {/*  */}
        {/* <div className="card card-container"> */}
        <form>
          {loading && <span className="spinner-border spinner-border-sm"></span>}
          <p>
            <strong>Id:</strong> {currentUser?.id} | <strong>Is editor:</strong> {currentUser?.editor ? "yes" : "No"} | <strong>Is admin:</strong> {currentUser?.admin ? "yes" : "No"}
          </p>
          <p>
            <strong>Email:</strong>
            <input className="form-control" aria-label="E-mail" defaultValue={StateProfile?.email} disabled readOnly />
          </p>
          <p>
            <strong>First name:</strong>
            <input className="form-control" aria-label="First name" value={firstName} onChange={onChangeFirstName} />
          </p>
          <p>
            <strong>Last name:</strong>
            <input className="form-control" aria-label="Last name" value={lastName} onChange={onChangeLastName} />
          </p>
          <p>
            <strong>Location:</strong>
            <input className="form-control" aria-label="Location" value={location} onChange={onChangeLocation} />
          </p>
          <p>
            <strong>Birth date:</strong>
            <input type="date" className="form-control" aria-label="Birth date" value={birthDate} onChange={onChangeBirthDate} />
          </p>
          <p>
            <strong>Bio:</strong>
            <textarea className="form-control" aria-label="Bio" rows={3} value={bio} onChange={onChangeBio} />
          </p>
        </form>
        <button onClick={buttonHandler} name="save" className="btn btn-primary btn-block" disabled={loading}>
          {saveLoading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          Save</button>
        <hr />

        <button onClick={buttonHandler} name="delete" className="btn btn-danger btn-block" disabled={loading} >
          {saveLoading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          Delete</button>

        {clickedButton !== ""
          ? `You have clicked "${clickedButton}"`
          : "No button clicked yet"}
      </div>
    </ >
  );
};

export default Profile;
