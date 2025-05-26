import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductService from '../../services/ProductsService';
import { Box, Typography, CircularProgress, Button } from '@mui/material';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    ProductService.getProductById(id)
      .then(res => {
        setProduct(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

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
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ whiteSpace: 'pre-line' }}
          >
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
            Code: <strong>{product.code} </strong>
          </Typography>
           <Typography variant="h6" sx={{ mt: 1 }}>
            Warranty: <strong>{product.warranty} years </strong>
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
    </Box>
  );
};

export default ProductDetailsPage;