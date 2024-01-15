import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import React, { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";


const App = () => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3001")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((error) => console.error("Veri çekme hatası:", error));
  // }, []);

  return (
    <>
      <nav
        style={{ display: "flex", fontSize: "25px", fontFamily: "helvetica" }}
      >
        <div style={{ flex: "1", marginLeft: "20px" }}>
          <NavLink to="/">Anasayfa </NavLink>
        </div>
        <div style={{ marginRight: "30px" }}>
          <NavLink to="/login">Giriş </NavLink>
          <NavLink to="/register">Üye ol</NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <hr />
      <div>

        {/* <h2>Veriler</h2> */}
        {/* <ul> */}
          {/* {data.map(item => ( */}
            {/* <li key={item}> */}
              {/* <div> */}
                {/* <strong>user_name:</strong> {item.user_name} */}
              {/* </div> */}
              {/* <div> */}
                {/* <strong>user_surname:</strong> {item.user_surname} */}
              {/* </div> */}
              {/* diğer özellikler buraya eklenecek */}
            {/* </li> */}
          {/* ))} */}
        {/* </ul> */}
        
      </div>
    </>
  );
};

export default App;
