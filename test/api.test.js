const request = require('supertest');
const { expect } = require('chai');
const app = require('../src/app');

describe('API Tests', () => {

  it('should retrieve all items', (done) => {
    request(app)
      .get('/api/items')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.at.least(2); 
        done();
      });
  });

  it('should successfully create a new item', (done) => {
    const newItem = { name: 'Item 3' };
    request(app)
      .post('/api/items')
      .send(newItem)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name', 'Item 3');
        done();
      });
  });

  it('should update an existing item correctly', (done) => {
    const updatedItem = { name: 'Updated Item 1' };
    request(app)
      .put('/api/items/1')
      .send(updatedItem)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', 1);
        expect(res.body).to.have.property('name', 'Updated Item 1');
        done();
      });
  });

  it('should successfully update another existing item', (done) => {
    const updatedItem = { name: 'Updated Item 2' };
    request(app)
      .put('/api/items/2')
      .send(updatedItem)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id', 2);
        expect(res.body).to.have.property('name', 'Updated Item 2');
        done();
      });
  });

  it('should delete an existing item', (done) => {
    request(app)
      .delete('/api/items/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Item deleted successfully');

        request(app)
          .get('/api/items')
          .end((err, res) => {
            expect(res.body).to.not.deep.include({ id: 1, name: 'Updated Item 1' });
            done();
          });
      });
  });

  it('should return 404 when trying to delete a non-existent item', (done) => {
    request(app)
      .delete('/api/items/999')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Item not found');
        done();
      });
  });

  it('should return 404 when attempting to update a non-existent item', (done) => {
    const nonExistentItem = { name: 'Non-existent Item' };
    request(app)
      .put('/api/items/999')
      .send(nonExistentItem)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.have.property('message', 'Item not found');
        done();
      });
  });
});
