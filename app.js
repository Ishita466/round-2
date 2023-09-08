const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.post('/bfhl', (req, res) => {
  try{
  const data = req.body.data;
  if(!data){
    throw new Error("No data present");
  }
  else if(!Array.isArray(data)) {
    throw new Error("Data is not an array");
  }
  let numbers = [], alphabets = [], highestAlphabet = '';
  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else {
      alphabets.push(item);
    }
  });
  if(alphabets.length > 0) {
    highestAlphabet = alphabets.sort((a, b) => a.toLowerCase() < b.toLowerCase() ? 1 : -1)[0];
  }
  
  res.json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_alphabet: highestAlphabet ? [highestAlphabet] : []
  });
  }
  catch(err){
    res.json({
        is_success: false,
        error: err.message
    })
  }
});

app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.get('/', (req, res) => {
    res.status(200).json({
        msg: "OK"
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});