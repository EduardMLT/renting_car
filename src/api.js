import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '38232376-4840eb4d2a32943b9bc00372c';

export const fetchImages = async (searchQuery, page, per_page) => {
  try {
    const response = await axios.get(
      `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
