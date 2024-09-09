interface GetWeekDaysProps{
  short?: boolean
  array?: number[]
}

export function getWeekDays({ short = false, array }: GetWeekDaysProps){
  const formatter = new Intl.DateTimeFormat('pt-br', {weekday: 'long'})
  if(array){
    return array.map((day) => formatter.format(new Date(Date.UTC(2021, 5, day)))).map((weekDay) => {
      if(short){
        return weekDay.substring(0, 3).toLocaleUpperCase()
      }
  
      return weekDay.substring(0, 1).toLocaleUpperCase().concat(weekDay.substring(1))
    })
  }

  return Array.from(Array(7).keys()).map((day) => formatter.format(new Date(Date.UTC(2021, 5, day)))).map((weekDay) => {
    if(short){
      return weekDay.substring(0, 3).toLocaleUpperCase()
    }

      return weekDay.substring(0, 1).toLocaleUpperCase().concat(weekDay.substring(1))
  })
}