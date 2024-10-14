import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";

const CourseList = ({ onSubscribe }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("http://localhost:5000/api/courses");
      const data = await response.json();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid item xs={12} sm={6} md={4} key={course.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{course.title}</Typography>
              <Typography variant="body2">{course.description}</Typography>
              <Typography variant="caption">{course.duration}</Typography>
              <Button
                variant="contained"
                onClick={() => onSubscribe(course.id)}
                style={{ marginTop: "16px" }}
              >
                Subscribe
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CourseList;
