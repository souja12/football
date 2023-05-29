import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.use(express.static('build'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.get('/api/videos', async (req, res) => {
  try {
    const url = 'https://www.scorebat.com/video-api/v1/';
    const options = {
      headers: {
        'x-fs-token': 'ODg2ODZfMTY4NDc0MjEyNl84MTVhNzk1MDBjN2RkYjk4MDU1ODhiZjk5MzUyZWFjOTUwOTYxZjJm',
        'x-fs-embed-token': 'ODg2ODZfMTY4NDc0MjEyNl84ODRiMjQwZDlkNGI2OTJjY2YxZGU1OWI0NjM0YjQ5MzFlODA1NWZl',
      },
    };

    const response = await fetch(url, options);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
