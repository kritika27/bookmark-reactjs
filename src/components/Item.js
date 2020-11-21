import React from "react";
import "./Item.css";

const Item = ({ id, item, list, setList, url }) => {
  const remove = (id) => {
    setList(list.filter((el) => el.id !== id));
  };

  return (
    <div className="item">
      <a href={`http://${url}`}>{item}</a>

      <img
        onClick={() => remove(id)}
        src="https://img.icons8.com/color/48/000000/trash.png"
        alt="Delete"
      />
    </div>
  );
};
export default Item;
