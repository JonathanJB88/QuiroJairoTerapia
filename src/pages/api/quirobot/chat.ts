import { NextApiRequest, NextApiResponse } from 'next';
import { ChatCompletionRequestMessage, CreateChatCompletionResponse, Configuration, OpenAIApi } from 'openai';
import { errorResponse } from '@/helpers';

interface ChatResponseData {
  ok: boolean;
  message: CreateChatCompletionResponse['choices'][0]['message'];
}

const organization = process.env.NEXT_PUBLIC_OPENAI_ORGANIZATION_ID;
const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const configuration = new Configuration({ organization, apiKey });
const openai = new OpenAIApi(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse<ChatResponseData>) => {
  const { messages } = req.body as { messages: ChatCompletionRequestMessage[] };
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    if (!completion.data.choices) {
      return errorResponse(res, 400, 'Ups! Algo salió mal. Intenta de nuevo.');
    }
    res.status(200).json({ ok: true, message: completion.data.choices[0].message });
  } catch (error) {
    console.log(error);
    errorResponse(res, 500, 'Ups! Algo salió mal. Por favor, contacta al administrador.');
  }
};

export default handler;
