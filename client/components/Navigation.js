import React from 'react';
import { Link } from "react-router";

import navigation from './Navigation.css'

export default (props, context) => {
  return (
    <div className={navigation["navigation"]}>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/">Posts</Link>
    </div>
  );
}

