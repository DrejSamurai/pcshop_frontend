import { useEffect, useState } from 'react';
import ProductService from '../../services/ProductsService';
import {
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
import "./products.css";

const GpuPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [stores, setStores] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const [filters, setFilters] = useState({
    category: 'GPU',
    minPrice: 0,
    maxPrice: 20000,
    manufacturers: [] as string[],
    stores: [] as string[],
    title: ''
  });

  useEffect(() => {
    ProductService.getManufacturers('GPU')
      .then(res => setManufacturers(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    ProductService.getStores()
      .then(res => setStores(res.data))
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
    <Box sx={{ width: '90vw', py: 4, px: 2 }}>
      <Box display="flex" gap={6}>
        <Box sx={{ width: '250px', flexShrink: 0 }}>
          <ProductFilterSidebar
            category={filters.category}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            manufacturers={manufacturers}
            selectedManufacturers={filters.manufacturers}
            stores={stores}
            selectedStores={filters.stores}
            title={filters.title}
            onFilterChange={(newFilters) => {
              setFilters(newFilters);
              setPage(1);
            }}
          />
        </Box>

        <Box flexGrow={1}>
          <TableContainer component={Paper} className="gpu-table-container">
            <Table className="gpu-table">
              <TableHead>
                <TableRow className="gpu-table-header-row">
                  <TableCell className="gpu-table-cell">Image</TableCell>
                  <TableCell className="gpu-table-cell">Title</TableCell>
                  <TableCell className="gpu-table-cell">Store</TableCell>
                  <TableCell className="gpu-table-cell">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product.id} className="gpu-table-row">
                    <TableCell className="gpu-table-cell">
                      <img
                        src={ProductService.getProxiedImageUrl(product.image)}
                        alt={product.title}
                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                      />
                    </TableCell>
                    <TableCell className="gpu-table-cell">
                      <Typography noWrap className="gpu-table-text">
                        <b>{product.title}</b>
                      </Typography>
                    </TableCell>
                    <TableCell className="gpu-table-cell">
                      <Typography noWrap className="gpu-table-text">
                        {product.store}
                      </Typography>
                    </TableCell>
                    <TableCell className="gpu-table-cell">
                      <Typography color="primary" className="gpu-table-text">
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
    </Box>
  );
};

export default GpuPage;