const request = require('supertest');
const assert = require('chai').assert;
const app = require('../server'); 

describe('User Authentication API', () => {
  it('Debería registrar un nuevo usuario', async () => {
    const userData = {
      username: 'username_prueba',
      password: 'contraseña_prueba',
      email: 'correo_prueba@example.com',
      telefono: '123456789',
      edad: 25,
      direccion: 'Dirección de prueba',
      userPicture: 'url_imagen_prueba',
      
    };

    const res = await request(app)
      .post('/api/register')
      .send(userData);

    assert.strictEqual(res.status, 200);
    assert.isTrue(res.body.success);
    assert.strictEqual(res.body.message, 'Usuario creado correctamente / User created successfully');
    
  });

  it('Debería iniciar sesión con credenciales válidas', async () => {
    const loginData = {
      username: 'username_existente',
      password: 'contraseña_existente',
      
    };

    const res = await request(app)
      .post('/api/login')
      .send(loginData);

    assert.strictEqual(res.status, 200);
    assert.isTrue(res.body.success);
    assert.strictEqual(res.body.message, 'Log correcto! / Log success');
    assert.match(res.body.token, /^Bearer /); // Verifica que el token comience con 'Bearer '
    
  });

  
});
