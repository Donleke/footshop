import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ClimbingBoxLoader color="rgba(230, 66, 66, 1)" size={20} />
    </div>
  );
}
