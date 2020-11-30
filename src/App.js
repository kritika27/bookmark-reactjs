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

      <div className="content">
        <form id="bookmark-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" for="website-name">
              Website Name
            </label>
            <input
              className="form-input"
              type="text"
              id="website-name"
              value={item}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label" for="website-url">
              Website URL
            </label>
            <input
              className="form-input"
              type="text"
              id="website-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <p style={{ color: "red" }}>{error}</p>
          <button type="submit">Add Bookmark</button>
        </form>
      </div>
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
