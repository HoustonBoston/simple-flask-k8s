"use client"

import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "./loading";
import MovieCard from "@/components/MovieCard/MovieCard";

function Page() {
  const movies_url = "http://localhost:8080/movies"
  const tailscale_funnel_url = "https://roshan-dell.taile3e522.ts.net:8443/"
  const backup_url = "http://100.113.83.9:8080/"
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadedImagesCount, setLoadedImagesCount] = useState(0)
  const [totalImgCount, setTotalImgCount] = useState(0)
  const [fetchUrl, setFetchUrl] = useState(tailscale_funnel_url)

  const fetchMovieData = async () => {
  const urls = [
    tailscale_funnel_url, // primary
    backup_url         // fallback
  ];

  for (let i = 0; i < urls.length; i++) {
    try {
      const response = await fetch(urls[i] + "movies");

      if (response.status >= 502) {
        console.log(`Server issue at ${urls[i]}`);
        continue; // try next URL
      } else if (!response.ok) {
        console.log(`Error ${response.status} at ${urls[i]}: ${response.statusText}`);
        continue; // try next URL
      }

      // success
      console.log(`Movie data returned from ${urls[i]}`);
      const data = await response.json();
      setFetchUrl(urls[i]);
      setMovies(data.movies);
      setTotalImgCount(data.movie_count);
      return; // stop after success

    } catch (err) {
      console.log(`Network error at ${urls[i]}:`, err);
      // try next URL
    }
  }

  // If both URLs fail
  console.log("Failed to fetch from all URLs");
};

  
  // fetch movie data
  useEffect(
    () => {
      fetchMovieData()
    }
    ,
    []
  )

  // once all images are loaded
  useEffect(() => {
    if (totalImgCount === loadedImagesCount) {
      setLoading(false)
      console.log('all images loaded')
    }
  }, [loadedImagesCount, totalImgCount])


  return (
    <div className="mx-auto max-w-screen-xl">
      {/* movies page header */}
      <h1 className="text-2xl pb-4 z-0">Movies</h1>

      {/* movies card */}
      {loading ? (
        <Loading />
      )
        :

        (
          <div className="flex-wrap flex gap-1 grow mx-auto max-w-full">

            {movies.map((movie_info, index) => {
              const { movie_title, movie_thumbnail } = movie_info
              return (
                <MovieCard fetchUrl={fetchUrl} setLoadedImagesCount={setLoadedImagesCount} source="local" movie_thumbnail={movie_thumbnail} movie_title={movie_title} key={index} />
              )
            })}

          </div>
        )
      }
    </div>
  )
}

export default Page;
