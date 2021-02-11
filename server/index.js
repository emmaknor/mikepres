const app = require('./app');

const port = process.env.PORT || process.argv[2] || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
