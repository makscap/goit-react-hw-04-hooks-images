import axios from 'axios';

const key = '19127030-a84951d9aeba130a04f5b1356';
const image_type = 'photo';
const orientation = 'horizontal';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key,
  image_type,
  orientation,
  per_page: 12,
};

async function fetchImages(requestKey, page) {
  try {
    const { data } = await axios({
      params: {
        q: requestKey,
        page,
      },
    });
    return data.hits;
  } catch (error) {
    new Error('No response from server');
  }
}

const api = { fetchImages };

export default api;