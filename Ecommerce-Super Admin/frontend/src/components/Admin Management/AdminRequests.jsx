// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AdminRequests.css";
// import { assets } from "../../assets/assets";

// const AdminRequests = () => {
//   const [adminRequests, setAdminRequests] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch all admins but filter out those with 'approved' status
//     axios
//       .get("http://localhost:5000/admin/list") // Update the URL as necessary
//       .then((response) => {
//         const pendingAdmins = response.data.data.filter(
//           (admin) => admin.status === "pending"
//         );
//         setAdminRequests(pendingAdmins);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Error fetching admin requests");
//         setLoading(false);
//       });
//   }, []);

//   const handleApproveReject = (adminId, action) => {
//     axios
//       .put("http://localhost:5000/admin/approve-reject", { adminId, action })
//       .then((response) => {
//         alert(response.data.message);
//         setAdminRequests((prevRequests) =>
//           prevRequests.filter((admin) => admin._id !== adminId)
//         );
//       })
//       .catch(() => {
//         alert("Error approving/rejecting admin");
//       });
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="adminRequests">
//       <div className="adminRequestsTitle">Admin Registration Requests</div>
//       {adminRequests.length === 0 ? (
//         <div>No pending admin requests</div>
//       ) : (
//         <div className="adminRequestsList">
//           {adminRequests.map((admin) => (
//             <div className="adminRequestItem" key={admin._id}>
//               <div className="adminRequestDetails">
//                 <p>
//                   <strong>Name:</strong> {admin.name}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {admin.email}
//                 </p>
//                 <p>
//                   <strong>Phone Number:</strong> {admin.phoneNumber}
//                 </p>
//                 <p>
//                   <strong>Address:</strong> {admin.address}
//                 </p>
//                 <p>
//                   <strong>Pincode:</strong> {admin.pincode}
//                 </p>
//                 <p>
//                   <strong>Government ID Type:</strong> {admin.govtIdType}
//                 </p>
//                 <p>
//                   <strong>Government ID:</strong> {admin.govtId}
//                 </p>
//                 <p>
//                   <strong>Business License:</strong>{" "}
//                     {admin.businessLicense ? (
//                     <a
//                       href="https://drive.google.com/drive/u/0/home"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="pdfLink"
//                     >
//                       View Image
//                     </a>
//                   ) : (
//                     "No License Uploaded"
//                   )}
//             </p>
//                 <p>
//                   <strong>GST:</strong> {admin.gstNumber}
//                 </p>
//                 <p>
//                   <strong>Status:</strong> {admin.status}
//                 </p>
//               </div>
//               <div className="adminRequestActions">
//                 <button
//                   className="approveButton"
//                   onClick={() => handleApproveReject(admin._id, "approve")}
//                 >
//                   <img className="icon" src={assets.approve} alt="" />
//                 </button>
//                 <button
//                   className="rejectButton"
//                   onClick={() => handleApproveReject(admin._id, "reject")}
//                 >
//                   <img className="icon" src={assets.del} alt="" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminRequests;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminRequests.css";
import { assets } from "../../assets/assets";

const AdminRequests = () => {
  const [adminRequests, setAdminRequests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all admins but filter out those with 'approved' status
    axios
      .get("http://localhost:5000/admin/list") // Update the URL as necessary
      .then((response) => {
        const pendingAdmins = response.data.data.filter(
          (admin) => admin.status === "pending"
        );
        setAdminRequests(pendingAdmins);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching admin requests");
        setLoading(false);
      });
  }, []);

  const handleApproveReject = (adminId, action) => {
    axios
      .put("http://localhost:5000/admin/approve-reject", { adminId, action })
      .then((response) => {
        alert(response.data.message);
        setAdminRequests((prevRequests) =>
          prevRequests.filter((admin) => admin._id !== adminId)
        );
      })
      .catch(() => {
        alert("Error approving/rejecting admin");
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="adminRequests">
      <div className="adminRequestsTitle">Admin Registration Requests</div>
      {adminRequests.length === 0 ? (
        <div>No pending admin requests</div>
      ) : (
        <div className="adminRequestsList">
          {adminRequests.map((admin) => (
            <div className="adminRequestItem" key={admin._id}>
              <div className="adminRequestDetails">
                <p>
                  <strong>Name:</strong> {admin.name}
                </p>
                <p>
                  <strong>Email:</strong> {admin.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {admin.phoneNumber}
                </p>
                <p>
                  <strong>Address:</strong> {admin.address}
                </p>
                <p>
                  <strong>Pincode:</strong> {admin.pincode}
                </p>
                <p>
                  <strong>Government ID Type:</strong> {admin.govtIdType}
                </p>
                <p>
                  <strong>Government ID:</strong> {admin.govtId}
                </p>
                <p>
                  <strong>Business License:</strong>{" "}
                  {admin.businessLicense ? (
                    <a
                      href={admin.businessLicense.startsWith("http") ? admin.businessLicense : "https://drive.google.com/file/d/1WmE-B5_fJcoHRpzY_vZKQLwsDXYlKFv7/view?usp=sharing"}
                      rel="noopener noreferrer"
                      className="pdfLink"
                    >
                      View License
                    </a>
                  ) : (
                    "No License Uploaded"
                  )}
                </p>
                <p>
                  <strong>GST:</strong> {admin.gstNumber}
                </p>
                <p>
                  <strong>Status:</strong> {admin.status}
                </p>
              </div>
              <div className="adminRequestActions">
                <button
                  className="approveButton"
                  onClick={() => handleApproveReject(admin._id, "approve")}
                >
                  <img className="icon" src={assets.approve} alt="Approve" />
                </button>
                <button
                  className="rejectButton"
                  onClick={() => handleApproveReject(admin._id, "reject")}
                >
                  <img className="icon" src={assets.del} alt="Reject" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
