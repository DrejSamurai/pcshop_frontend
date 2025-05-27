import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductService from '../../services/ProductsService';
import { searchYouTube } from '../../services/YouTubeService'; // your backend YouTube API call
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<any[]>([]);
  const [videosLoading, setVideosLoading] = useState(false);

  // Fetch product by ID
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

  // Fetch YouTube videos when product.title changes
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
      {/* Product Info */}
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'flex-start' },
        }}
      >
        {/* Left Side: Image + Description */}
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
          <Typography>Product Info:</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
            {product.description}
          </Typography>
        </Box>

        {/* Right Side: Other product details */}
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
          <Button
            variant="contained"
            color="primary"
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textTransform: 'none', px: 4, py: 1, mt: 2, alignSelf: 'flex-start' }}
          >
            To {product.store}
          </Button>
        </Box>
      </Box>

      {/* YouTube Review Videos */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" gutterBottom>
          Reviews on YouTube
        </Typography>

        {videosLoading && <CircularProgress />}

        {!videosLoading && videos.length === 0 && (
          <Typography>Review not found</Typography>
        )}

        <Grid container spacing={2}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={3} key={video.id.videoId}>
              <Card
                sx={{ cursor: 'pointer' }}
                onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`, '_blank')}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                />
                <CardContent>
                  <Typography variant="body2" noWrap>
                    {video.snippet.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;