import axios from "axios";
import React, { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Home = (props) => {
  const [dbtest, setDbtest] = useState({ assignment: "none", port: 0 });
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [fromDb, setFromDb] = useState([]);
  const history = useHistory();
  // history.push(`/${category}/${detail}`);

  useEffect(() => {
    p("useEffect Running");

    axios
      .get("http://localhost:9000/api")
      .then((res) => {
        // console.log(res);
        setDbtest(res.data);
      })
      .catch((err) => console.log(err));

    updateFromDb();
  }, []);

  const p = (a) => {
    console.log(a);
  };

  const updateFromDb = () => {
    axios
      .get("http://localhost:9000/api/pm/")
      .then((res) => {
        console.log(res.data);
        setFromDb(res.data);
      })
      .catch((err) => console.log(err));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // p("onSubmitHandler");

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

  const onDeleteHandler = (_id, arrIndex) => {
    if (
      window.confirm(`Are you sure you want to delete item ${arrIndex + 1}?`)
    ) {
      console.log("inside on click delete");
      axios
        .delete(`http://localhost:9000/api/pm/delete/${_id}`)
        .then((res) => {
          console.log(res.data);
          const copyState = [...fromDb];
          copyState.splice(arrIndex, 1);
          setFromDb(copyState);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
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
      </form>
      <div className="box2">
        <p>from Form:</p>
        <div className="box">
          <div className="box2">
            <p>{form.title}</p>
          </div>
          <div className="box2">
            <p>{form.price}</p>{" "}
          </div>
          <div className="box2">
            <p>{form.description}</p>{" "}
          </div>
        </div>
      </div>
      <div className="box">
        <table className="table table-sm table-hover ">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>#</th>
              <th>Title</th>
              <th>Price</th>
              {/* <th>Description</th> */}
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fromDb.map((item, i) => {
              // console.log(`function run ${i}, item: ${item.title}`);
              return (
                <tr key={i}>
                  {/* <td>{item._id}</td> */}
                  <td>{i + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  {/* <td>{item.description}</td> */}
                  <td>
                    <Link to={`/${item._id}`}>
                      <button className="btn btn-secondary btn-sm">View</button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/${item._id}/edit`}>
                      <button className="btn btn-success btn-sm">Edit</button>
                    </Link>
                  </td>
                  <td>
                    <Link to={`/`}>
                      <button
                        onClick={() => onDeleteHandler(item._id, i)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
