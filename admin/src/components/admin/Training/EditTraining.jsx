import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const EditTraining = () => {
  let { id } = useParams();
  let history = useNavigate();
  const [date, setDate] = useState(
    new Date(
      new Date().getTime() +
        new Date().getTimezoneOffset() * 60000 +
        3600000 * 4
    )
      .toISOString()
      .slice(0, 16)
  );

  useEffect(() => {
    if (id) {
      getSingleSession(id);
    }
  }, [id]);
  const getSingleSession = async (id) => {
    try {
      const result = await axios.get(
        `http://localhost:3001/admin/get-session/${id}`
      );
      if (result.status === 200) {
        const d = new Date(result.data.date).toISOString().slice(0, 16);
        setDate(d);
      } else if ((result.status = 404)) {
        swal("Oops!", "Can't get ID", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelUpdate = () => {
    history(-1);
  };
  const updateSession = async (e) => {
    e.preventDefault();
    try {
      const newData = {
        date: date,
      };
      const result = await axios.put(
        `http://localhost:3001/admin/edit-session/${id}`,
        newData
      );
      if (result.status === 200) {
        swal("Success!", result.data.message, "success");
        history("/admin/training");
      }
    } catch (error) {
      swal("Oops!", error.response.data.error, "error");
      console.log(error);
    }
  };
  return (
    <div className="container px-4 mt-5">
      <div className="row justify-content-center">
        <div className="form-group mb-3 col-md-6 ">
          <form onSubmit={updateSession}>
            <div className="form-group mb-3">
              <label htmlFor="date" className="form-label">
                Enter the new date and time for the training session
                <div
                  className="badge bg-danger text-wrap"
                  style={{ width: "7rem", marginLeft: "10px" }}
                >
                  Time zone UTC
                </div>
              </label>
              <input
                type="datetime-local"
                name="datetime"
                className="form-control"
                value={date}
                min={new Date().toISOString().slice(0, 16)}
                max="2023-06-14T17:00"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              ></input>
            </div>
            <div className="form-group mb-3 d-flex justify-content-between">
              <button className="btn btn-outline-info" type="submit">
                Update session
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
  );
};

export default EditTraining;
