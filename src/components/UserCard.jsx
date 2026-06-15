const UserCard = ({ user }) => {
  console.log("url" + user.photoUrl);

  const { firstName, lastName, age, gender, photoUrl, about } = user;

  return (
    <>
      <div className="flex justify-center">
        <div className="card bg-base-300 w-[450px] shadow-xl my-2">
          <figure className="pt-8">
            <img
              className="w-44 h-44 rounded-full object-cover border-4 border-base-100 shadow-lg"
              src={
                photoUrl
                  ? photoUrl
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzt9giWjwNCackreb_tWA5drICRqkjo5ggAiSJ4ToZ1A&s"
              }
              alt="User"
            />
          </figure>

          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">
              {firstName + " " + lastName}
            </h2>

            {about && <p>{about}</p>}
            {age && <p>Age: {age}</p>}
            {gender&&<p>Gender: {gender}</p>}

            <div className="card-actions justify-center gap-4 mt-6">
              <button className="btn btn-primary">Ignore</button>
              <button className="btn btn-secondary">Interested</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;