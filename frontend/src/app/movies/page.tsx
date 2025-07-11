"use client"

import React, { Suspense, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image"
import { useState } from "react";
import Link from "next/link";

function Page() {
  const movies_url = "http://localhost:8080/movies"
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(
    () => {
      // recieves a json object containing a list of {movies_title, movie_thumbnail}
      fetch(movies_url)
      .then((res) => res.json())
      .then((data) => setMovies(data.movies))
      .then(() => setLoading(false))
    }
    , 
    []
  )


  return (
    <div>
      {/* movies page header */}
      <h1 className="text-2xl pl-3 pb-4">Movies</h1>

      {/* movies card */}
      {loading?(
        <Suspense fallback={<p>Loading movies...</p>}>
        <h1>Loading movies...</h1>
      </Suspense>
      )
          :      
        (<div className="flex-wrap flex justify-center">
          {movies.map((movie_info, index) => {
            const { movie_title, movie_thumbnail } = movie_info
            return (
              <Link href={`/movies/${movie_title}`} key={index} className="py-1 px-1">
                <Card className="py-2 px-3 shadow-blue-600 rounded-xl flex flex-col border border-gray-200">
                  <CardHeader className="pb-0 pt-2 px-4 flex-row items-start">
                    <p className="text-tiny uppercase font-bold">{movie_title}</p>
                    <small className="text-default-500"></small>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image 
                      width={1080/4}
                      height={1920/4}
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src={ "http://localhost:8080"+movie_thumbnail }
                    />
                  </CardBody>
                </Card>
              </Link>
          )
          })}
        </div>)
    }
    </div>
  )
}

export default Page;
