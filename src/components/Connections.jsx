import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";
import { useEffect } from "react";


const Connections = () => {
    const  dispatch = useDispatch();
    const connectionList = useSelector((store) => store.connections);
    const fetchConnection = async ()=> {
        try {
            const res = await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
            dispatch(addConnection(res.data.data));

        } catch(err) {
            console.log(err);
        }
    }
    useEffect(()=> {
        fetchConnection();
    },[])
    return (
        <>
        <div className="max-w-4xl mx-auto my-8">
            <h1 className="text-xl font-bold text-center mb-8">
                Connections
            </h1>
                {(!connectionList || connectionList.length === 0) && (
                <p className="text-center mt-8">
                    No Connections Found.
                </p>
                )}            
                {connectionList &&
                connectionList.map((connection) => {
                return (
                    <div
                    key={connection._id}
                    className="card card-side bg-base-300 shadow-md mb-6 mx-4 max-w-2xl"
                    >
                    <figure className="p-6">
                        <img
                        src={connection.photoUrl}
                        alt="user"
                        className="w-20 h-20 rounded-full object-cover"
                        />
                    </figure>

                    <div className="card-body">
                        <h2 className="card-title">
                        {connection.firstName + " " + connection.lastName}
                        </h2>
                        {connection.about && <p>{connection.about}</p>}
                        {connection.age && <p>Age: {connection.age}</p>}
                        {connection.gender && <p>{connection.gender}</p>}
                    </div>
                    </div>
                );
            })}
        </div>
        </>
    );

}

export default Connections;