const infoJobsToken = 'MzVhYmEwN2JiYTk2NGMzZTljMDVhOTVmMzBlZmFhODk6REZoWUh4TEVqU1BTOEI0WWlhVmgrUnR4K044VDdlWTJFK3ZmeU5EaUV6dnFrN0h2SEE='

export const getSalaryRange = async () =>{
  const res = await fetch(`https://api.infojobs.net/api/1/dictionary/salary-quantity`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`,
  },
  })


  const data = await res.json()

  return data

}
