const product = require('../controllers/product.controller')

const routes = (app) => {
    app.get('/api/product/list',product.list);
    app.post('/api/product/create',product.create);
    app.put('/api/product/:id/edit',product.edit);
    app.delete('/api/product/:id/delete',product.delete);
  };
  
  module.exports = { routes };
  