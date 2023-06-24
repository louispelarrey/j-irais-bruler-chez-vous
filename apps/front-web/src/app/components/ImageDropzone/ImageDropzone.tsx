import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { AttachFile } from "@mui/icons-material";
import { useCallback, useContext, useRef } from "react";
import { TrashImageContext } from "../../containers/Trash/List";

export const ImageDropzone = () => {
  const ref = useRef<HTMLInputElement>(null);
  const {trashImage, setTrashImage} = useContext(TrashImageContext);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setTrashImage?.(files[0]);
  }, [setTrashImage]);

  return (
    <Box position="relative" height={40} width="100%" sx={{ mt: 1 }}>
      <Box position="absolute" width="100%">
        <TextField
          fullWidth
          label="Sélectionner une photo"
          size='small'
          value={trashImage?.name || ""}
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
