import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CardContent,
  Chip,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ProductService from "../services/ProductsService";
import { useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }, []);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await ProductService.getRandomProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching random products:", error);
      }
    };


    fetchRandomProducts();
  }, []);

  const loopProducts = [...products, ...products];

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={6}
        mt={8}
        sx={{
          maxWidth: "800px",
          mx: "auto",
          px: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
          borderRadius: 4,
          py: 6,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="h3"
            component="h1"
            textAlign="center"
            maxWidth={800}
            sx={{
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: { xs: 1.3, lg: "4rem" },
            }}
          >
            Find the best prices and build the computer of your dreams.
          </Typography>

          <Typography
            variant="body1"
            textAlign="center"
            maxWidth={{ xs: 300, md: 600, xl: 700 }}
            mt={2}
            color="text.secondary"
          >
            A platform for finding the best prices of computer components in your local stores!
            Find all the key components, create a configuration, export it on the go.
          </Typography>
        </Box>

        <Stack spacing={1} alignItems="center" mt={4}>
          {isLoggedIn ? (
                     <Button
            className="customButton"
            variant="contained"
            size="large"
            href="/pcbuilder"
            sx={{
              borderRadius: "999px",
              px: 3,
              py: 1.5,
              fontWeight: 500,
              textTransform: "none",
            }}
            endIcon={<ArrowForwardIcon />}
          >
            Build your first pc here!
          </Button>
                    ) : (
                     <Button
            className="customButton"
            variant="contained"
            size="large"
            href="/register"
            sx={{
              borderRadius: "999px",
              px: 3,
              py: 1.5,
              fontWeight: 500,
              textTransform: "none",
            }}
            endIcon={<ArrowForwardIcon />}
          >
            Dont have an account? Register Now!
          </Button>
                    )}
  
        </Stack>
      </Box>

      <Box
        sx={{
          overflow: "hidden",
          width: "100%",
          position: "relative",
          py: 4,
          mt: 6,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            animation: "slideLeft 30s linear infinite",
            width: "fit-content",
          }}
        >
          {loopProducts.map((product, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 280,
                flexShrink: 0,
                borderRadius: 3,
                backgroundColor: "#1e1e1e",
                color: "white",
                boxShadow: 3,
              }}
            >
              <CardActionArea onClick={() => navigate(`/product/${product.id}`)}>
                {product.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.title || product.name}
                    sx={{
                      borderRadius: "8px 8px 0 0",
                      objectFit: "contain",
                    }}
                  />
                )}
                <CardContent>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Chip label={product.store || "Store"} size="small" color="success" />
                    <Typography variant="caption">{product.price} ден</Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                    }}
                  >
                    {truncateText(product.title || product.name, 25)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>

      <style>{`
        .customButton {
          background-color: #36d286 !important;
          text-transform: none !important;
        }
        .customButton:hover {
          background-color: #2bb673 !important;
        }
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}

export default Home;
