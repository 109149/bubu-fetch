import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const SelectBreeds = (props) => {
  const { breeds, currentBreed, handleChange, className, style } = props;

  return (
    <>
      {breeds && breeds.length > 0 && (
        <TextField
          select
          onChange={handleChange}
          className={className}
          style={style}
          value={currentBreed}
        >
          {breeds.map((breed) => {
            return (
              <MenuItem key={breed} value={breed}>
                {breed}
              </MenuItem>
            );
          })}
        </TextField>
      )}
    </>
  );
};

export default SelectBreeds;
