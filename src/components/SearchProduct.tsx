"use client";
import { useState, useEffect } from "react";

interface SearchResult {
  id: string;
  title: string;
}

export default function ClientSideSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      // fetching logic goes here

      setIsLoading(true);

      setResults(results);
      setIsLoading(false);
    };
  }, [query]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "8px", width: "300px" }}
      />
      {isLoading && <p>Loading search results...</p>}
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
