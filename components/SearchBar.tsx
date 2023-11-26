"use client"

import { FormEvent, useState } from "react"
import Image from "next/image"

import { SearchManufacturer } from "."
import { SearchBarProps } from "@/types"

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

const SearchBar = ({ setManufacturer, setModel } : SearchBarProps) => {
  const [searchManufacturer, setSearchManufacturer] = useState<string>("")
  const [searchModel, setSearchModel] = useState<string>("")

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (searchManufacturer === "" && searchModel === "") return alert("Please fill in the search bar")

    setModel(searchModel)
    setManufacturer(searchManufacturer)
  }

  return (
    <form className='searchbar' onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer 
          selected={searchManufacturer}
          setSelected={setSearchManufacturer}
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
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
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
