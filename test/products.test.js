const request = require('supertest');
const assert = require('chai').assert;
const app = require('../server'); 

describe('Productos API', () => {
  it('Debería obtener todos los productos', async () => {
    const res = await request(app)
      .get('/api/productos')
      .set('Authorization', 'Bearer tu_token_jwt_aqui'); // Reemplaza 'tu_token_jwt_aqui' con un token JWT válido para las pruebas

    assert.strictEqual(res.status, 200);
    assert.isTrue(res.body.success);
    assert.isArray(res.body.products);
    
  });

  it('Debería obtener un producto por ID', async () => {
    const productId = 'id_de_producto_existente'; // Reemplaza con un ID válido de un producto existente en tu base de datos
    const res = await request(app)
      .get(`/api/productos/${productId}`)
      .set('Authorization', 'Bearer tu_token_jwt_aqui');

    assert.strictEqual(res.status, 200);
    assert.isTrue(res.body.success);
    assert.isObject(res.body.product);
    
  });

  it('Debería agregar un producto si el usuario es administrador', async () => {
    const newProduct = {
      nombre: 'Nombre del Producto',
      precio: 10,
      // Agrega más propiedades necesarias para crear un producto
    };

    const res = await request(app)
      .post('/api/productos')
      .set('Authorization', 'Bearer tu_token_jwt_aqui')
      .send(newProduct);

    assert.strictEqual(res.status, 200);
    assert.isTrue(res.body.success);
    assert.strictEqual(res.body.message, 'Se agregó el producto');
    
  });

  
});
