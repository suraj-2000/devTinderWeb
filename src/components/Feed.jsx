import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector(store => store.feed);
    const getFeed = async () => {
        try {
            if(!feed) {
                const res = await axios.get(BASE_URL+"/feed",{withCredentials:true});
                dispatch(addFeed(res.data.data));
            }
        } catch(err) {
            console.error(err);
        }

    }
    useEffect(()=> {
        getFeed();
    },[]);

    return (
        <>
        {feed?.map((user) => (
            <UserCard key={user._id} user={user} />
        ))}
        </>
    );
};

export default Feed;