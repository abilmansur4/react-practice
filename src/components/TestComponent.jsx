import React, { useState, useEffect } from "react";
import axios from 'axios';

const TestComponent = () => {

  // const [data, setData] = useState();
  // console.log(localStorage.getItem("token"))
  // const config = {
  //   headers : {
  //     "authorization" : "accessToken " + localStorage.getItem("token")
  //   }
  // }

    // axios.get('http://localhost:5000/api/users', config)
    //   .then(function (response){
    //     console.log(response)
    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })

  return (
    <>
    <h2>TestComponent</h2>
    <div>
      {/* {data} */}
    </div>
    </>
  );
};

export default TestComponent;