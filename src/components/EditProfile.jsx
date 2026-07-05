import { useState } from "react";
import axios from "axios";
import { useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile = ({userData})=> {
  
  const [firstName, setFirstName] = useState(userData?.firstName);
  const [lastName, setLastName] = useState(userData?.lastName);
  const [photoUrl, setPhotoUrl] = useState(userData?.photoUrl);
  const [about, setAbout] = useState(userData?.about);
  const [age, setAge] = useState(userData?.age);
  const [gender, setGender] = useState(userData?.gender);
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  
  const updateProfile = async () => {
    try {
        const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          about,
          age,
          gender,
          photoUrl
        },
        {
          withCredentials: true
        }
      ); 
      dispatch(addUser(res?.data?.data)); 
      setToast(true);
      setTimeout(()=> {
        setToast(false);
      }, 3000);
    } catch (err) {
        console.error(err);
    }
  };
    return (
  <>
    {toast && <div className="toast toast-top toast-center">
    <div className="alert alert-success">
        <span>Profile updated successfully.</span>
    </div>
    </div>}
    <div className="flex justify-center items-start gap-10 my-10 px-4 flex-wrap">
  <div className="card bg-base-300 w-[450px] shadow-2xl border border-base-content/10">
    <div className="card-body">
      <h2 className="card-title justify-center text-2xl font-bold mb-4">
        Edit Profile
      </h2>

      <div className="mb-3">
        <div className="flex items-center gap-2">
          <label className="w-24 font-medium">First Name:</label>

          <div className="flex-1">
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 my-4">
          <label className="w-24 font-medium">Last Name:</label>

          <div className="flex-1">
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 my-4">
          <label className="w-24 font-medium">Photo URL:</label>

          <div className="flex-1">
            <input
              value={photoUrl}
              onChange={(e) => {
                setPhotoUrl(e.target.value);
              }}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 my-4">
          <label className="w-24 font-medium">Age:</label>

          <div className="flex-1">
            <input
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 my-4">
          <label className="w-24 font-medium">About:</label>

          <div className="flex-1">
            <input
              value={about}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="w-24 font-medium">Gender:</label>

          <div className="flex-1">
            <input
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="card-actions justify-center mt-2">
        <button
          className="btn btn-primary px-8"
          onClick={updateProfile}
        >
          Save Profile
        </button>
      </div>
    </div>
  </div>

  <UserCard
    user={{
      firstName,
      lastName,
      about,
      age,
      photoUrl,
      gender,
    }}
  />
</div>
  </>
);
}
export default EditProfile;