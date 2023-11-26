"use client"

import { useEffect, useState } from "react"

import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from "@/components"
import { fetchCars } from "@/utils"
import { fuels, yearsOfProduction } from "@/constants"

export default function Home() {
  const [allCars, setAllCars] = useState([])
  const [loading, setLoading] = useState<boolean>(false)

  // search states
  const [manufacturer, setManufacturer] = useState<string>("")
  const [model, setModel] = useState<string>("")

  // filter states
  const [fuel, setFuel] = useState<string>("")
  const [year, setYear] = useState<number>(2022)

  // pagination states
  const [limit, setLimit] = useState<number>(10)

  const getCars = async () => {
    setLoading(true)

    try {
      const result = await fetchCars({
        manufacturer: manufacturer || "",
        year: year || 2022,
        fuel: fuel || "",
        limit: limit || 10,
        model: model || ""
      })

      setAllCars(result)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCars()
  }, [fuel, year, limit, manufacturer, model])

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar
            setManufacturer={setManufacturer}
            setModel={setModel}
          />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} setFilter={setFuel}/>
            <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
          </div>
        </div>

        {allCars.length > 0 ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, idx) => (
                <CarCard key={`car-${idx}`} car={car} />
              ))}
            </div>

            {loading && (
              <div className="mt-16 w-full flex-center">
                Loading...
              </div>
            )}

            <ShowMore 
              pageNumber={limit / 10}
              isNext={limit > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          </div>
        )}
      </div>
    </main>
  )
}
