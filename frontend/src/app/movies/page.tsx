"use client"

import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image"
import { useState } from "react";

function Page() {
  const movies_url = "http://localhost:8080/movies"
  const [movies, setMovies] = useState([])

  useEffect(
    () => {
      // recieves a json object containing a list of {movies_title, movie_thumbnail}
      fetch(movies_url)
      .then((res) => res.json())
      .then((data) => setMovies(data.movies))
    }
    , 
    []
  )


  return (
    <>
      {/* top navbar */}

      {/* movies page header */}
      <h1>Movies</h1>

      {/* movies card */}
      {movies.map((movie_info, index) => {
        const { movie_title, movie_thumbnail } = movie_info
        return (
        <div key={index}>
          <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">{movie_title}</p>
            <small className="text-default-500"></small>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image 
              width={640}
              height={340}
              alt="Card background"
              className="object-cover rounded-xl"
              src={ "http://localhost:8080/"+movie_thumbnail }
            />
          </CardBody>
        </Card>
      </div>
      )
      })}
    </>
  )
}

export default Page;
