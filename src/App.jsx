import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  const getCountryData = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const resInJSON = await response.json();
      setData(resInJSON);
    } catch (error) {
      console.log(`Error fetching data: `, error);
    }
  };

  useEffect(() => {
    getCountryData();
  }, []);

  return (
    <>
      <div className="input-box">
        <input
          type="text"
          className="search-box"
          placeholder="Search for Countries"
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="main__div">
        {data
          .filter((ctry) =>
            !text.length
              ? ctry
              : ctry.name.common.toLowerCase().includes(text.toLowerCase())
          )
          .map((country) => {
            return (
              <div key={country.flag} className="country__card">
                <img src={country.flags["png"]} alt={country.name.common} />
                <h3>{country.name.common}</h3>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
