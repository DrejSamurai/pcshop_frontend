import axios from './axios';

export const searchYouTube = async (title: string) => {
  const response = await axios.get(`/api/youtube?q=${encodeURIComponent(title)}`);
  return response.data;
};

