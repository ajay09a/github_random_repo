"use client";
import { useState } from "react";
import "./globals.css";
import { githubRepo } from "./lib/githubRepo";

export default function Home() {
  const [lang, setLang] = useState("");

  const handleSearch = async()=>{
    const result = await githubRepo(lang);
    console.log(result);
  }
  return (
    <div>
      <h1 className="title">GitHub Repository Finder</h1>
      <input type="text" placeholder="Enter any programming language" value={lang} onChange={(e)=>setLang(e.target.value)} />
      <button onClick={handleSearch}>search</button>
    </div>
  );
}
