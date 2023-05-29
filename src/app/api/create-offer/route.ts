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
    content: `Quiero que cuando te pase un texto generes una oferta de trabajo elaborada, en la oferta debe aparecer todo lo que aparece en el texto, la oferta se debe componer descripción de la posición, responsabilidades, requisitos, perfil ideal del candidato, Ofrecemos y añadir un texto de despedida de oferta, todo esto debes modificar las responsabilidades, requisitos, perfil del candidato y lo que se ofrece para hacer una oferta más cercana y agradable`
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

  return NextResponse.json(completion.data.choices[0].message?.content ?? '');

}