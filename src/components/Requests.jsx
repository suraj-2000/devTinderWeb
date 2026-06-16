import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestsSlice";
import { useDispatch, useSelector } from "react-redux";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequest = async (status, _id)=> {
        try {
            await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
            dispatch(removeRequest(_id));

        } catch(err) {
            console.log(err);
        }

    }
    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received",{withCredentials:true});
            dispatch(addRequest(res.data.data));
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=> {
        fetchRequest();
    },[]);

    const requestList = requests?.map((request) => ({
  ...request.fromUserId,
  requestId: request._id,
}));
    return (
        <>
        <div className="max-w-4xl mx-auto my-8">
            <h1 className="text-xl font-bold text-center mb-8">
                Requests
            </h1>
                {(!requestList || requestList.length === 0) && (
                <p className="text-center mt-8">
                    No Requests Found.
                </p>
                )}            
                {requestList &&
                requestList.map((request) => {
                return (
                    <div
                    key={request._id}
                    className="card card-side bg-base-300 shadow-md mb-6 mx-auto max-w-2xl"
                    >
                    <figure className="p-4">
                        <img
                        src={request.photoUrl}
                        alt="user"
                        className="w-24 h-24 rounded-full object-cover"
                        />
                    </figure>

                    <div className="card-body">
                        <h2 className="card-title">
                        {request.firstName + " " + request.lastName}
                        </h2>
                        {request.about && <p>{request.about}</p>}
                        {request.age && <p>Age: {request.age}</p>}
                        {request.gender && <p>{request.gender}</p>}
                    </div>
                    <div className="card-actions justify-center gap-4 mt-10 mx-2">
                    <button className="btn btn-primary" onClick={()=>reviewRequest("rejected",request.requestId)}>Reject</button>
                    <button className="btn btn-secondary" onClick={()=>reviewRequest("accepted", request.requestId)}>Accept</button>
                    </div>
                    </div>
                );
            })}
        </div>
        </>
    );
}

export default Requests;