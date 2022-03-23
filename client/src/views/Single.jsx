import React from "react";
import { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route, Link } from 'react-router-dom';

const Single = (props) => {
  const { _id } = useParams();
  const [one, setOne] = useState({
    title: "default",
    price: "default",
    description: "default",
  });

  useEffect(() => {}, [_id]);

  return (
    <>
    {/* <Link href="http://localhost:3000/">Home</Link> */}
    <Link to="/">Home</Link>
        <div className="box2">
        <h1>{one.title}</h1>
        <p>Price: {one.price}</p>
        <p>Description: {one.description}</p>
      </div>
    </>
  );
};

export default Single;

// module.exports.findOneSinglePM = (req, res) => {
//     PM.findOne({ _id: req.params._id })
//       .then((oneSinglePM) => res.json(oneSinglePM))
//       .catch((err) =>
//         res.status(400).json({ message: "Something went wrong", error: err })
//       );
//   };
