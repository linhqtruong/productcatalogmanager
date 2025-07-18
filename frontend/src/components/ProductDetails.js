import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      setProduct(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch product details');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Alert severity="error">
        {error || 'Product not found'}
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          Back to Products
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/edit/${product.productKey || product.product_key}`)}
        >
          Edit Product
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.productName || product.product_name}
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Product Information
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="textSecondary">
                  Brand
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {product.brand}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="textSecondary">
                  Model
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {product.model}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="textSecondary">
                  Retailer
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {product.retailer}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" color="textSecondary">
                  Price
                </Typography>
                <Chip 
                  label={`$${product.price}`} 
                  color="primary" 
                  variant="outlined"
                  sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {product.productDescription || product.product_description || 'No description available.'}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="caption" color="textSecondary">
              Product ID: {product.productKey || product.product_key}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProductDetails; 