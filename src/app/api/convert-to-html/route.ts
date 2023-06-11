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
    content: `Quiero que a partir del texto que te proporciono lo interpretes, lo reordenes generando en htm una estructura de oferta laboral, si añades estilo, que sea sobrio y con colores neutros. No añadas estilo de sombras. El estilo no debe aplicar a tags de html directamente, para ello implementa clases. Estila las listas. No añadas botón ni link de aplicar a la oferta.`
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