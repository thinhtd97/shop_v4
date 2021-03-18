import bcrypt from 'bcryptjs'
const users = [
    {
        name: "Duc Thinh",
        email: "admin@example.com",
        password: bcrypt.hashSync('123456', 10),
        role: 'admin'
    },
    {
        name: "John",
        email: "john@example.com",
        password: bcrypt.hashSync('123456', 10),
        role: 'subscriber'
    },
    {
        name: "tonyshark",
        email: "tonyshark@example.com",
        password: bcrypt.hashSync('123456', 10),
        role: 'subscriber'
    },
  ]
  
  export default users