import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    retailer: '',
    brand: '',
    model: '',
    productName: '',
    productDescription: '',
    price: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      const product = response.data;
      setFormData({
        retailer: product.retailer || '',
        brand: product.brand || '',
        model: product.model || '',
        productName: product.productName || product.product_name || '',
        productDescription: product.productDescription || product.product_description || '',
        price: product.price || ''
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch product');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.productName.trim()) {
      errors.productName = 'Product name is required';
    }
    if (!formData.brand.trim()) {
      errors.brand = 'Brand is required';
    }
    if (!formData.model.trim()) {
      errors.model = 'Model is required';
    }
    if (!formData.retailer.trim()) {
      errors.retailer = 'Retailer is required';
    }
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      errors.price = 'Valid price is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      // Convert camelCase to snake_case to match backend expectations
      const productData = {
        product_name: formData.productName,
        product_description: formData.productDescription,
        retailer: formData.retailer,
        brand: formData.brand,
        model: formData.model,
        price: parseFloat(formData.price)
      };

      if (isEditing) {
        const response = await axios.put(`${API_BASE_URL}/products/${id}`, productData);
      } else {
        const response = await axios.post(`${API_BASE_URL}/products`, productData);
      }
      
      navigate('/');
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      setError('Failed to save product');
      console.error('Error saving product:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
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
        <Typography variant="h4" component="h1">
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Name *"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  error={!!validationErrors.productName}
                  helperText={validationErrors.productName}
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Brand *"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  error={!!validationErrors.brand}
                  helperText={validationErrors.brand}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Model *"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  error={!!validationErrors.model}
                  helperText={validationErrors.model}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Retailer *"
                  name="retailer"
                  value={formData.retailer}
                  onChange={handleChange}
                  error={!!validationErrors.retailer}
                  helperText={validationErrors.retailer}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price *"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  error={!!validationErrors.price}
                  helperText={validationErrors.price}
                  inputProps={{ min: 0, step: 0.01 }}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Description"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProductForm; 