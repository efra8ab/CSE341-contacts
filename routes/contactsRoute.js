const express = require("express");
const contactsController = require("../controllers/contactsController");

const router = express.Router();

router.get(
  "/",
  /* 
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Retrieve every contact that exists in the database'
    #swagger.responses[200] = {
      description: 'A JSON array with all contacts',
      schema: [{ $ref: '#/definitions/Contact' }]
    }
  */
  contactsController.getAll
);

router.get(
  "/:id",
  /* 
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Look up a single contact'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB identifier of the contact',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'The contact that matches the provided id',
      schema: { $ref: '#/definitions/Contact' }
    }
  */
  contactsController.getOne
);

router.post(
  "/",
  /* 
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Create a new contact'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Information required to create a contact',
      required: true,
      schema: { $ref: '#/definitions/NewContact' }
    }
    #swagger.responses[201] = {
      description: 'Document id for the newly created contact',
      schema: { $id: '665f9362c02c48a038a4fcd1' }
    }
  */
  contactsController.createContact
);

router.put(
  "/:id",
  /* 
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Update one contact by replacing it'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB identifier of the contact',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Complete payload for the contact',
      required: true,
      schema: { $ref: '#/definitions/NewContact' }
    }
    #swagger.responses[204] = {
      description: 'No content response once the contact is updated'
    }
  */
  contactsController.updateContact
);

router.delete(
  "/:id",
  /* 
    #swagger.tags = ['Contacts']
    #swagger.summary = 'Delete a single contact'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'MongoDB identifier of the contact',
      required: true,
      type: 'string'
    }
    #swagger.responses[204] = {
      description: 'Contact removed successfully'
    }
  */
  contactsController.deleteContact
);

module.exports = router;
