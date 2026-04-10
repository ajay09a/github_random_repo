"use client";
import { useState } from "react";
import "./globals.css";
import { githubRepo } from "./lib/githubRepo";

export default function Home() {
  const [lang, setLang] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");
  const [data, setData] = useState<any>(null);
  const [index, setIndex] = useState(0);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    handleSearch();
  };

  const handleSearch = async()=>{
    if(!lang.trim()){
      setData(null);
      setError("Please enter a language");
      return;
    }
    try{
      setLoading(true);
      setError("");
      const result = await githubRepo(lang);
      console.log(result);
      setData(result);
      setLang("");
    }
    catch{
      if(err){
        setError("Repo not found for this language");
      }
    }
    finally{
      setLoading(false);
    }
  }

  const handleRefresh = ()=>{
    if(index===29){
      setIndex(0);
    }
    setIndex((prev)=>prev +1);
  }
  return (
    <div>
      <h1 className="title">GitHub Repository Finder</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter any programming language" value={lang} onChange={(e)=>setLang(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {loading && <p>loading...</p>}
      {err && <p>{err}</p>}

      {data && (
        <div>
          <p>{data.items[index].name}</p>
          <p>{data.items[index].description}</p>
          <div>
            <p>{data.items[index].language}</p>
            <p>{data.items[index].stargazers_count}</p>
            <p>{data.items[index].forks}</p>
            <p>{data.items[index].open_issues}</p>
          </div>
          <button onClick={handleRefresh}>Refresh</button>
        </div>
      )}
    </div>
  );
}
