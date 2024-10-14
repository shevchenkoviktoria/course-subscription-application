const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Sample course data
let courses = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn the basics of React.",
    duration: "4 weeks",
  },
  {
    id: 2,
    title: "Advanced Node.js",
    description: "Dive deep into Node.js.",
    duration: "6 weeks",
  },
  // Add more courses as needed
];

let subscriptions = [];

// Get courses
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

// Subscribe to a course
app.post("/api/subscribe", (req, res) => {
  const { courseId } = req.body;
  if (!subscriptions.includes(courseId)) {
    subscriptions.push(courseId);
  }
  res.status(201).json({ message: "Subscribed successfully!" });
});

// Get subscribed courses
app.get("/api/my-courses", (req, res) => {
  const myCourses = courses.filter((course) =>
    subscriptions.includes(course.id)
  );
  res.json(myCourses);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
