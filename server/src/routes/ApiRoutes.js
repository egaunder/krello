const API_ENDPOINT = '/api';

export default (app) => {
  app.get(API_ENDPOINT, (req, res) => {
    res.send('Hi how are you');
  });
};
