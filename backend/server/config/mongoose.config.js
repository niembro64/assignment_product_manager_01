const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/assignment_jokes_api", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Established a connection to the assignment_jokes_api DB"))
	.catch(err => console.log("Something went wrong when connecting to the assignment_jokes_api DB", err));