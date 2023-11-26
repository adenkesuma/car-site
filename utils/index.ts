export async function fetchCars() {
  const headers = {
    "X-RapidAPI-Key": "dddf9c071dmsha618f79f42ab372p10d75djsnc3422935cfe0",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com"
  }

  const response = await fetch(
    "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla", 
    { headers: headers }
  )

  const result = await response.json()

  return result
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50 // base rental price per day in dollars

  const mileageFactor = 0.1 // additional rate per mile driven

  const ageFactor = 0.05 // additional rate per year of vehicle age

  // calculate additional rate base on milage and age
  const mileageRate = city_mpg * mileageFactor
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

  return rentalRatePerDay.toFixed(0)
}
