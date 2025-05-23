import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Slider,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';

const categories = ['GPU', 'CPU', 'Motherboard', 'PowerSupply', 'Case', 'Memory', 'Storage'];

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  manufacturers: string[];
}

interface Props {
  category: string;
  minPrice: number;
  maxPrice: number;
  manufacturers: string[];
  selectedManufacturers: string[];
  onFilterChange: (filters: Filters) => void;
}

const ProductFilterSidebar: React.FC<Props> = ({
  category,
  minPrice,
  maxPrice,
  manufacturers,
  selectedManufacturers,
  onFilterChange,
}) => {
  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onFilterChange({ category: event.target.value as string, minPrice, maxPrice, manufacturers: selectedManufacturers });
  };

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    onFilterChange({ category, minPrice: min, maxPrice: max, manufacturers: selectedManufacturers });
  };

  const handleManufacturerToggle = (manufacturer: string) => {
    let newSelected = [...selectedManufacturers];
    if (newSelected.includes(manufacturer)) {
      newSelected = newSelected.filter((m) => m !== manufacturer);
    } else {
      newSelected.push(manufacturer);
    }
    onFilterChange({ category, minPrice, maxPrice, manufacturers: newSelected });
  };

  return (
    <Box sx={{ p: 2, width: 250 }}>
      <Typography variant="h6">Filter</Typography>

      <Typography sx={{ mt: 4 }}>Price Range</Typography>
      <Slider
        value={[minPrice, maxPrice]}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={20000}
        step={100}
      />

      <Typography sx={{ mt: 4, mb: 1 }}>Manufacturers</Typography>
      <FormGroup>
        {manufacturers.map((manufacturer) => (
          <FormControlLabel
            key={manufacturer}
            control={
              <Checkbox
                checked={selectedManufacturers.includes(manufacturer)}
                onChange={() => handleManufacturerToggle(manufacturer)}
              />
            }
            label={manufacturer}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default ProductFilterSidebar;