import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState();
 const [bgColor, setBgColor] = useState('white');

 const fetchRandomUser = async () => {
  try {
    const response = await axios.get('https://dummyjson.com/users');
    const randomUser = response.data.users[Math.floor(Math.random() * response.data.users.length)];
    setUserData(randomUser);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

 const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setBgColor(color);
 };

 useEffect(() => {
    fetchRandomUser();
    generateRandomColor();
 }, []);

 const handleNewUser = () => {
    fetchRandomUser();
    generateRandomColor();
}
  
  return (
    <div
      style={{ height: "100vh" }}
      className="w-100 d-flex justify-content-center align-items-center flex-column flex-wrap">
        <h1>Random User Generator</h1>
      {userData?(<div
        style={{ height:"400px", width: "700px",backgroundColor:bgColor }}
        className="shadow border rounded pt-3 text-light">
        <div className="row">
          <div className="col"></div>
          <div className="col-3">
            <img
              className="border rounded-pill img-fluid"
              src={userData.image}
              alt=""
            />
          </div>
          <div className="col-7 border-bottom border-dark border-3">
            <h2 className="d-flex">
              <span>{userData.gender=="male"?<p>Mr</p>:<p>Ms</p>}</span>.{userData.firstName} {userData.lastName}
            </h2>
            <span>{userData.birthDate} ({userData.age})</span>
            <h6>{userData.phone}</h6>
            <h6>{userData.email}</h6>
          </div>
          <div className="col"></div>
        </div>
        <div className="mt-5 ms-3">
          <h5>Address : {userData.address.address}</h5>
          <h5>City : {userData.address.city}</h5>
          <h5>Postal Code : {userData.address.postalCode}</h5>
          <h5>Company : {userData.company.address.address}</h5>
          <h5>Company role : {userData.company.title}</h5>
        </div>
      </div>):(<p>Loading...</p>)}
        <div className="d-flex justify-content-center align-items-center mt-3">
          <button onClick={handleNewUser} className="btn btn-primary ">Generate New User</button>
        </div>
    </div>
  );
}

export default App;
