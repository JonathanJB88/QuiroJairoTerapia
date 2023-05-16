import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateChatCompletionResponse } from 'openai';
import axios from 'axios';
import apiClient from '@/helpers/apiConfig';
import {
  AppDispatch,
  ChatMessage,
  Role,
  RootState,
  onSendMessage,
  onSendMessageSuccess,
  onSendMessageFailure,
  onResetChat,
} from '@/store';

interface ChatMessageResponse {
  ok: boolean;
  message?: CreateChatCompletionResponse['choices'][0]['message'];
  errorMessage?: string;
}

const postChatHistory = async (chatHistory: ChatMessage[]): Promise<ChatMessageResponse> => {
  try {
    const {
      data: { ok, message },
    } = await apiClient.post<ChatMessageResponse>('/api/quirobot/chat', { messages: chatHistory });
    return { ok, message };
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data.msg
        ? error.response.data.msg
        : 'Ups! Algo salió mal. Por favor, intenta de nuevo.';
    return { ok: false, errorMessage };
  }
};

export const useChatbotStore = () => {
  const { chatMessages, loading, errorMessage } = useSelector((state: RootState) => state.chatbot);
  const dispatch = useDispatch<AppDispatch>();

  const sendMessage = useCallback(
    async (message: string) => {
      dispatch(onSendMessage(message));
      const chatHistory: ChatMessage[] = [...chatMessages, { role: Role.USER, content: message }];
      const { ok, message: messageResponse, errorMessage } = await postChatHistory(chatHistory);
      if (!ok || !messageResponse || messageResponse.role !== Role.ASSISTANT || errorMessage)
        return dispatch(onSendMessageFailure(errorMessage));
      dispatch(onSendMessageSuccess({ role: Role.ASSISTANT, content: messageResponse.content }));
    },
    [chatMessages, dispatch]
  );

  const clearChat = useCallback(() => {
    dispatch(onResetChat());
  }, [dispatch]);

  return {
    //Props
    chatMessages,
    loading,
    errorMessage,
    //Functions
    sendMessage,
    clearChat,
  };
};
