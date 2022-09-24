import React, { useState } from "react";

const Stories = () => {
  const [state, setState] = useState([
    { id: 0, image: "/images/Aatif0.jpg", name: "Aatif Ali" },
    { id: 1, image: "/Images/ahmed1.jpg", name: "Ahmed Shahzad" },
    { id: 2, image: "/Images/M.rizwan3.jpg", name: "M.Rizwan" },
    { id: 3, image: "/Images/shahid2.jpg", name: "Shahid afridi" },
    { id: 4, image: "/Images/babar4.jpg", name: "Babar azam" },
    { id: 5, image: "/Images/fawad1.jpg", name: "Fawad khan" },
    { id: 6, image: "/Images/feroz1.jpg", name: "Feroz khan" },
    { id: 7, image: "/Images/ahsan1.jpg", name: "Ahsan khan" },
  ]);
  return (
    <div className="stories">
      {state.map((user) => (
        <div className="stories__info" key={user.id}>
          <div className="stories__img">
            <span>
              <img src={user.image} alt="user" />
            </span>
          </div>
          <div className="stories__name">{user.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Stories;
