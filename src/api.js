const apiURL = process.env.NODE_ENV === 'production' ? 'https://api.bookbuddyapp.com' : 'http://localhost:8080';

export default apiURL;