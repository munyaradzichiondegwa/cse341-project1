const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// GET all contacts
router.get('/', async (req, res) => {
  // #swagger.description = 'Get all contacts from the database.'
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET contact by ID
router.get('/:id', async (req, res) => {
  // #swagger.description = 'Get a single contact by its ID.'
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new contact
router.post('/', async (req, res) => {
  // #swagger.description = 'Create a new contact.'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Contact information.',
        required: true,
        schema: {
            firstName: "Nevanji",
            lastName: "Nehoreka",
            email: "nevanjinehoreka@gmail.com",
            favoriteColor: "Green",
            birthday: "1991-10-26"
        }
  } */
  const contact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  });

  try {
    const newContact = await contact.save();
    res.status(201).json({ contactId: newContact._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (Update) a contact by ID
router.put('/:id', async (req, res) => {
  // #swagger.description = 'Update an existing contact by its ID.'
  /*  #swagger.parameters['body'] = {
        in: 'body',
        description: 'Contact information to update.',
        required: true,
        schema: {
            firstName: "Nevanji",
            lastName: "Nehoreka",
            email: "nevanjinehoreka@gmail.com",
            favoriteColor: "Green",
            birthday: "1991-10-26"
        }
  } */
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(204).send(); // 204 No Content is standard for a successful PUT
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a contact by ID
router.delete('/:id', async (req, res) => {
  // #swagger.description = 'Delete a contact by its ID.'
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;