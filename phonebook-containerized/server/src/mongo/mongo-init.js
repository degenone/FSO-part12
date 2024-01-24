const people = [
    {
      name: "Arto Hellas",
      number: "040-123-456",
    },
    {
      name: "Ada Lovelace",
      number: "394 453 2523",
    },
    {
      name: "Dan Abramov",
      number: "124-323-4345",
    },
    {
      name: "Mary Poppendieck",
      number: "392 364 2122",
    },
    {
      name: "Tero Kilpeläinen",
      number: "040 987 6543",
    },
    {
      name: "Matti Meikeläinen",
      number: "349 925 2341",
    }
];

db.createUser({
    user: 'db_user',
    pwd: 'db_user_password',
    roles: [
      {
        role: 'dbOwner',
        db: 'phonebookDB',
      },
    ],
});
  
db.createCollection('people');

db.people.insertMany(people);
