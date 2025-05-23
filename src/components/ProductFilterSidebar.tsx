import React from 'react';
import {
  Box,
  FormControlLabel,
  FormGroup,
  Typography,
  Slider,
  Checkbox,
  TextField,
} from '@mui/material';
import './styles/filter.css'

const categories = ['GPU', 'CPU', 'Motherboard', 'PowerSupply', 'Case', 'Memory', 'Storage'];

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  manufacturers: string[];
  stores: string[];
  title: string;
}

interface Props {
  category: string;
  minPrice: number;
  maxPrice: number;
  manufacturers: string[];
  selectedManufacturers: string[];
  stores: string[];
  selectedStores: string[];
  title: string;
  onFilterChange: (filters: Filters) => void;
}

const ProductFilterSidebar: React.FC<Props> = ({
  category,
  minPrice,
  maxPrice,
  manufacturers,
  selectedManufacturers,
  stores,
  selectedStores,
  title,
  onFilterChange,
}) => {
  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onFilterChange({
      category: event.target.value as string,
      minPrice,
      maxPrice,
      manufacturers: selectedManufacturers,
      stores: selectedStores,
      title,
    });
  };

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    onFilterChange({
      category,
      minPrice: min,
      maxPrice: max,
      manufacturers: selectedManufacturers,
      stores: selectedStores,
      title,
    });
  };

  const handleManufacturerToggle = (manufacturer: string) => {
    let newSelected = [...selectedManufacturers];
    if (newSelected.includes(manufacturer)) {
      newSelected = newSelected.filter((m) => m !== manufacturer);
    } else {
      newSelected.push(manufacturer);
    }
    onFilterChange({
      category,
      minPrice,
      maxPrice,
      manufacturers: newSelected,
      stores: selectedStores,
      title,
    });
  };

  const handleStoreToggle = (store: string) => {
    let newSelected = [...selectedStores];
    if (newSelected.includes(store)) {
      newSelected = newSelected.filter((s) => s !== store);
    } else {
      newSelected.push(store);
    }
    onFilterChange({
      category,
      minPrice,
      maxPrice,
      manufacturers: selectedManufacturers,
      stores: newSelected,
      title,
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      category,
      minPrice,
      maxPrice,
      manufacturers: selectedManufacturers,
      stores: selectedStores,
      title: event.target.value,
    });
  };

  return (
    <Box className="sidebar">
      <Typography variant="h6">Filter</Typography>

      <Typography sx={{ mt: 2, mb: 1 }}>Search by Title</Typography>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        value={title}
        onChange={handleTitleChange}
      />

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

      <Typography sx={{ mt: 4, mb: 1 }}>Stores</Typography>
      <FormGroup>
        {stores.map((store) => (
          <FormControlLabel
            key={store}
            control={
              <Checkbox
                checked={selectedStores.includes(store)}
                onChange={() => handleStoreToggle(store)}
              />
            }
            label={store}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default ProductFilterSidebar;