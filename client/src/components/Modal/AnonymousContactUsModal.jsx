import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AnonymousContactUsModal = () => {
  const [identifier, setIdentifier] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const submitAnonymContact = async (e) => {
    e.preventDefault();
    try {
      const anonymContactData = {
        identifier,
        subject,
        description,
      };
      await axios
        .post(`http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/auth/contactanonym`, anonymContactData)
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setIdentifier("");
            setSubject("");
            setDescription("");
          }
        });
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="anonymousModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                What can we help you with?
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={submitAnonymContact}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={identifier}
                    className="form-control"
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                    }}
                    required
                    autoComplete="off"
                    placeholder="example@example.ex"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={subject}
                    className="form-control"
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                    required
                    autoComplete="off"
                    placeholder="example example"
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Description</label>
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    required
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="form-group mb-3 d-flex justify-content-between">
                  <button
                    className="btn btn-secondary "
                    type="button"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button className="btn btn-info" type="submit">
                    Submit
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

export default AnonymousContactUsModal;
