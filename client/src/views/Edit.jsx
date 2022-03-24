import React from "react";
import { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";

const p = (a) => {
  console.log(a);
};
const Edit = (props) => {
  const { _id } = useParams();
  const [one, setOne] = useState({
    title: "default",
    price: "default",
    description: "default",
  });

  useEffect(() => {
    p("useEffect Running");

    axios
      .get(`http://localhost:9000/api/pm/${_id}`)
      .then((res) => {
        console.log(res.data);
        setOne(res.data);
      })
      .catch((err) => console.log(err));
  }, [_id]);

  const onDeleteHandler = (_id) => {
    if (window.confirm(`Are you sure you want to delete this item?`)) {
      console.log("inside on click delete");
      axios
        .delete(`http://localhost:9000/api/pm/delete/${_id}`)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="box">
        <Link to={"/"}>
          <button className="btn btn-secondary btn-sm">Back</button>
        </Link>
        <Link to={`/`}>
          <button
            onClick={() => {
              onDeleteHandler(one._id);
            }}
            className="btn btn-danger btn-sm"
          >
            delete
          </button>
        </Link>
      </div>
      <div className="box">
          <form >
{/* 
            <label htmlFor=""></label>
            <input type="text"/> */}

          </form>
      </div>
    </>
  );
};

export default Edit;
