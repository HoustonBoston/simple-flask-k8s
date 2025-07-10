"use client"

import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image"
import { useState } from "react";
import Link from "next/link";

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
    <div>
      {/* movies page header */}
      <h1 className="text-2xl pt-15 pl-3 pb-2">Movies</h1>

      {/* movies card */}
      <div className="flex-row flex gap-2 pl-2">
        {movies.map((movie_info, index) => {
          const { movie_title, movie_thumbnail } = movie_info
          return (
            <Link href={`/movies/${movie_title}`} key={index}>
              <Card className="py-4 px-2 shadow-xl rounded-xl flex flex-col border border-default-200 dark:border-default-100 ">
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
      </div>
    </div>
  )
}

export default Page;
