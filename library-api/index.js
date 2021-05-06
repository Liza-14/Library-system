import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/main.js'
import cors from 'cors'

const PORT = process.env.PORT || 3000
const app = express()

app.use(cors());
app.use(routes);

async function start() {
  try {
    await mongoose.connect('mongodb://localhost:27017/library',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

    console.log('\n');
    console.log('\x1b[32mDB has been connected...\x1b[0m');
    
    app.listen(PORT, () => {
      console.log("\x1b[32mAPI has been started...\x1b[0m");
    });
  } catch (e) {
    console.log(e);
  }
}
start()