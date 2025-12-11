import React from "react";

const SpecialRequestInput = ({ specialRequest, setSpecialRequest }) => {
  return (
    <div className="special-request">
      <textarea
        placeholder="Special Request"
        value={specialRequest}
        onChange={(e) => setSpecialRequest(e.target.value)}
      />
    </div>
  );
};

export default SpecialRequestInput;
