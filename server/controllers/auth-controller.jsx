//? In an Express.js application, a "controller" refers to a part of your code that is responsible
// for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to clients.
// They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.

// *-------------------
// Home Logic
// *-------------------
const home = async (req, res) => {
    try {
      res.status(200).json({ msg: "Welcome to our home page" });
    } catch (error) {
      console.log(error);
    }
  };
  
  // *-------------------
  // Registration Logic
  // *-------------------
  const register = async (req, res) => {
    try {
      const data = req.body;
      console.log(req.body);
      // res.status(201).json({ message: "User registered successfully" });
      res.status(200).json({ msg: data });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  module.exports = { home, register };