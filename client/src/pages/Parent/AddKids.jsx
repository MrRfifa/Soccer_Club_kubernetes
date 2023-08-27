import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";

function AddKids() {
  const { lastName } = useContext(AuthContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState(
    lastName[0].toUpperCase() + lastName.substring(1)
  );
  const [date, setDate] = useState(
    new Date(2005, 1, 1).toISOString().slice(0, 10)
  );
  const [filename, setFilename] = useState("");

  let { id } = useParams();
  let history = useNavigate();

  useEffect(() => {
    if (id) {
      getSingleKid(id);
    }
  }, [id]);
  const getSingleKid = async (id) => {
    const result = await axios.get(`http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/kid/${id}`);
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

    if (!id) {
      try {
        const formData = new FormData();
        formData.append("firstName", firstname);
        formData.append("lastName", lastname);
        formData.append("dateOfBirth", date);
        formData.append("image", filename);

        const result = await axios.post(
          `http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/kid/addKid`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (result.status === 200) {
          toast.success(result.data, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          history("/kid");
        }
      } catch (err) {
        toast.error(err.response.data.error);
        console.log(err);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("firstName", firstname);
        formData.append("lastName", lastname);
        formData.append("dateOfBirth", date);
        formData.append("image", filename);
        const result = await axios.put(
          `http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/kid/update/${id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (result.status === 200) {
          toast.success(result.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          history("/kid");
        }
      } catch (err) {
        toast.error(err.response.data.error);
        console.log(err);
      }
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Register</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group mb-3">
                  <label htmlFor="lastname">Last name</label>
                  <input
                    type="lastname"
                    disabled
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
                  <label htmlFor="firstname">First name</label>
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
                {!id && (
                  <div className="form-group mb-3">
                    <label htmlFor="file">Choose your kid image</label>
                    <input
                      type="file"
                      name="image"
                      filename="image"
                      className="form-control"
                      onChange={(e) => {
                        setFilename(e.target.files[0]);
                      }}
                      accept="image/*"
                      required
                    />
                  </div>
                )}
                <div className="form-group mb-3 d-flex justify-content-between">
                  <button className="btn btn-success" type="submit">
                    {!id ? "Add kid" : "Update kid"}
                  </button>
                  <button
                    className="btn btn-secondary "
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
}

export default AddKids;
