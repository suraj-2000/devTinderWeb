import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-full max-w-[450px] h-[550px] shadow-2xl border border-base-content/10">
        <figure className="pt-8">
          <img
            className="w-52 h-52 rounded-full object-cover border-4 border-base-100 shadow-lg"
            src={
              photoUrl
                ? photoUrl
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzt9giWjwNCackreb_tWA5drICRqkjo5ggAiSJ4ToZ1A&s"
            }
            alt="User"
          />
        </figure>

        <div className="card-body items-center text-center justify-center">
          <h2 className="card-title text-3xl font-bold">
            {firstName + " " + lastName}
          </h2>

          {about && (
            <p className="text-base-content/80 text-base mt-2 px-4">
              {about}
            </p>
          )}

          <div className="flex gap-6 mt-4 text-base">
            {age && (
              <div className="badge badge-outline badge-lg">
                Age: {age}
              </div>
            )}

            {gender && (
              <div className="badge badge-outline badge-lg">
                {gender}
              </div>
            )}
          </div>

          <div className="divider my-6"></div>

          <div className="card-actions justify-center gap-4">
            <button
              className="btn btn-primary px-8"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>

            <button
              className="btn btn-secondary px-8"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;