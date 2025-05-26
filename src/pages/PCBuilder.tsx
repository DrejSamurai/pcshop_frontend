import { Box, Button, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './PCBuilderPage.scss'; 
import photo from './photo.svg'
const components = [
  { label: 'Матична плоча', id: 'motherboard' },
  { label: 'Процесор', id: 'cpu' },
  { label: 'Ладење', id: 'cooling' },
  { label: 'Куќиште', id: 'case' },
  { label: 'Графичка карта', id: 'gpu' },
  { label: 'RAM Меморија', id: 'ram' },
  { label: 'Напојување', id: 'psu' },
  { label: 'Складирање', id: 'storage' },
];

const PCBuilderPage = () => {
  return (
    <Box className="builder-container">
      <Grid container spacing={2} justifyContent="center">
        {components.map((comp, index) => (
          <Grid item xs={6} md={3} key={comp.id} className="part-slot">
            <Box className="part-box">
              <Typography variant="subtitle1">{comp.label}</Typography>
              <Box className="add-icon">
                <AddIcon fontSize="large" />
              </Box>
            </Box>
          </Grid>
        ))}

        <Grid item xs={12} className="case-illustration">
          <img src={photo} alt="Case Outline" className="case-image" />
        </Grid>
      </Grid>

      <Box className="bottom-controls">
        <input type="text" value="https://your-builder-link" readOnly />
        <Button variant="contained">Креирај нова листа</Button>
      </Box>
    </Box>
  );
};

export default PCBuilderPage;