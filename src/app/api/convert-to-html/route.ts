import {  NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import {
  Configuration,
  ChatCompletionRequestMessageRoleEnum,
  OpenAIApi
} from 'openai'

const openaiToken = process.env.OPEN_AI_TOKEN ?? ''

const configuration = new Configuration({ apiKey: openaiToken })
const openai = new OpenAIApi(configuration)

const INITIAL_MESSAGES = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: `Quiero que cuando te pase un texto me lo devuelvas convertido en html sin estilar y semánticamente correcto, también quiero que pongas como h3 los titulos de las secciones`
  }
]

export async function POST(request: Request) {
  const { value } = await request.json();

    const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-0301',
    temperature: 0,
    messages: [
      ...INITIAL_MESSAGES,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: value
      }
    ]
  })

  const data = completion.data.choices[0].message?.content ?? ''


  try {
    return NextResponse.json(`${data}`);
  } catch {
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }

}