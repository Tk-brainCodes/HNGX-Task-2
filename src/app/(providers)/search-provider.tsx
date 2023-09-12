"use client"

import React, {
  useState,
  useEffect,
  createContext,
  ReactNode,
} from "react";
import axios from "axios";

interface SearchContextType {
  query: string;
  results: any[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const myKey = process.env.API_KEY;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setQuery(e.target.value);

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${myKey}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
      )
      .then((res) => res.data)
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });
  };

  useEffect(() => {
    typeof window !== "undefined"
      ? localStorage.setItem("results", JSON.stringify(results))
      : "";
    typeof window !== "undefined"
      ? localStorage.setItem("query", JSON.stringify(query))
      : "";
  }, [query, results]);

  return (
    <SearchContext.Provider value={{ query, results, onChange }}>
      {children}
    </SearchContext.Provider>
  );
};
