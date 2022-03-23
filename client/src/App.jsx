import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import React, { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [form, setForm] = useState({title: "default", price: "default", description: "default"})
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [dbtest, setDbtest] = useState({ assignment: "none", port: 0 });

  useEffect(() => {
    p("useEffect Running");

    // pulling hello data
    axios
      .get("http://localhost:9000/api")
      .then((res) => {
        // console.log(res);
        setDbtest(res.data);
      })
      .catch((err) => console.log(err));

    // pulling elements
    axios
      .get("http://localhost:9000/api/pm/")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const p = (a) => {
    console.log(a);
  };

  const onClickHandler = (event) => {
    event.preventDefault();

    p(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    p(event.target.value);
  };

  return (
    <div className="App">
      <h1>Assignment Product Manager</h1>

      <form onSubmit={onSubmitHandler}>
        <div className="box">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
        </div>
        <div className="box">
          <label htmlFor="title">Price</label>
          <input type="text" name="title" />
        </div>
        <div className="box">
          <label htmlFor="title">Description</label>
          <input type="text" name="title" />
        </div>
        <button className="btn btn-primary mx-4" onClick={onClickHandler}>
          Create PM
        </button>
      </form>
      <div className="box">
        <p>Assignment: {dbtest.assignment}</p>
        <p>Port: {dbtest.port}</p>
      </div>
    </div>
  );
}

export default App;
