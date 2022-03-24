import React from "react";
import { useEffect, useState, createElement } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";

const p = (a) => {
  console.log(a);
};
const Edit = (props) => {
  return (
    <>
      <h1>test</h1>
      <Link to="/">Home</Link>
      <div className="box2">
        <h1>{one.title}</h1>
        <p>Price: {one.price}</p>
        <p>Description: {one.description}</p>
      </div>
    </>
  );
};

export default Edit;
