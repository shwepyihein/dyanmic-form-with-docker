import * as React from 'react';

import Box from '@mui/material/Box';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from '@mui/material';

import { capitalize } from '../utility';

interface TextFieldProps {
  item: { [name: string]: any };
  handleChange: any;
  index: number;
}

const CustomTextField = ({
  item,
  handleChange,
  index,
}: TextFieldProps): JSX.Element => {
  if (item.type === 'select')
    return (
      <FormControl fullWidth>
        <InputLabel id={item.fieldName}>{item.fieldName}</InputLabel>
        <Select
          tabIndex={index}
          labelId={item.fieldName}
          value={item.value}
          onChange={handleChange}
        >
          {item?.options.map((item: string, i: number) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  if (item.type === 'multiline')
    return (
      <FormControl fullWidth>
        <TextField
          id={item.fieldName}
          multiline
          tabIndex={index}
          label={capitalize(item.fieldName)}
          value={item.value}
          variant='outlined'
          onChange={handleChange}
        />
      </FormControl>
    );
  return (
    <FormControl fullWidth>
      <TextField
        id={item.fieldName}
        type={item.type}
        tabIndex={index}
        label={capitalize(item.fieldName)}
        value={item.value}
        onChange={handleChange}
        variant='outlined'
      />
    </FormControl>
  );
};

export default CustomTextField;
