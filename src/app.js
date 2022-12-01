const express = require('express');
const routes = require('./routes');
const { tokenGenerator } = require('./auth/generateToken');
const { UserService,
  CategoriesService,
  BlogPostService,
  PostCategoriesService, 
} = require('./services');
const validateDisplayName = require('./auth/validateBody/validateDisplayName');
const validateEmail = require('./auth/validateBody/validateEmail');
const validatePassword = require('./auth/validateBody/validatePassword');
const validateName = require('./auth/validateBody/validateName');
const validatePostBody = require('./auth/validateBody/validatePostBody');
const validateJWT = require('./auth/validateJWT');

// ...

const app = express();

app.use(express.json());

const apiRoutes = express.Router();

apiRoutes.get('/user', validateJWT, routes.getUser);

apiRoutes.get('/post', validateJWT, routes.getBlogPosts);
apiRoutes.get('/post/:id', validateJWT, routes.getBlogPostById);

apiRoutes.get('/categories', validateJWT, routes.getCategory);

apiRoutes.get('/user/:id', validateJWT, routes.getUserbyId);

apiRoutes.post('/post', 
  validateJWT,
  validatePostBody,
  async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const userId = req.user;

    const inserBlogPost = await BlogPostService.createBlogPost(title, content, userId);
    const { id } = await inserBlogPost;
    console.log(id);
    categoryIds.forEach(async (category) => {
      await PostCategoriesService.createPostsCategories(id, category);
    });
    
    return res.status(201).json(inserBlogPost);
});

apiRoutes.post('/categories', 
  validateJWT,
  validateName,
  async (req, res) => {
    const { name } = req.body;
    const category = await CategoriesService.createCategory(name);
    return res.status(201).json(category); 
});

apiRoutes.post('/login', routes.login);
app.post('/user', 
  validateDisplayName,
  validateEmail,
  validatePassword,
  async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const user = await UserService.getByEmail(email);
    if (!user) {
      await UserService.createUser(displayName, email, password, image);
      const data = { displayName, email, image };
      const token = await tokenGenerator(data);
  
      return res.status(201).json({ token }); 
    }

    return res.status(409).json({ message: 'User already registered' });
});

app.use(apiRoutes);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
