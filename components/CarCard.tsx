"use client"

import { useState } from "react"
import Image from "next/image"

import { CarProps } from "@/types"
import { CarDetails, CustomButton } from "."
import { calculateCarRent, generateCarImageUrl } from "@/utils"

interface CarCardProps {
  car: CarProps
}

const CarCard = ({ car } : CarCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { city_mpg, year, make, model, transmission, drive } = car

  const carRent = calculateCarRent(city_mpg, year)

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">
          {make} {model}
        </h2>
      </div>

      <p className="flex mt-6 text-3xl font-extrabold">
        <span className="self-start text-sm font-semibold">$</span>
        {carRent}
        <span className="self-end text-sm font-medium">/day</span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image 
          src={generateCarImageUrl(car)}
          alt="car model"
          fill 
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-between text-gray-700">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image 
              src="/steering-wheel.svg"
              alt="steering wheel"
              width={20}
              height={20}
            />
            <p className="text-sm">{transmission === "a" ? "Automatic" : "Manual"}</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image 
              src="/tire.svg"
              alt="tire"
              width={20}
              height={20}
            />
            <p className="text-sm">{drive.toUpperCase()}</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-2">
            <Image 
              src="/gas.svg"
              alt="gas"
              width={20}
              height={20}
            />
            <p className="text-sm">{city_mpg} MPG</p>
          </div>
        </div>

        {/* button */}
        <div className="car-card__btn-container">
          <CustomButton 
            title="View More"
            containerStyles="w-full py-6 rounded-full bg-primary-blue"
            textStyles="text-white text-sm leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      
      <CarDetails 
        car={car}
        isOpen={isOpen} 
        closeModal={() => setIsOpen(false)} 
      />
    </div>
  )
}

export default CarCard
