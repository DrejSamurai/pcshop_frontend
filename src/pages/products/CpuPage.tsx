import React, { useEffect, useState } from 'react';
import ProductService from '../../services/ProductsService';
import {
  Container,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  Pagination,
} from '@mui/material';
import ProductFilterSidebar from '../../components/ProductFilterSidebar';

const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 9;

  const [filters, setFilters] = useState({
    category: 'CPU',
    minPrice: 0,
    maxPrice: 20000,
    manufacturers: [] as string[],
  });

  useEffect(() => {
    ProductService.getManufacturers()
      .then(res => setManufacturers(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    ProductService.getFilteredProducts({ ...filters, page, pageSize })
      .then(res => {
        setProducts(res.data);
        setTotalPages(res.data.length < pageSize ? page : page + 1);
      })
      .catch(console.error);
  }, [filters, page]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" gap={5}>
        <Box sx={{ width: '250px', flexShrink: 0 }}>
          <ProductFilterSidebar
            category={filters.category}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            manufacturers={manufacturers}
            selectedManufacturers={filters.manufacturers}
            onFilterChange={(newFilters) => {
              setFilters(newFilters);
              setPage(1);
            }}
          />
        </Box>

        <Box flexGrow={1}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price (ден)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={`http://localhost:3000/image-proxy?url=${encodeURIComponent(product.image)}`}
                        alt={product.title}
                        style={{ width: 80, height: 60, objectFit: 'cover' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography noWrap>
                       {product.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="primary">
                        {product.price}.ден
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {totalPages > 1 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductPage;