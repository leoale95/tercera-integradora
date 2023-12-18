const request = require('supertest');
const assert = require('chai').assert;
const app = require('../server'); 

describe('Carrito API', () => {
  it('Debería ver el carrito del usuario', async () => {
    const res = await request(app)
      .get('/api/carrito')
      .set('Authorization', 'Bearer tu_token_jwt_aqui'); // Reemplaza 'tu_token_jwt_aqui' con un token JWT válido para las pruebas

    assert.strictEqual(res.status, 200);
    assert.isTrue(res.body.success);
    
  });

  it('Debería agregar un producto al carrito', async () => {
    const productData = {
      idUser: 'id_de_usuario',
      idProduct: 'id_de_producto_a_agregar',
      
    };

    const res = await request(app)
      .post('/api/carrito/addProduct')
      .set('Authorization', 'Bearer tu_token_jwt_aqui')
      .send(productData);

    assert.strictEqual(res.status, 200);
    assert.isTrue(res.body.success);
    assert.strictEqual(res.body.carrito, 'Se agregó el producto');
    
  });

  it('Debería eliminar un carrito por ID', async () => {
    const cartId = 'id_de_carrito_a_eliminar'; // Reemplaza con un ID válido de un carrito existente en tu base de datos

    const res = await request(app)
      .delete(`/api/carrito/${cartId}`)
      .set('Authorization', 'Bearer tu_token_jwt_aqui');

    assert.strictEqual(res.status, 200);
    assert.isTrue(res.body.success);
    assert.strictEqual(res.body.carrito, 'Carrito eliminado');
    
  });

  
});
