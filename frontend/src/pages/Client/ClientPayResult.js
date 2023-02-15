import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";

const ClientPayResult = () => {
  const [pgToken, setPgToken] = useState("");
  const navigate = useNavigate();
  const clickIdArray = JSON.parse(localStorage.getItem("reservationId"));
  const {id, name} = useSelector((state) => state.auth)
  console.log(id, name)

  const navigateToClientMySchedule = () => {
    navigate('/user/myschedule')
  }
  
  useEffect(() => {
      setPgToken(new URLSearchParams(window.location.search).get("pg_token"));
    }, []);
    
    useEffect(() => {
        if (pgToken) {
            axios
            .post("/api/business/pay/order/completed", {
                pgToken,
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                console.log(clickIdArray);
                sendData();
                navigateToClientMySchedule();
            });
        }
    }, [pgToken]);
    
    const sendData = () => {
      const data = {
        userId : id,
        userName: name,
        idList: clickIdArray,
      };
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      axios.post("/api/business/reservation/reserve", data, {headers: {"authorization": accessToken, "refresh-token": refreshToken}}).then((res) => {
        console.log(res);
      });
    };

  

  return null;
};

export default ClientPayResult;
