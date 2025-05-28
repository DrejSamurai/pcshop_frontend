import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  TableSortLabel,
} from '@mui/material';
import ProductFilterSidebar from '../../components/ProductFilterSidebar';
import "./products.css";

import anhochIcon from '../../assets/anhoch.png';
import ddstoreIcon from '../../assets/ddstore.png';
import zhirafa50Icon from '../../assets/zhirafa50.png';

const iconMap: Record<string, string> = {
  anhoch: anhochIcon,
  ddstore: ddstoreIcon,
  zhirafa50: zhirafa50Icon,
};

const getIconSrc = (label: string): string | undefined => {
  return iconMap[label.replace(/\s+/g, '').toLowerCase()];
};

type SortField = 'price' | 'title' | '';
type SortDirection = 'asc' | 'desc';

const CoolerPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [manufacturer, setManufacturer] = useState<string[]>([]);
  const [store, setStore] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const [filters, setFilters] = useState({
    category: 'Cooler',
    minPrice: 1,
    maxPrice: 1000000,
    manufacturer: [] as string[],
    store: [] as string[],
    title: '',
  });

  const [sortField, setSortField] = useState<SortField>('');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const navigate = useNavigate();

  useEffect(() => {
    ProductService.getManufacturers('GPU')
      .then(res => setManufacturer(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    ProductService.getStores()
      .then(res => setStore(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const backendFilters = {
      ...filters,
      manufacturer: filters.manufacturer.join(','),
      store: filters.store.join(','),
      page,
      pageSize,
      sortField,
      sortDirection,
    };

    ProductService.getFilteredProducts(backendFilters)
      .then(response => {
        const payload = response.data;
        setProducts(payload.data || []);
        setTotalPages(Math.ceil((payload.totalCount || 0) / pageSize));
      })
      .catch(console.error);
  }, [filters, page, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setPage(1);
  };

  return (
    <Box sx={{ width: '90vw', py: 4, px: 2 }}>
      <Box display="flex" gap={8}>
        <Box sx={{ width: '250px', flexShrink: 0 }}>
          <ProductFilterSidebar
            category={filters.category}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            manufacturer={manufacturer}
            selectedManufacturer={filters.manufacturer}
            store={store}
            selectedStore={filters.store}
            title={filters.title}
            onFilterChange={(newFilters) => {
              setFilters(newFilters);
              setPage(1);
            }}
          />
        </Box>

        <Box flexGrow={1}>
          {products.length === 0 ? (
            <Typography align="center" sx={{ py: 8, fontSize: '1.2rem', fontWeight: 'bold' }}>
              No products found matching your filters!
            </Typography>
          ) : (
            <TableContainer component={Paper} className="gpu-table-container">
              <Table className="gpu-table">
                <TableHead>
                  <TableRow className="gpu-table-header-row">
                    <TableCell className="gpu-table-cell">Image</TableCell>

                    <TableCell
                      className="gpu-table-cell"
                      sortDirection={sortField === 'title' ? sortDirection : false}
                    >
                      <TableSortLabel
                        active={sortField === 'title'}
                        direction={sortField === 'title' ? sortDirection : 'asc'}
                        onClick={() => handleSort('title')}
                      >
                        Title
                      </TableSortLabel>
                    </TableCell>

                    <TableCell className="gpu-table-cell">Store</TableCell>

                    <TableCell
                      className="gpu-table-cell"
                      sortDirection={sortField === 'price' ? sortDirection : false}
                    >
                      <TableSortLabel
                        active={sortField === 'price'}
                        direction={sortField === 'price' ? sortDirection : 'asc'}
                        onClick={() => handleSort('price')}
                      >
                        Price
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map(product => (
                    <TableRow
                      key={product.id}
                      className="gpu-table-row"
                      hover
                      sx={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
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
                        <img
                          src={getIconSrc(product.store)}
                          alt={product.store}
                          style={{ width: 100, height: 100, objectFit: 'contain' }}
                        />
                      </TableCell>
                      <TableCell className="gpu-table-cell">
                        <Typography color="primary" className="gpu-table-text">
                          <b>{product.price} ден</b>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

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

export default CoolerPage;