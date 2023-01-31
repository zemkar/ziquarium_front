import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { Navigate } from 'react-router-dom';
import UserService from "../service/userService";

import { loadUserProfile } from "../actions/user";
import { userProfile } from "../interface";



const Profile = () => {
  const dispatch: any = useAppDispatch();

  const { user: currentUser } = useAppSelector((state) => state.authReducers.auth);
  const { profile } = useAppSelector((state) => state.userProfileReducers.profile);

  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  const [Profile, setProfile] = useState<userProfile | undefined>()
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

  const handlerSaveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveLoading(true)
    if (Profile && (
        firstName !== Profile.first_name || 
        lastName !== Profile.last_name || 
        bio !== Profile.bio || 
        location !== Profile.location || 
        birthDate !== Profile.birth_date)) {

      if (birthDate === '') { setBirthDate(null) }

      var profileData = {
        location: location, 
        birth_date: birthDate, 
        bio: bio, 
        username: username, 
        email: email, 
        first_name: firstName, 
        last_name: lastName}

      UserService.modProfile(profileData)
        .finally(() => setSaveLoading(false))
      
    }
  }


  // const logOut = useCallback(() => dispatch(logout() as any), [dispatch]);
  const fillUserProfile = useCallback(() => {
      dispatch(loadUserProfile())
        .then(
          (response: any) => {
            setProfile(response.data)
            console.log("Profile - loadUserData | user response:\n", response.data);
          },
          (error: any) => {
            console.log("Profile - loadUserData | user ERROR:", error);
          }
        );
  }, [dispatch])




  useEffect(() => {
    if (!profile) {
      console.log("useEffect in Profile, go get user");
      fillUserProfile()
    } else {
      setProfile(profile);
    }
  }, [profile, fillUserProfile]);


  useEffect(() => {
    if (Profile && loading) {
      console.log("loaded", loading);
      console.log("Profile user in store", Profile);
      setEmail(Profile.email)
      setUsername(Profile.username)
      setFirstName(Profile.first_name)
      setLastName(Profile.last_name)
      setLocation(Profile.location)
      setBirthDate(Profile.birth_date ? Profile.birth_date : "")
      setBio(Profile.bio)

      setLoading(false)
    }
  }, [loading,Profile])

  return (
    <div className="col-md-12">
      {!currentUser && <Navigate to="/" />}
      <div className="card card-container" style={{ width: "20rem" }}>
        <header className="jumbotron card-header">
          <h3>
            <strong>{currentUser?.name}</strong> Profile
          </h3>
        </header>

        {/*  */}
        {/* <div className="card card-container"> */}
        <form onSubmit={handlerSaveProfile}>
          {loading && <span className="spinner-border spinner-border-sm"></span>}
          <p>
            <strong>Id:</strong> {currentUser?.id} | <strong>Is editor:</strong> {currentUser?.editor ? "yes" : "No"}
          </p>
          <p>
            <strong>Email:</strong>
            <input className="form-control" aria-label="E-mail" defaultValue={Profile?.email} disabled readOnly />
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
          <button className="btn btn-primary btn-block" disabled={loading}>
            {saveLoading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            Save</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
