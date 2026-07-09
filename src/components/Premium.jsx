import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {


  const handleBuyClick = async (type)=> {
    const order = await axios.post(BASE_URL+"/payment/create",{
        membershipType: type,
    },{withCredentials:true});

    //Opne razorpay dialog box
    const {amount, keyId, currency, notes, orderId} = order.data;
    const options = {
      key: keyId,
      amount,
      currency,
      name: "DevTinder",
      description: `${type} Membership`,
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      notes: {
        membershipType: type,
      },

      theme: {
        color: "#7C3AED",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();


  }
  return (
    <>
      <div className="text-center mt-10 px-4">
        <h1 className="text-4xl font-bold">
          Upgrade to Premium 🚀
        </h1>

        <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
          Unlock premium features and get a better experience on DevTinder.
          Connect with more people, increase your visibility, and find your
          perfect match faster.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 p-8">

        {/* Silver Membership */}
        <div className="card w-96 bg-base-300 shadow-2xl border border-base-content/10">
          <div className="card-body">
            <span className="badge badge-primary">
              Silver Membership
            </span>

            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Silver</h2>
              <span className="text-xl font-semibold">₹299/month</span>
            </div>

            <ul className="mt-6 space-y-3">
              <li>✅ Chat with other people</li>
              <li>✅ 100 connection requests per day</li>
              <li>✅ Blue tick verification</li>
              <li>✅ Valid for 3 months</li>
            </ul>

            <div className="card-actions mt-8">
              <button className="btn btn-primary w-full" onClick={()=>handleBuyClick("silver")}>
                Buy Silver
              </button>
            </div>
          </div>
        </div>


        {/* Gold Membership */}
        <div className="card w-96 bg-base-300 shadow-2xl border border-base-content/10">
          <div className="card-body">
            <span className="badge badge-secondary">
              Most Popular
            </span>

            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Gold</h2>
              <span className="text-xl font-semibold">₹599/month</span>
            </div>

            <ul className="mt-6 space-y-3">
              <li>✅ Chat with other people</li>
              <li>✅ Unlimited connection requests</li>
              <li>✅ Blue tick verification</li>
              <li>✅ Valid for 6 months</li>
            </ul>

            <div className="card-actions mt-8">
              <button className="btn btn-secondary w-full" onClick={()=>handleBuyClick("gold")}>
                Buy Gold
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Premium;