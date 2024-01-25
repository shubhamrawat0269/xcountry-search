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
              <div key={country.cca3} className="countryCard">
                <img src={country.flags["svg"]} alt={country.flags["alt"]} />
                <h2>{country.name.common}</h2>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
