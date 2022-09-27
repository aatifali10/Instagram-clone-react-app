import React from "react";

const Comments = () => {
  return (
    <div className="comments">
      <div className="comments__container"></div>
      <div className="comments__section">
        <input
          type="text"
          className="comments__input"
          placeholder="Add a comment ..."
        />
      </div>
    </div>
  );
};

export default Comments;
