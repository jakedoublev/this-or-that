import React from "react";
import { Typography, Card, CardContent, Stack } from "@mui/material";

interface SortedViewProps {
  options: string[]; // The sorted options to display
}

const SortedView: React.FC<SortedViewProps> = ({ options }) => {
  console.log("sorted options", options);
  return (
    <Stack spacing={2} sx={{ width: "60%", margin: "auto", mt: 4 }}>
      <Typography variant="h4" align="center">
        Ranked Options
      </Typography>
      {options.map((option, index) => (
        <Card key={index} elevation={3} sx={{ width: "100%" }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              Rank #{index + 1}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {option}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export { SortedView };
