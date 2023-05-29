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
    content: `Quiero que cuando te pase una descripción de una oferta de trabajo en algún ambito, le des una nota del 1 al 10 aunque tienes que ser muy estricto en cuanto con la nota que asignas, es decir, si no viene la información necesaría como los requisitios, una descripción y el salario consideramos que no es una buena oferta.

    El formato de respuesta JSON será el siguiente:
    
    {
      "score": {score},
      "message": {message}
    }
    
    Tienes que cambiar lo que hay entre llaves por el valor. El máximo de caracteres permitido para "message" es de 500. Se conciso y directo. Apunta los errores clave, especialmente los de ortografía (si existiesen) o recomendaciones claras. Por ejemplo:
    
    {
      "score": 6,
      "message": "Hay faltas de ortografía: 'inscribete', 'solido' y falta usar signos de interrogación. Se repite mucho la palabra HTML. Y faltaría clarificar los proyectos que se harían"
    }`
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

  try {
    return NextResponse.json(JSON.parse(completion.data.choices[0].message?.content as string));
  } catch {
    return NextResponse.json({
      score: 0,
      message: completion.data.choices[0].message?.content
    });
  }
}