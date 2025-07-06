// import.js

const { MongoClient } = require('mongodb');
require('dotenv').config(); // This line loads the .env file

async function main() {
  // Use the connection string from the .env file
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Successfully connected to MongoDB!');

    // Select the database and the collection
    const database = client.db(); // Uses the DB from the connection string
    const contactsCollection = database.collection('contacts');

    // Define the documents to be inserted
    const contacts = [
      {
        "firstName": "Rutendo",
        "lastName": "Makundo",
        "email": "rutendomakundo@gmail.com",
        "favoriteColor": "Purple",
        "birthday": new Date("2004-01-24")
      },
      {
        "firstName": "Melanie",
        "lastName": "Muroiwa",
        "email": "melt@gmail.com.com",
        "favoriteColor": "Orange",
        "birthday": new Date("2010-04-13")
      },
      {
        "firstName": "Candie",
        "lastName": "Makhaya",
        "email": "candym@gmail.com",
        "favoriteColor": "Yellow",
        "birthday": new Date("1999-10-02")
      }
    ];

    // Insert the documents into the 'contacts' collection
    const result = await contactsCollection.insertMany(contacts);
    console.log(`${result.insertedCount} documents were inserted with the following ids:`);
    console.log(result.insertedIds);

  } catch (e) {
    console.error('An error occurred:', e);
  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
    console.log('Connection to MongoDB closed.');
  }
}

// Run the main function
main().catch(console.error);