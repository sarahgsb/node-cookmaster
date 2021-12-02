const app = require('./app');
const userController = require('../controllers/userController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesController');
const auth = require('../middlewares/auth');

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));

app.post('/users', userController.create);
app.post('/login', loginController.findUser);
app.post('/recipes', auth, recipesController.create);
