"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import { githubRepo } from "./lib/githubRepo";

export default function Home() {
  type Language = {
  title: string;
  value: string;
};

  const [lang, setLang] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const [data, setData] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const [proLang, setProLang] = useState<Language[]>([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json")
      .then((res) => res.json())
      .then((data) => {
        setProLang(data);
      })
      .catch((err) => console.error(err));
  }, []);


  const handleSearch = async (selectedLang:string) => {
  if (!selectedLang.trim()) {
    setData(null);
    setError("Please select a language");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const result = await githubRepo(selectedLang);
    console.log(result)
    setData(result);
    setIndex(0);
  } catch {
    setError("Repo not found for this language");
  } finally {
    setLoading(false);
  }
};

  const handleRefresh = ()=>{
    setIndex((prev) => (prev === 29 ? 0 : prev + 1));
  }
  return (
    <div>
      <h1 className="title">GitHub Repository Finder</h1>
      <select
        className="input-box"
        value={lang}
        onChange={(e) => {
          const selectedLang = e.target.value;
          setLang(selectedLang);
          handleSearch(selectedLang);
        }}
      >
        <option value="">Select Language</option>
        {proLang.map((language, index) => (
          <option key={index} value={language.value}>
            {language.title}
          </option>
        ))}
      </select>
      {loading && <p className="loading">loading...</p>}
      {err && <p className="error">{err}</p>}

      {data?.items?.length > 0 && (
        <div className="result">
          <p>{data.items[index]?.name}</p>
          <p>{data.items[index]?.description}</p>
          <div className="result-small">
            <p>{data.items[index]?.language}</p>
            <p>{data.items[index]?.stargazers_count}</p>
            <p>{data.items[index]?.forks}</p>
            <p>{data.items[index]?.open_issues}</p>
          </div>
          <button className="refresh-btn" onClick={handleRefresh}>{err?"Click to retry": "Refresh"}</button>
        </div>
      )}
    </div>
  );
}
