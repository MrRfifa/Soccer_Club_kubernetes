import React, { useState, useEffect } from "react";
import axios from "axios";

const Members = () => {
  const [loading, setLoading] = useState(true);
  const [memberList, setMembersList] = useState([]);

  useEffect(() => {
    getMembers();
  }, []);
  const getMembers = async () => {
    await axios.get("http://localhost:3001/admin/allmembers").then((res) => {
      if (res.status === 200) {
        setMembersList(res.data);
      }
      setLoading(false);
    });
  };

  let membersessions_HTML_TABLE = "";
  if (loading) {
    return <h4>Loading data...</h4>;
  } else {
    membersessions_HTML_TABLE = memberList.map((item, index) => {
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
              <th className="ps-2">Participated</th>
            </tr>
          </thead>
          <tbody>{membersessions_HTML_TABLE}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
