"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { SearchManufacturer } from "."

const SearchButton = ({ otherClasses } : { otherClasses: string }) => (
  <button className={`-ml-3 z-10 ${otherClasses}`}>
    <Image 
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={40}
      height={40}
      className="object-contain"
    />
  </button>
)

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState<string>("")
  const [model, setModel] = useState<string>("")
  const router = useRouter()

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (manufacturer === "" && model === "") return alert("Please fill in the search bar")

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
  }

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search)

    if (model) {
      searchParams.set("model", model)
    } else {
      searchParams.delete("model")
    }

    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer)
    } else {
      searchParams.delete("manufacturer")
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathname)
  }

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer 
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image 
          src="/model-icon.png"
          alt="model icon"
          height={25}
          width={25}
          className="absolute w-5 h-5 ml-4"
        />
        <input 
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>

      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  )
}

export default SearchBar
