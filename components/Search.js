"use client";
import React from "react";
import cities from "/modules/city.list.json";
import Link from "next/link";

export default function Search() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    let match = [];
    if (value.length > 3) {
      for (let city of cities) {
        if (match.length >= 5) {
          break;
        }
        const result = city.name.toLowerCase().startsWith(value.toLowerCase());
        if (result) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };
          match.push(cityData);
        }
      }
    }
    console.log(match);
    return setResults(match);
  };
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Enter City"
        value={query}
        onChange={onChange}
      />
      {query.length > 3 && (
        <ul>
          {setResults.length > 0 ? (
            results.map((city) => (
              <li className="results" key={city.slug}>
                <Link href={`/location/${city.slug}`}>
                  {city.name}
                  {city.state ? `, ${city.state}` : ""}
                  <span>({city.country})</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="search__no-results">No results</li>
          )}
        </ul>
      )}
    </div>
  );
}
