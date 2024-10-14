// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample data for courses and subscriptions
let courses = [
  { id: 1, title: 'Introduction to JavaScript', description: 'Learn the basics of JavaScript.', duration: '4 weeks' },
  { id: 2, title: 'Advanced CSS', description: 'Deep dive into CSS and animations.', duration: '6 weeks' },
  { id: 3, title: 'React for Beginners', description: 'Build user interfaces with React.', duration: '5 weeks' },
];

let subscriptions = []; // This will hold user subscriptions

// Endpoint to fetch all courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Endpoint to subscribe to a course
app.post('/api/subscribe', (req, res) => {
  const { courseId } = req.body;
  // Simulating user ID for this example (In a real app, this would be from the logged-in user)
  const userId = 'user123';

  // Check if already subscribed
  if (subscriptions.some(sub => sub.courseId === courseId && sub.userId === userId)) {
    return res.status(400).json({ message: 'Already subscribed to this course.' });
  }

  // Add subscription
  subscriptions.push({ courseId, userId });
  res.status(200).json({ message: 'Subscribed successfully' });
});

// Endpoint to fetch subscribed courses for a user
app.get('/api/my-courses', (req, res) => {
  const userId = 'user123'; // Simulating user ID
  const subscribedCourseIds = subscriptions.filter(sub => sub.userId === userId).map(sub => sub.courseId);
  const myCourses = courses.filter(course => subscribedCourseIds.includes(course.id));
  res.json(myCourses);
});

// Endpoint to unsubscribe from a course
app.delete('/api/unsubscribe', (req, res) => {
  const { courseId } = req.body;
  const userId = 'user123'; // Simulating user ID

  // Remove subscription
  subscriptions = subscriptions.filter(sub => !(sub.courseId === courseId && sub.userId === userId));
  res.status(200).json({ message: 'Unsubscribed successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
