import axios from "axios";
import React, { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route, Link } from "react-router-dom";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Home = (props) => {
  const [dbtest, setDbtest] = useState({ assignment: "none", port: 0 });
  const [form, setForm] = useState({
    title: "default",
    price: "default",
    description: "default",
  });
  const [fromDb, setFromDb] = useState([]);
  const history = useHistory();
  // history.push(`/${category}/${detail}`);

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
    updateFromDb();
  }, []);

  const p = (a) => {
    console.log(a);
  };

  const onClickHandler = (event) => {
    event.preventDefault();

    // p(event.target.value);
  };

  const updateFromDb = () => {
    axios
      .get("http://localhost:9000/api/pm/")
      .then((res) => {
        // console.log(res.data);
        setFromDb(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    p("onSubmitHandler");

    axios
      .post("http://localhost:9000/api/pm/create", form)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    // p(event.target.value);
    updateFromDb();
  };

  const onChangeHandler = (event) => {
    event.preventDefault();

    // p(event.target.value);
    const newState = {
      ...form,
      [event.target.name]: event.target.value,
    };
    setForm(newState);
  };

  return (
    <>
      <Link to="/33">Single</Link>
      <form onSubmit={onSubmitHandler} className="box2">
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
        <input type="submit" className="btn btn-primary mx-4" />

        {/* <button className="btn btn-primary mx-4" onClick={onClickHandler}>
          Create PM
        </button> */}
      </form>

      <div className="box2">
        <p>from Form:</p>
        <div className="box">
          <div className="box2">
            <p>Title: {form.title}</p>
          </div>
          <div className="box2">
            <p>Price: {form.price}</p>{" "}
          </div>{" "}
          <div className="box2">
            <p>Description: {form.description}</p>{" "}
          </div>
        </div>
      </div>
      <div className="box2">
        <p>from DB:</p>
        <div className="box">
          <p>Assignment: {dbtest.assignment}</p>
          <p>Port: {dbtest.port}</p>
        </div>
      </div>
      <div className="box2">
        <p>from DB:</p>
        {fromDb.map((item, i) => {
          // console.log(`function run ${i}, item: ${item.title}`);
          return (
            <div className="box" key={i}>
              <p name="title">{item.title}</p>
              <p name="price">{item.price}</p>
              <p name="description">{item.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
