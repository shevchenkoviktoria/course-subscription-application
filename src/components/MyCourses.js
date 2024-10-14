import React, { useEffect, useState } from "react";
import { Card, CardContent, Grid, Typography, Button, Grid2 } from "@mui/material";

const MyCourses = ({ subscribedCourses, onUnsubscribe }) => {
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      const response = await fetch("http://localhost:5000/api/my-courses");
      const data = await response.json();
      const filteredCourses = data.filter((course) =>
        subscribedCourses.includes(course.id)
      );
      setMyCourses(filteredCourses);
    };

    fetchMyCourses();
  }, [subscribedCourses]);

  return (
    <Grid2 container spacing={3}>
      {myCourses.map((course) => (
        <Grid2 item xs={12} sm={6} md={4} key={course.id}>
          <Card>
            <CardContent>
              <Typography variant="h5">{course.title}</Typography>
              <Typography variant="body2">{course.description}</Typography>
              <Typography variant="caption">{course.duration}</Typography>
              <Button
                variant="contained"
                onClick={() => onUnsubscribe(course.id)}
                style={{ marginTop: "16px" }}
              >
                Unsubscribe
              </Button>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default MyCourses;
