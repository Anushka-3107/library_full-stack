const express = require("express");
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const studentRoutes = require('./routes/studentRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/books', bookRoutes);
app.use('/students',studentRoutes );
app.use('/borrow', borrowRoutes);



module.exports = app;