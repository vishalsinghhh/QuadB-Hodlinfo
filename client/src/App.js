import { useEffect, useState } from "react";
import logo from "./images/logo.png";
import tele from "./images/tele.png";
import down from "./images/down.svg";

function App() {
  const [newData, setNewData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("/api/v1/tasks");
      const data = await response.json();
      // console.log(data);
      if (data) {
        setNewData(data.tasks);
      }
      // for(i)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  let count = 1;
  return (
    <>
      <div className="header">
        <div className="header-main">
          <img src={logo} alt="" width={"260px"} />
        </div>
        <div className="dropdown dropdown1">
          <button className="dropbtn">
            INR <img src={down} alt="" width={"10px"} />
          </button>
          <div className="dropdown-content">
            <a href="#">INR</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            BTC <img src={down} alt="" width={"10px"} />
          </button>
          <div className="dropdown-content">
            <a href="#">BTC</a>
            <a href="#">ETH</a>
            <a href="#">USDT</a>
            <a href="#">XRP</a>
            <a href="#">TRX</a>
            <a href="#">DASH</a>
            <a href="#">ZEC</a>
            <a href="#">XEM</a>
            <a href="#">IOST</a>
            <a href="#">WIN</a>
            <a href="#">BIT</a>
            <a href="#">WRX</a>
          </div>
        </div>
        <div className="number">
          <div className="number-circle">
            <p>58</p>
          </div>
        </div>
        <div className="join-btn">
        <a href="https://hodlinfo.com/connect/telegram" target={"_"}><button>
            <img src={tele} alt="" width={"20px"} /> Connect Telegram
          </button></a>
          
        </div>
      </div>
      <div className="power">Powered By <span className="fin">Finstreet</span> </div>
      <div className="finial-data">
        <li>
          <span className="space"></span> # <span className="space"></span> name{" "}
          <span className="space"></span> Last <span className="space"></span>{" "}
          Buy / Sell Price <span className="space"></span> volume{" "}
          <span className="space"></span> base_unit
        </li>
        {newData.map((item, index) => (
          <div className="list" key={item._id}>
         
          <div className="listName0"> {index+1} </div>
          <div className="listName">{item.name} </div>
          <div className="listName1">₹{item.last} </div>
          <div className="listName2">₹{item.buy} / ₹{item.sell} </div>
          <div className="listName3">{item.volume} </div>
          <div className="listName4">{item.base_unit} </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
