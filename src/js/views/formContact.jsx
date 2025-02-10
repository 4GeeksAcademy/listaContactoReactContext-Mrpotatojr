import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Form = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate()
  const handleSubmit = () => {

    const contactData = {
      name: fullName,
      email: email,
      phone: phone,
      address: address
    };

    fetch('https://playground.4geeks.com/contact/agendas/potato/contacts', {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(contactData),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Contacto creado:", response);
      })
      .catch((error) => {
        console.error("Error al crear el contacto:", error);
      });
  };
  const handleNavigate = () => {navigate("/");}
  return (
    <div className="d-flex row mx-5">
      <h1 className="text-center">Add a new contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            required
          />
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">Save</button>
        </div>
      </form>
      <i onClick={handleNavigate} className="text-primary text-decoration-underline cursor-pointer">
        or get back to contacts
      </i>    </div>
  );
};
