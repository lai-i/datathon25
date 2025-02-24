'use client'
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Card, Typography } from "@mui/material";

const NumberInput: React.FC = () => {
  const [value, setValue] = useState<number>(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value === "" ? "" : Number(event.target.value);

    // Enforce the range
    if (typeof newValue === "number" && !isNaN(newValue)) {
      if (newValue < 1) newValue = 1;
      if (newValue > 100) newValue = 100;
      setValue(newValue);
    }
  };

  return (
    <Card sx={{ mx: '200px', alignContent: 'center', textAlign: 'center', px: 20 }}>
        <Typography variant="h4">Enter an error threshold:</Typography>
        <TextField
        label="Error Threshold"
        type="number"
        value={value}
        onChange={handleChange}
        sx={{ min: 1, max: 100, width: '200px', mt: 5 }}
        fullWidth
        />
    </Card>
  );
};

export default NumberInput;
