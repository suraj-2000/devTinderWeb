import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { userLoginValidation } from "../utils/validations";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoginError("");

    const validationErrors = userLoginValidation(firstName, lastName, emailId, password, isLogin);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setLoginError(err.response?.data || "Wrong credentials");
    }
  };
  const handleSignUp = async () => {
    setLoginError("");

    const validationErrors = userLoginValidation(firstName, lastName, emailId, password);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setLoginError(err.response?.data || "Wrong credentials");
    }
  };

  return (
    <div className="flex justify-center mt-5">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLogin ? "Login": "Sing Up"}</h2>

          {loginError && (
            <p className="text-red-500 text-center mb-2">
              {loginError}
            </p>
          )}

          {!isLogin && <><div className="mb-3">
            <div className="flex items-center gap-2">
              <label className="w-24">First Name:</label>

              <div className="flex-1">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);

                    if (errors.firstName) {
                      setErrors((prev) => ({
                        ...prev,
                        firstName: "",
                      }));
                    }
                  }}
                  className="input input-bordered w-full"
                />

                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <label className="w-24">Last Name:</label>

              <div className="flex-1">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);

                    if (errors.lastName) {
                      setErrors((prev) => ({
                        ...prev,
                        lastName: "",
                      }));
                    }
                  }}
                  className="input input-bordered w-full"
                />

                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
          </div></>}
          <div className="mb-3">
            <div className="flex items-center gap-2">
              <label className="w-24">Email ID:</label>

              <div className="flex-1">
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => {
                    setEmailId(e.target.value);

                    if (errors.email) {
                      setErrors((prev) => ({
                        ...prev,
                        email: "",
                      }));
                    }
                  }}
                  className="input input-bordered w-full"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center gap-2">
              <label className="w-24">Password:</label>

              <div className="flex-1">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    if (errors.password) {
                      setErrors((prev) => ({
                        ...prev,
                        password: "",
                      }));
                    }
                    setLoginError("");
                  }}
                  className="input input-bordered w-full"
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={isLogin ? handleLogin : handleSignUp}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <p className="m-auto my-2 cursor-pointer" onClick={()=> setIsLogin((value) => !value)}>{isLogin ? "New User ? Sing Up here" : "Existing User login here" }</p>
        </div>
      </div>
    </div>
  );
};

export default Login;