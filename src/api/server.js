const app = require('./app');
const userController = require('../controllers/userController');

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.post('/users', userController.create);
