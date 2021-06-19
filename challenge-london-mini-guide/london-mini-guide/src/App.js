import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [cityName, setCityName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [showCityNotSelectedError, setShowCityNotSelectedError] =
    useState(false);

  const handleCityNameChange = (event) => {
    setCityName(event.target.value);
  };

  const handleCategoryClick = (category) => {
    if (cityName !== "") {
      setShowCityNotSelectedError(false);
      setCategoryName(category);
    } else {
      setShowCityNotSelectedError(true);
    }
  };

  useEffect(() => {
    if (cityName.length > 0 && categoryName.length > 0) {
      const url = `https://oksygenn-london-mini-guide.herokuapp.com/${cityName}/${categoryName}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCurrentData(data);
        });
    }
  }, [cityName, categoryName]);

  return (
    <div className="App container">
      <h1>City mini guide</h1>
      <label htmlFor="cities">Choose a city:</label>
      <select
        onChange={handleCityNameChange}
        name="cities"
        id="cities"
        className="form-select form-select-lg mb-3"
      >
        <option value="" selected disabled hidden>
          Choose here
        </option>
        <option value="harrow">Harrow</option>
        <option value="heathrow">Heathrow</option>
        <option value="stratford">Stratford</option>
      </select>
      {showCityNotSelectedError && (
        <div className="error-message">
          <h4>Please choose a city first</h4>
        </div>
      )}

      <div className="d-flex justify-content-between my-4">
        <button
          type="button"
          className={
            categoryName === "pharmacies"
              ? "btn btn-primary"
              : "btn btn-outline-secondary"
          }
          onClick={() => handleCategoryClick("pharmacies")}
        >
          Pharmacies
        </button>
        <button
          className={
            categoryName === "colleges"
              ? "btn btn-primary"
              : "btn btn-outline-secondary"
          }
          onClick={() => handleCategoryClick("colleges")}
        >
          Schools and colleges
        </button>
        <button
          className={
            categoryName === "hospitals"
              ? "btn btn-primary"
              : "btn btn-outline-secondary"
          }
          onClick={() => handleCategoryClick("hospitals")}
        >
          Hospitals
        </button>
        <button
          className={
            categoryName === "doctors"
              ? "btn btn-primary"
              : "btn btn-outline-secondary"
          }
          onClick={() => handleCategoryClick("doctors")}
        >
          Doctors
        </button>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Website</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((entry, index) => {
            return (
              <tr key={entry.address + index}>
                <th>{index + 1}</th>
                <td>{entry.name}</td>
                <td>{entry.phone}</td>
                <td>{entry.address}</td>
                <td>
                  {entry.website != null ? (
                    <a href={entry.website}>{entry.name}</a>
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
