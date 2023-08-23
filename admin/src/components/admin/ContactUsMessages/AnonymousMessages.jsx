import React, { useState, useEffect } from "react";
import axios from "axios";

const AnonymousMessages = () => {
  const [anonymousMessages, setAnonymousMessages] = useState([]);

  useEffect(() => {
    getAnonymousMessages();
  }, []);
  const getAnonymousMessages = async () => {
    await axios.get("http://localhost:3001/admin/anonymous").then((res) => {
      if (res.status === 200) {
        setAnonymousMessages(res.data);
      }
    });
  };
  return anonymousMessages.map((item, index) => {
    return (
      <div
        className="accordion mt-3"
        id="accordionPanelsStayOpenExample"
        key={index}
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              {item.identifier}
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
              <span className="badge text-bg-info">{item.subject}</span>
              {"\n"}
              {item.description}
            </div>
          </div>
        </div>
      </div>
    );
  });
};

export default AnonymousMessages;
