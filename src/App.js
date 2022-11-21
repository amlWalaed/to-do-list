import "./App.css";
import { useRef, useState, useEffect } from "react";

function App() {
  const inputVal = useRef();
  const [items, setItems] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("list")) {
      setItems(JSON.parse(localStorage.getItem("list")));
    } else {
      localStorage.setItem("list", JSON.stringify([]));
    }
  }, []);
  let handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.current.value) {
      if (localStorage.getItem("list")) {
        let list = JSON.parse(localStorage.getItem("list"));
        let date = new Date().toLocaleDateString();
        let data = {
          id: Math.round(Math.random() * 100),
          item: inputVal.current.value,
          time: date,
        };
        list.push(data);
        localStorage.setItem("list", JSON.stringify(list));
        setItems([...items, data]);
      }
    } else {
      setError("you must enter a value");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  function removeItem(id) {
    let list = JSON.parse(localStorage.getItem("list")).filter(
      (ele) => ele.id !== id
    );
    localStorage.setItem("list", JSON.stringify(list));
    setItems(list);
  }
  function editItem(id) {
    let item = JSON.parse(localStorage.getItem("list")).find((ele)=> ele.id === id);
    inputVal.current.value=item.item
    removeItem(id)
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="add to list" ref={inputVal} />
        <input type="date" placeholder="set date of task "/>
        <button type="submit">add</button>
      </form>
      {error ? <div className="errors">{error}</div> : ""}
      <ul>
        {items.length > 0
          ? items.map((obj) => (
              <li key={Math.round(Math.random() * 100)}>
                <div className="item">{obj.item}</div>
                <div className="time">{obj.time}</div>
                <div className="controls">
                  <span
                    className="btn delete"
                    onClick={() => removeItem(obj.id)}
                  >
                    remove
                  </span>
                  <span className="btn edit" onClick={()=>editItem(obj.id)}>edit</span>
                </div>
              </li>
            ))
          : ""}
      </ul>
    </div>
  );
}

export default App;
