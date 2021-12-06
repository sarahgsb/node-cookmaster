const app = require('./app');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const router = require('../controllers/recipesController');

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.post('/users', userController.create);
app.post('/login', loginController.findUser);
app.use('/recipes', router);
