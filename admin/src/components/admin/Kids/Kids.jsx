import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Kids = () => {
  const [listKids, setListKids] = useState([]);

  useEffect(() => {
    getKids();
  }, []);
  const getKids = async () => {
    const result = await axios.get(`http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/admin/allkids`);
    if (result.status === 200) {
      setListKids(result.data);
    }
  };

  const onDeleteKid = async (e, id) => {
    e.preventDefault();
    if (window.confirm("Are you sure that you want to delete this kid")) {
      const result = await axios.delete(
        `http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/admin/delete/${id}`
      );
      if (result.status === 200) {
        swal("Success!", "kid deleted successfullt", "success");
        getKids();
      }
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">All kids</h1>
      <div className="row row-cols-3 mb-5">
        {listKids &&
          listKids.map((item, index) => {
            const base64String = btoa(
              String.fromCharCode(...new Uint8Array(item.info.data.data))
            );
            return (
              <div className="col mb-5" key={index}>
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src={`data:image/png;base64,${base64String}`}
                    alt={item.firstName + " " + item.lastName + " image"}
                    className="card-img-top"
                    style={{ height: "250px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-primary">
                      {item.firstName +
                        " " +
                        item.lastName[0].toUpperCase() +
                        item.lastName.substring(1)}
                    </h5>
                    {/* <p className="card-text"></p> */}
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item text-info">
                      Date of Birth : {item.dateOfBirth.substring(0, 10)}{" "}
                    </li>
                    <li className="list-group-item text-info">
                      Parent : {item.parentUname}
                    </li>
                  </ul>
                  <div className="card-body">
                    <Link
                      to={`edit-kid/${item._id}`}
                      className="btn btn-outline-warning me-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => onDeleteKid(e, item._id)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Kids;
