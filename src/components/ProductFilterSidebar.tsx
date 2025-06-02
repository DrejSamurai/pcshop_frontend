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


interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  manufacturer: string[];
  store: string[];
  title: string;
}

interface Props {
  category: string;
  minPrice: number;
  maxPrice: number;
  manufacturer: string[];
  selectedManufacturer: string[];
  store: string[];
  selectedStore: string[];
  title: string;
  onFilterChange: (filters: Filters) => void;
}

const ProductFilterSidebar: React.FC<Props> = ({
  category,
  minPrice,
  maxPrice,
  manufacturer,
  selectedManufacturer,
  store,
  selectedStore,
  title,
  onFilterChange,
}) => {

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    onFilterChange({
      category,
      minPrice: min,
      maxPrice: max,
      manufacturer: selectedManufacturer,
      store: selectedStore,
      title,
    });
  };

  const handleManufacturerToggle = (manufacturer: string) => {
    let newSelected = [...selectedManufacturer];
    if (newSelected.includes(manufacturer)) {
      newSelected = newSelected.filter((m) => m !== manufacturer);
    } else {
      newSelected.push(manufacturer);
    }
    onFilterChange({
      category,
      minPrice,
      maxPrice,
      manufacturer: newSelected,
      store: selectedStore,
      title,
    });
  };

  const handleStoreToggle = (store: string) => {
    let newSelected = [...selectedStore];
    if (newSelected.includes(store)) {
      newSelected = newSelected.filter((s) => s !== store);
    } else {
      newSelected.push(store);
    }
    onFilterChange({
      category,
      minPrice,
      maxPrice,
      manufacturer: selectedManufacturer,
      store: newSelected,
      title,
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      category,
      minPrice,
      maxPrice,
      manufacturer: selectedManufacturer,
      store: selectedStore,
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
        min={1}
        max={571890}
        step={100}
      />

      <Typography sx={{ mt: 4, mb: 1 }}>Manufacturers</Typography>
      <FormGroup>
        {manufacturer.map((manufacturer) => (
          <FormControlLabel
            key={manufacturer}
            control={
              <Checkbox
                checked={selectedManufacturer.includes(manufacturer)}
                onChange={() => handleManufacturerToggle(manufacturer)}
              />
            }
            label={manufacturer}
          />
        ))}
      </FormGroup>

      <Typography sx={{ mt: 4, mb: 1 }}>Stores</Typography>
      <FormGroup>
        {store.map((store) => (
          <FormControlLabel
            key={store}
            control={
              <Checkbox
                checked={selectedStore.includes(store)}
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