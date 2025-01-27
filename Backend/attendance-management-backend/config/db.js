const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1); // Exit the app if the database connection fails
//   }
// };

const connectDB = mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("connected")
})

module.exports = connectDB;
