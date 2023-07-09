import { Box } from "@material-ui/core";
import { SearchOutlined } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React from "react";
import { FC } from "react";

interface Props {
  handleSearch: (e: any) => void;
  searchString: string;
}

const SearchInput: FC<Props> = ({ handleSearch, searchString }) => {
  return (
    <Box
      sx={{
        padding: "15px",
      }}
    >
      <TextField
        fullWidth
        onChange={(e) => handleSearch(e)}
        value={searchString}
        id="standard-bare"
        variant="outlined"
        label="Tìm kiếm..."
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchOutlined />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};

export default SearchInput;
