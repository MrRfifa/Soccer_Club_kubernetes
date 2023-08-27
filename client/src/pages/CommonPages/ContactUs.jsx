import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const submitContact = async (e) => {
    e.preventDefault();
    try {
      const contactData = {
        subject,
        description,
      };
      await axios
        .post(`http://${import.meta.env.VITE_SERVER_API_URL}:${import.meta.env.VITE_SERVER_PORT}/auth/contactus`, contactData)
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
            setSubject("");
            setDescription("");
          }
        });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>What can we help you with?</h4>
            </div>
            <div className="card-body">
              <form onSubmit={submitContact}>
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

                <div className="form-group mb-3 ms-5">
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

export default ContactUs;
