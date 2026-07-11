import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const guestUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzt9giWjwNCackreb_tWA5drICRqkjo5ggAiSJ4ToZ1A&s";

  return (
    <div className="navbar w-full bg-base-300 shadow-sm px-2">
      <div className="flex-1 min-w-0">
        <Link
          to="/"
          className="btn btn-ghost text-xl px-2 whitespace-nowrap"
        >
          💻 DevTinder
        </Link>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {user && (
          <div className="flex items-center min-w-0">
            <p className="font-medium truncate max-w-[90px] sm:max-w-none">
              Welcome, {user.firstName}
            </p>

            {user.isPremium && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#1D9BF0"
                className="w-4 h-4 ml-1 shrink-0"
              >
                <path d="M12 2l2.09 2.26 3.07-.43.43 3.07L20 9l-2.41 2.1.43 3.07-3.07.43L12 17l-2.95-2.4-3.07-.43.43-3.07L4 9l2.41-2.1-.43-3.07 3.07.43L12 2zm-1 13l6-6-1.41-1.41L11 12.17l-2.59-2.58L7 11l4 4z" />
              </svg>
            )}
          </div>
        )}

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User"
                src={user ? user.photoUrl : guestUrl}
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            onClick={() => document.activeElement?.blur()}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>

            <li>
              <Link to="/connections" className="justify-between">
                Connection
              </Link>
            </li>

            <li>
              <Link to="/requests" className="justify-between">
                Request
              </Link>
            </li>

            <li>
              <Link to="/premium" className="justify-between">
                Premium
              </Link>
            </li>

            <li>
              <a onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;