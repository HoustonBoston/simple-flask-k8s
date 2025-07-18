"use client"

import React, { Suspense, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import Image from "next/image"
import { useState } from "react";
import Link from "next/link";
import Loading from "./loading";

function Page() {
  const movies_url = "http://localhost:8080/movies"
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMovieData = async () => {
    let resposnse = await fetch(movies_url)
    if (resposnse.status == 502) {
        console.log('server issue')
        await fetchMovieData()
    } 
    else if (resposnse.status != 200) {
      console.log('response.statusText: ', resposnse.statusText)
      await new Promise(resolve => setTimeout(resolve, 100))
      await fetchMovieData()
    }  
    else {
      console.log('movie data returned')
      resposnse.json().then((data) => setMovies(data.movies)).then(() => setLoading(false))
    }
  }

  

  useEffect(
    () => {
      fetchMovieData()
    }
    ,
    []
  )


  return (
    <div>
      {/* movies page header */}
      <h1 className="text-2xl pl-3 pb-4 z-0">Movies</h1>

      {/* movies card */}
      {loading ? (
        <Loading />
      )
        :

        (
          <div className="flex-wrap flex gap-1 pl-4">

            {movies.map((movie_info, index) => {
              const { movie_title, movie_thumbnail } = movie_info
              return (
                <Link href={`/movies/${movie_title}`} key={index} className="pb-3">
                  <Card className="max-h[270px] py-1 px-3 shadow rounded-xl border border-gray-200 flex flex-col bg-gray-100">
                    <CardHeader className="pt-2 items-start">
                      <p className="text-tiny uppercase font-bold text-red-500 z-0">{movie_title}</p>
                    </CardHeader>
                    <CardBody className="py-2 overflow-visible">
                          <Image
                            placeholder="empty"
                            priority
                            width={270}
                            height={480}
                            alt="Card background"
                            className="object-cover max-h-[270px]"
                            src={"http://localhost:8080" + movie_thumbnail}
                          />
                    </CardBody>
                  </Card>
                </Link>
              )
            })}

          </div>
        )
      }
    </div>
  )
}

export default Page;
