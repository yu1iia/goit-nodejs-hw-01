const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const result = JSON.parse(data);

    console.table(result);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const contact = contacts.filter(
      contact => contact.id === Number(contactId),
    );

    console.table(contact);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const withoutRemoveContact = contacts.filter(
      contact => contact.id !== Number(contactId),
    );

    await fs.writeFile(contactsPath, JSON.stringify(withoutRemoveContact));

    console.log(`Removed contact with id ${contactId}`);
    console.table(withoutRemoveContact);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  const contactNew = { id: Date.now(), name, email, phone };
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    const contactsListNew = [contactNew, ...contacts];

    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsListNew, null, '\t'),
    );

    console.log(`New contact with name ${name} added`);
    console.table(contactsListNew);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
