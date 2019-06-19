const app = require('./app');
const config = require('./configs/configs');

app.listen(config.port, console.log(`Server has started in ${config.port} port ...`));