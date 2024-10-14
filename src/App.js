import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import CourseList from "../src/components/CourseList";
import MyCourses from "../src/components/MyCourses";

const App = () => {
  const [subscribedCourses, setSubscribedCourses] = useState([]);

  // Handle subscription
  const handleSubscribe = async (courseId) => {
    if (!subscribedCourses.includes(courseId)) {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      if (response.ok) {
        setSubscribedCourses((prev) => [...prev, courseId]);
      }
    } else {
      alert("You have already subscribed to this course.");
    }
  };

  // Handle unsubscription
  const handleUnsubscribe = async (courseId) => {
    const response = await fetch("http://localhost:5000/api/unsubscribe", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId }),
    });

    if (response.ok) {
      setSubscribedCourses((prev) => prev.filter((id) => id !== courseId));
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Available Courses
      </Typography>
      <CourseList onSubscribe={handleSubscribe} />
      <Typography variant="h4" gutterBottom style={{ marginTop: "32px" }}>
        My Courses
      </Typography>
      <MyCourses
        subscribedCourses={subscribedCourses}
        onUnsubscribe={handleUnsubscribe}
      />
    </Container>
  );
};

export default App;
