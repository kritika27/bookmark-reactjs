import React, { useState } from "react";
import "./App.css";
import Item from "./components/Item";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

const arr = () => {
  let data = localStorage.getItem("url");
  if (data) return JSON.parse(localStorage.getItem("url"));
  else return [];
};

function App() {
  const [item, setItem] = useState("");
  const [url, setUrl] = useState("");
  const [list, setList] = useState(arr);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    const newItem = {
      id: uuidv4(),
      item: item,
      url: url,
    };
    e.preventDefault();
    if (item && url) {
      setError("");
      if (validator.isURL(url)) {
        setList([...list, newItem]);
        setItem("");
        setUrl("");
      } else setError("Enter the correct url format.");
    } else {
      setError("Enter both the Required fields.");
    }
  };

  React.useEffect(() => {
    localStorage.setItem("url", JSON.stringify(list));
  }, [list]);

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  return (
    <div className="App">
      <h1>BOOKMARKS</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>Website Name</label>
        <input type="text" value={item} onChange={handleChange} />
        <br></br>
        <label>Website Url</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <p style={{ color: "red" }}>{error}</p>
        <button className="btn" type="submit">
          Add Bookmark
        </button>
        <br></br>
        <br></br>
      </form>
      <div>
        {list.map((c, id) => (
          <Item
            key={id}
            id={c.id}
            item={c.item}
            url={c.url}
            list={list}
            setList={setList}
            setItem={setItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
