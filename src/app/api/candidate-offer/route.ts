import { NextResponse } from "next/server"

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''



export async function GET(request: Request) {
  const res = await fetch(`https://api.infojobs.net/api/1/candidate/skillcategory?includeSkills=true`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`,
  },
  next: { revalidate: 60 }
  })

  const data = await res.json()
  return NextResponse.json(data);

}