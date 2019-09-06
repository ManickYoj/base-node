const app = require('./app.js');
const port = process.env.PORT || 3000

// EXECUTION ----- //
app.listen(port, () => console.log(`Example app listening on port ${port}!`))