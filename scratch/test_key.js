const axios = require('axios');
axios.get('https://api.themoviedb.org/3/movie/popular?api_key=844dba0bfd8f3a4f3799f6130ef9e335')
  .then(res => console.log('Success:', res.data.results[0].title))
  .catch(err => console.log('Error:', err.response ? err.response.status : err.message));
