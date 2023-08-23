import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

const Admins = () => {
  const [loading, setLoading] = useState(true);
  const [adminList, setAdminsList] = useState([]);
  const { username } = useContext(AuthContext);

  useEffect(() => {
    getAdmins();
  }, []);
  const getAdmins = async () => {
    await axios.get("http://localhost:3001/admin/alladmins").then((res) => {
      if (res.status === 200) {
        setAdminsList(res.data);
      }
      setLoading(false);
    });
  };

  let adminsessions_HTML_TABLE = "";
  if (loading) {
    return <h4>Loading data...</h4>;
  } else {
    adminsessions_HTML_TABLE = adminList.map((item, index) => {
      return (
        <tr key={index}>
          <td className="ps-5" style={{ width: "70px" }}>
            {index + 1}
          </td>
          <td className="ps-5" style={{ width: "70px" }}>
            {item.username}
          </td>
          {item.username === username ? (
            <td className="ps-5" style={{ width: "50px" }}>
              <span className="badge rounded-pill text-bg-success">True</span>
            </td>
          ) : (
            <td className="ps-5" style={{ width: "50px" }}>
              <span className="badge rounded-pill text-bg-danger">False</span>
            </td>
          )}
        </tr>
      );
    });
  }

  return (
    <div className="container px-4 col-md-8">
      <div className="card-body">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th className="ps-5" style={{ width: "70px" }}>
                ID
              </th>
              <th className="ps-5" style={{ width: "70px" }}>
                Username
              </th>
              <th className="ps-5" style={{ width: "50px" }}>
                Logged In
              </th>
            </tr>
          </thead>
          <tbody>{adminsessions_HTML_TABLE}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Admins;
