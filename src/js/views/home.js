import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const navigate = useNavigate();

  async function getData() {
    const url = "https://playground.4geeks.com/contact/agendas/potato";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      setContacts(json.contacts);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setContactToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (contactToDelete) {
      try {
        const url = `https://playground.4geeks.com/contact/agendas/potato/contacts/${contactToDelete.id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        getData(); 
      } catch (error) {
        console.error("Error deleting contact:", error.message);
      } finally {
        handleCloseModal(); 
      }
    }
  };

  const handleClick = () => {
    navigate("/create");
  };

  const handleEditClick = (contact) => {
    navigate("/edit", { state: { contactToEdit: contact } }); 
  };

  return (
    <div className="mt-5">
      <div className="d-flex flex-column align-items-center">
        <div className="w-75 d-flex justify-content-end mb-3">
          <button type="button" className="btn btn-success" onClick={handleClick}>
            Add new contact
          </button>
        </div>

        {contacts &&
          contacts.map((item) => (
            <div key={item.id} className="card mb-3 w-75">
              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <img
                    src={"https://i.pravatar.cc/150?u=" + item.email}
                    className="img-fluid rounded-circle"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title d-flex justify-content-between align-items-center">
                      {item.name}
                      <div>
                        <i
                          className="fa-solid fa-pencil me-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEditClick(item)}
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDeleteClick(item)} 
                        ></i>
                      </div>
                    </h5>
                    <p className="card-text">
                      <btn>
                        <i className="fa-solid fa-location-dot"></i>
                      </btn>{" "}
                      {item.address}
                    </p>
                    <p className="card-text">
                      <i className="fa-solid fa-phone"></i> {item.phone}
                    </p>
                    <p className="card-text">
                      <i className="fa-solid fa-envelope"></i> {item.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {showModal && (
        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Are you sure?</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  If you delete this thing the universe will go down!
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Oh no!
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Yes baby!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};