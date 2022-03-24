const express = require('express');
const person_route = express.Router();
const personSchema = require('../models/personModel');

/* Ruta para crear una persona
Endpoint: http://localhost:5000/api/v1/persons/person */
person_route.post('/person', (req, res) => {
  const person = personSchema(req.body);
  person
    .save()
    .then((data) => res.json({ message: data }))
    .catch((error) => res.json({ message: error }));
});

/* Ruta para listar personas
Endpoint: http://localhost:5000/api/v1/persons */
person_route.get('/', (req, res) => {
  personSchema
    .find()
    .then((data) => res.json({ message: data }))
    .catch((error) => res.json({ message: error }));
});

/* Ruta para consultar una persona especifica
Endpoint: http://localhost:5000/api/v1/persons/:personId */
person_route.get('/:personId', (req, res) => {
  const { personId } = req.params;
  personSchema
    .findById(personId)
    .then((data) => res.json({ message: data }))
    .catch((error) => res.json({ message: error }));
});

/* Ruta para editar una persona especifica
Endpoint: http://localhost:5000/api/v1/persons/:personId */
person_route.put('/:personId', (req, res) => {
  const { personId } = req.params;
  const {client_name, address = { city, codigo_zip, geo : { lat, long }},
    contact = { email, cellphone }
 } = req.body;
  personSchema
    .updateOne(
      { _id: personId },
      { $set: { client_name, address, contact, geo } }
    )
    .then((data) => res.json({ message: data }))
    .catch((error) => res.json({ message: error }));
});

/* Ruta para eliminar una persona especifica
Endpoint: http://localhost:5000/api/v1/persons/:personId */
person_route.delete('/:personId', (req, res) => {
  const { personId } = req.params;
  personSchema
    .remove({ _id: personId })
    .then((data) => res.json({ message: data }))
    .catch((error) => res.json({ message: error }));
});

module.exports = person_route;
