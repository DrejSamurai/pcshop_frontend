import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductService from '../../services/ProductsService';
import ConfigurationService from '../../services/ConfigurationService';
import { searchYouTube } from '../../services/YouTubeService';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<any[]>([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [configs, setConfigs] = useState<any[]>([]);
  const [selectedConfig, setSelectedConfig] = useState<string>('');
  const [addLoading, setAddLoading] = useState(false);
  const [addMessage, setAddMessage] = useState<string | null>(null);
  const navigate = useNavigate(); 
  
  const token = localStorage.getItem('token') || '';
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const userID = user?.sub ? Number(user.sub) : null;

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    ProductService.getProductById(id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!product?.title) return;

    const fetchVideos = async () => {
      setVideosLoading(true);
      try {
        const query = `${product.title} review`;
        const data = await searchYouTube(query);
        setVideos(data.items?.slice(0, 4) || []);
      } catch (error) {
        console.error('Failed to fetch YouTube videos', error);
        setVideos([]);
      } finally {
        setVideosLoading(false);
      }
    };

    fetchVideos();
  }, [product?.title]);

  useEffect(() => {
    if (dialogOpen && userID) {
      ConfigurationService.getByUser(userID)
        .then(setConfigs)
        .catch((err) => {
          console.error('Failed to load configurations', err);
          setConfigs([]);
        });
    }
  }, [dialogOpen, userID]);

  const handleAddProductToConfig = async () => {
    if (!selectedConfig || !product?.id) return;

    setAddLoading(true);
    setAddMessage(null);
    try {
      const response = await ConfigurationService.addProduct(
        Number(selectedConfig),
        product.id
      );
      setAddMessage(response.message || 'Product added successfully.');
      setDialogOpen(false);
      navigate('/pcbuilder')
    } catch (error) {
      console.error('Failed to add product to configuration', error);
      setAddMessage('Failed to add product to configuration.');
    } finally {
      setAddLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (!product) return <Typography>Product not found</Typography>;

  return (
    <Box
      sx={{
        maxWidth: 900,
        p: 4,
        borderRadius: 3,
        boxShadow: 3,
        bgcolor: 'background.paper',
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'flex-start' },
        }}
      >
        <Box
          sx={{
            flexBasis: { md: '50%' },
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-start',
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{
              width: '100%',
              borderRadius: 2,
              objectFit: 'contain',
              maxHeight: 400,
            }}
          />
          <Typography variant="h6" fontWeight="bold">
            Product Info:
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
            {product.description}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
            pt: { xs: 2, md: 0 },
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {product.title}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Code: <strong>{product.code}</strong>
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Warranty: <strong>{product.warranty} years</strong>
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Price: <strong>{product.price} MKD</strong>
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
  variant="contained"
  color="primary"
  href={product.link}
  target="_blank"
  rel="noopener noreferrer"
  sx={{
    backgroundColor: '#36d286',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#2bb673',
    },
  }}
>
  To {product.store}
</Button>

<Button
  variant="contained"
  color="primary"
  onClick={() => setDialogOpen(true)}
  sx={{
    backgroundColor: '#36d286',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#2bb673',
    },
  }}
>
  Add to Configuration
</Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" gutterBottom>
          Reviews on YouTube
        </Typography>

        {videosLoading && <CircularProgress />}

        {!videosLoading && videos.length === 0 && <Typography>Review not found</Typography>}

        <Grid container spacing={2}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={3} key={video.id.videoId}>
              <Card
                sx={{
                  cursor: 'pointer',
                  borderRadius: '8px 8px 0 0',
                  objectFit: 'contain',
                }}
                onClick={() =>
                  window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank')
                }
              >
                <CardMedia
                  component="img"
                  height="140"
                  width="140"
                  image={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                />
                <CardContent>
                  <Typography variant="body2" noWrap>
                    {truncateText(video.snippet.title, 25)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Select Configuration</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="config-select-label">Configuration</InputLabel>
            <Select
              labelId="config-select-label"
              value={selectedConfig}
              label="Configuration"
              onChange={(e) => setSelectedConfig(e.target.value)}
            >
              {configs.map((cfg) => (
                <MenuItem key={cfg.id} value={cfg.id.toString()}>
                  {cfg.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {addMessage && (
            <Typography
              sx={{ mt: 2 }}
              color={addMessage.includes('Failed') ? 'error' : 'success.main'}
            >
              {addMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAddProductToConfig}
            disabled={!selectedConfig || addLoading}
          >
            {addLoading ? 'Adding...' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetailsPage;