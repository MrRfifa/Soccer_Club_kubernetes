import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Editkid = () => {
  let { id } = useParams();
  let history = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [date, setDate] = useState(
    new Date(2005, 1, 1).toISOString().slice(0, 10)
  );
  useEffect(() => {
    if (id) {
      getSingleKid(id);
    }
  }, [id]);
  const getSingleKid = async (id) => {
    const result = await axios.get(`http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/admin/getkid/${id}`);
    if (result.status === 200) {
      setFirstname(result.data.firstName);
      setLastname(result.data.lastName);
      const d = new Date(result.data.dateOfBirth).toISOString().slice(0, 10);
      setDate(d);
    }
  };
  const cancelUpdate = () => {
    history(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        firstName: firstname,
        lastName: lastname,
        dateOfBirth: date,
      };
      const result = await axios.put(
        `http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/admin/update/${id}`,
        data
      );
      if (result.status === 200) {
        swal("Success!", "kid updated successfully", "success");
        history(-1);
      }
    } catch (error) {
      swal("Ooops!", error.response.data.error, "error");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Register</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="firstname">Firstname</label>
                  <input
                    type="text"
                    name="firstname"
                    value={firstname}
                    className="form-control"
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                    required
                    autoComplete="off"
                    placeholder="Firstname"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="lastname">Lastname</label>
                  <input
                    type="lastname"
                    name="lastname"
                    value={lastname}
                    className="form-control"
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                    required
                    autoComplete="off"
                    placeholder="Lastname"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="date-of-birth">Date of birth</label>
                  <input
                    type="date"
                    name="date-of-birth"
                    value={date}
                    className="form-control"
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="form-group mb-3 d-flex justify-content-between">
                  <button className="btn btn-outline-success" type="submit">
                    Update kid
                  </button>
                  <button
                    className="btn btn-outline-secondary "
                    type="button"
                    onClick={cancelUpdate}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editkid;
