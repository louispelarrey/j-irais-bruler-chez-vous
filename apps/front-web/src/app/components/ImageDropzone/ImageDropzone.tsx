import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import { useRef, useState } from "react";

export const ImageDropzone = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setFiles(files);
  };

  const getFileNames = () =>
    files?.reduce(
      (fileNames, file) =>
        `${fileNames} ${fileNames !== "" ? "," : ""} ${file.name}`,
      ""
    ) || "";

  return (
    <Box position="relative" height={57} width="100%" sx={{ mt: 1 }}>
      <Box position="absolute" width="100%">
        <TextField
          fullWidth
          label="Sélectionner une photo"
          value={getFileNames()}
          required
          sx={{ pointerEvents: "none" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AttachFile />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Button
        component="label"
        onKeyDown={(e) => e.key === "32" && ref.current?.click()}
        fullWidth
        sx={{ height: "100%" }}
      >
        <input
          ref={ref}
          type="file"
          onChange={handleChange}
          accept="image/*"
          hidden
          multiple
        />
      </Button>
    </Box>
  );
};
