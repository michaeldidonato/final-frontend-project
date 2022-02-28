import React from "react";

function Loading() {
  return (
    <>
      <div className="spinner-border text-warning m-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );
}

export default Loading;
