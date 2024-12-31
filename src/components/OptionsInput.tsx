import { TextField, Button, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface OptionsInputProps {
  advancePage: () => void;
  options: string[];
  setOptions: (options: string[]) => void;
}

const OptionsInput: React.FC<OptionsInputProps> = ({ setOptions, options, advancePage }) => {
  const handleAddNewOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedInputs = [...options];
    updatedInputs[index] = value;
    setOptions(updatedInputs);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Submitted Strings:", options);
    advancePage();
  };

  return (
    <Stack spacing={2} sx={{ width: "100%", maxWidth: 400, margin: "auto" }}>
      <h3>Add things to compare</h3>
      {options.map((input, index) => (
        <Stack key={index} direction="row" spacing={1} alignItems="center">
          <TextField
            fullWidth
            label={input ? "" : "New Option"} // Hide label when text is present
            variant="outlined"
            value={input}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          <IconButton
            color="error"
            onClick={() => handleRemoveOption(index)}
            disabled={options.length === 1} // Prevent removing the last input
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
      <Button variant="contained" color="primary" onClick={handleAddNewOption}>
        Add Option
      </Button>
      <Button variant="outlined" color="success" onClick={handleSubmit}>
        Start Comparing
      </Button>
    </Stack>
  );
};

export { OptionsInput };
