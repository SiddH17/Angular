const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // IMPORTANT: to parse JSON body

let rooms = [
  {
    roomNumber: 1,
    roomType: 'Deluxe',
    price: 700,
    checkinDate: new Date('2021-09-12'),
    chances: 0.32,
  },
  {
    roomNumber: 2,
    roomType: 'Suite',
    price: 2000,
    checkinDate: new Date('2011-02-19'),
    chances: 0.44,
  },
];

//To handle GET requests
app.get('/rooms', (req, res) => {
  res.json(rooms);
});

//To handle POST requests
app.post('/rooms', (req, res) => {
  const newRoom = req.body;
  rooms.push(newRoom);

  res.json(rooms); // return full list
});

//To handle PUT requests
app.put('/rooms/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedRoom = req.body;

  const index = rooms.findIndex((room) => room.roomNumber === id);

  if (index !== -1) {
    rooms[index] = updatedRoom; // replace entire object
    return res.json(rooms); // return full list
  }

  // if not found
  res.status(404).json({ message: 'Room not found' });
});

app.delete('/rooms/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = rooms.findIndex((room) => room.roomNumber === id);

  if (index !== -1) {
    rooms.splice(index, 1);
    return res.json(rooms);
  }

  res.status(404).json({ message: 'Room not found' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:3000`);
});
