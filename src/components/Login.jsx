import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
    const [password, setPassword] = useState("");
    const [emailId, setEmailId] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL+"/login", {
                emailId,
                password
            },{withCredentials:true,});
            dispatch(addUser(res.data));
            navigate("/feed");
        } catch (err) {
            console.error(err);
        }

    }
    return (
        <div className="flex justify-center mt-5">
        <div className="card card-border bg-base-100 w-96">
            <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>

            <div className="flex items-center gap-2">
                <label className="w-24">Email ID:</label>
                <input
                value = {emailId}
                onChange={(e)=> {
                    setEmailId(e.target.value);
                }}
                className="input input-bordered flex-1"
                />
            </div>

            <div className="flex items-center gap-2">
                <label className="w-24">Password:</label>
                <input
                value = {password}
                onChange = {(e)=> {
                    setPassword(e.target.value);

                }}
                className="input input-bordered flex-1"
                />
            </div>

            <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary" onClick={handleLogin}>Login</button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Login;