import React from "react";

const CustomerInfo = ({ customer, setCustomer }) => {
  const update = (field, value) =>
    setCustomer({ ...customer, [field]: value });

  return (
    <div className="section">
      <h2>Customer Information</h2>

      <div className="form-grid">
        <input
          type="text"
          placeholder="Full Name"
          value={customer.name}
          onChange={(e) => update("name", e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={(e) => update("phone", e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={customer.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>
    </div>
  );
};

export default CustomerInfo;
