import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";
import React, { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [dbtest, setDbtest] = useState({ assignment: "none", port: 0 });
  const [form, setForm] = useState({
    title: "default",
    price: "default",
    description: "default",
  });
  const [fromDb, setFromDb] = useState([
    { title: "a", price: 0, description: "b" },
  ]);

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
        // console.log(res.data);
        setFromDb(res.data);
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

  const onChangeHandler = (event) => {
    event.preventDefault();

    p(event.target.value);
    const newState = {
      ...form,
      [event.target.name]: event.target.value,
    };
    setForm(newState);
  };

  return (
    <div className="App">
      <h1>Assignment Product Manager</h1>

      <form onSubmit={onSubmitHandler}>
        <div className="box">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" onChange={onChangeHandler} />
        </div>
        <div className="box">
          <label htmlFor="price">Price</label>
          <input type="text" name="price" onChange={onChangeHandler} />
        </div>
        <div className="box">
          <label htmlFor="description">Description</label>
          <input type="text" name="description" onChange={onChangeHandler} />
        </div>
        <button className="btn btn-primary mx-4" onClick={onClickHandler}>
          Create PM
        </button>
      </form>
      <div className="box">
        <p>Assignment: {dbtest.assignment}</p>
        <p>Port: {dbtest.port}</p>
      </div>
      <div className="box">
        <p>Title: {form.title}</p>
        <p>Price: {form.price}</p>
        <p>Description: {form.description}</p>
      </div>
      <div className="box">
        {fromDb.map((item, i) => {
          console.log(`function run ${i}, item: ${item.title}`);
          return (
            <div>
              <p name={item.title} key={i}>
                {item.title}
              </p>
              <p name={item.price} key={i}>
                {item.price}
              </p>
              <p name={item.description} key={i}>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
