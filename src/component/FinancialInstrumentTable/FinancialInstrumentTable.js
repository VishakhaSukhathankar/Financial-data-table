import React, { useState, useEffect, useMemo } from "react";
import "./styles.css"

const FinancialData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("assetClass");
  const [error, setError] = useState(null);

  
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/8fad8a73-d2d2-4cf7-866b-19be1590b29b"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedData = useMemo(() => {
    return data.slice().sort((a, b) => {
      if (sortBy === "assetClass") {
        const assetClassOrder = { Equities: 1, Macro: 2, Credit: 3 };
        return assetClassOrder[a.assetClass] - assetClassOrder[b.assetClass];
      } else if (sortBy === "price") {
        return b.price - a.price;
      } else if (sortBy === "ticker") {
        return a.ticker.localeCompare(b.ticker);
      }
      return 0;
    });
  }, [data, sortBy]);

  const handleSorting = (field) => {
    setSortBy(field);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
        ) : (
          <>
            <h1>Financial Table</h1>
            <table>
              <thead>
                <tr>
                  <th scope="col" onClick={() => handleSorting("ticker")}>
                    Ticker
                  </th>
                  <th scope="col" onClick={() => handleSorting("assetClass")}>
                    Asset Class
                  </th>
                  <th scope="col" onClick={() => handleSorting("price")}>
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item, ind) => (
                  <tr
                    key={ind}
                    className={`table-row asset-${item.assetClass.toLowerCase()}`}
                  >
                    <td>{item.ticker}</td>
                    <td data-testid={`asset-class-${ind}`}>{item.assetClass}</td>
                    <td className={item.price < 0 ? "negative-price" : "positive-price"}>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
      )}
    </div>
  );
};

export default FinancialData;
