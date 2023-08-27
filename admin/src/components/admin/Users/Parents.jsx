import React, { useState, useEffect } from "react";
import axios from "axios";

const Parents = () => {
  const [loading, setLoading] = useState(true);
  const [parentList, setParentsList] = useState([]);

  useEffect(() => {
    getParents();
  }, []);
  const getParents = async () => {
    await axios.get(`http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/admin/allparents`).then((res) => {
      if (res.status === 200) {
        setParentsList(res.data);
      }
      setLoading(false);
    });
  };

  let parentsessions_HTML_TABLE = "";
  if (loading) {
    return <h4>Loading data...</h4>;
  } else {
    parentsessions_HTML_TABLE = parentList.map((item, index) => {
      return (
        <tr key={index}>
          <td className="ps-2">{index + 1}</td>
          <td className="ps-2">{item.username}</td>
          <td className="ps-2">
            {item.lastName[0].toUpperCase() + item.lastName.substring(1)}
          </td>
          <td className="ps-2">
            {item.firstName[0].toUpperCase() + item.firstName.substring(1)}
          </td>
          <td className="ps-2">{item.options.length}</td>
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
              <th className="ps-2">ID</th>
              <th className="ps-2">Username</th>
              <th className="ps-2">Last name</th>
              <th className="ps-2">First name</th>
              <th className="ps-2">Kids</th>
            </tr>
          </thead>
          <tbody>{parentsessions_HTML_TABLE}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Parents;
