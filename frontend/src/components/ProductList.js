import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Visibility as ViewIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon
} from '@mui/icons-material';
import { apiService, handleApiError } from '../services/apiService';
import config from '../config/config';
import LoadingSpinner from './LoadingSpinner';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [sortField, setSortField] = useState(config.DEFAULT_SORT_FIELD);
  const [sortDirection, setSortDirection] = useState(config.DEFAULT_SORT_DIRECTION);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(config.DEFAULT_PAGE_SIZE);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const navigate = useNavigate();
  const searchTimeout = useRef();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [page, pageSize]);

  useEffect(() => {
    // Debounce search
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setPage(1);
      fetchProducts(1, pageSize, searchTerm);
    }, config.SEARCH_DEBOUNCE_MS);
    // eslint-disable-next-line
  }, [searchTerm]);

  const fetchProducts = async (customPage, customPageSize, customSearch) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: (customPage || page) - 1,
        size: customPageSize || pageSize,
        search: customSearch !== undefined ? customSearch : searchTerm,
      };

      const response = await apiService.getProducts(params);
      setProducts(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (err) {
      const errorResult = handleApiError(err, 'Failed to fetch products');
      setError(errorResult.message);
      showSnackbar(errorResult.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      const productKey = productToDelete.productKey || productToDelete.product_key;
      await apiService.deleteProduct(productKey);
      
      // Remove from local state
      setProducts(products.filter(p => (p.productKey || p.product_key) !== productKey));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      showSnackbar('Product deleted successfully', 'success');
      
      // Refresh data if current page is empty
      if (products.length === 1 && page > 1) {
        setPage(page - 1);
      }
    } catch (err) {
      const errorResult = handleApiError(err, 'Failed to delete product');
      setError(errorResult.message);
      showSnackbar(errorResult.message, 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getFieldValue = (product, field) => {
    switch (field) {
      case 'productKey':
        return product.productKey || product.product_key || '';
      case 'productName':
        return product.productName || product.product_name || '';
      case 'retailer':
        return product.retailer || '';
      case 'brand':
        return product.brand || '';
      case 'model':
        return product.model || '';
      case 'price':
        return parseFloat(product.price) || 0;
      default:
        return '';
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Products
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/add')}
          >
            Add Product
          </Button>
        </Box>

        <TextField
          fullWidth
          label="Search products..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
          helperText={`Search by product name, brand, or model (${config.MIN_SEARCH_LENGTH}-${config.MAX_SEARCH_LENGTH} characters)`}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="page-size-label">Rows per page</InputLabel>
            <Select
              labelId="page-size-label"
              id="page-size-select"
              value={pageSize}
              label="Rows per page"
              onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
            >
              {config.PAGE_SIZE_OPTIONS.map(size => (
                <MenuItem key={size} value={size}>{size}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            showFirstButton
            showLastButton
          />
          <Typography variant="body2">
            {`Total: ${totalElements} products`}
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#bbdefb' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Product Key</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Retailer</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Brand</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Model</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <LoadingSpinner 
                type="skeleton" 
                skeletonRows={pageSize} 
                skeletonHeight={53}
                message=""
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/add')}
        >
          Add Product
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Search products..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        helperText={`Search by product name, brand, or model (${config.MIN_SEARCH_LENGTH}-${config.MAX_SEARCH_LENGTH} characters)`}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="page-size-label">Rows per page</InputLabel>
          <Select
            labelId="page-size-label"
            id="page-size-select"
            value={pageSize}
            label="Rows per page"
            onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
          >
            {config.PAGE_SIZE_OPTIONS.map(size => (
              <MenuItem key={size} value={size}>{size}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          showFirstButton
          showLastButton
        />
        <Typography variant="body2">
          {`Total: ${totalElements} products`}
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#bbdefb' }}>
              <TableCell 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#1976d2',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#90caf9' },
                  whiteSpace: 'nowrap'
                }}
                onClick={() => handleSort('productKey')}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Product Key
                  {sortField === 'productKey' && (
                    sortDirection === 'asc' ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#1976d2',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#90caf9' }
                }}
                onClick={() => handleSort('productName')}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Product Name
                  {sortField === 'productName' && (
                    sortDirection === 'asc' ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#1976d2',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#90caf9' }
                }}
                onClick={() => handleSort('retailer')}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Retailer
                  {sortField === 'retailer' && (
                    sortDirection === 'asc' ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#1976d2',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#90caf9' }
                }}
                onClick={() => handleSort('brand')}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Brand
                  {sortField === 'brand' && (
                    sortDirection === 'asc' ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#1976d2',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#90caf9' }
                }}
                onClick={() => handleSort('model')}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Model
                  {sortField === 'model' && (
                    sortDirection === 'asc' ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#1976d2',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#90caf9' }
                }}
                onClick={() => handleSort('price')}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Price
                  {sortField === 'price' && (
                    sortDirection === 'asc' ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.productKey || product.product_key}>
                <TableCell>{product.productKey || product.product_key}</TableCell>
                <TableCell>{product.productName || product.product_name}</TableCell>
                <TableCell>{product.retailer}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.model}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', minWidth: '120px' }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() => navigate(`/product/${product.productKey || product.product_key}`)}
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      size="small"
                      onClick={() => navigate(`/edit/${product.productKey || product.product_key}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDelete(product)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete "{productToDelete?.productName || productToDelete?.product_name}"?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleteLoading}>
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            color="error" 
            variant="contained"
            disabled={deleteLoading}
          >
            {deleteLoading ? <CircularProgress size={20} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={config.ERROR_AUTO_HIDE_MS}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProductList; 