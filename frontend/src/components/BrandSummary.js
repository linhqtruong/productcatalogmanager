import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Alert,
  TextField,
} from '@mui/material';
import { 
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon
} from '@mui/icons-material';
import { apiService, handleApiError } from '../services/apiService';
import LoadingSpinner from './LoadingSpinner';

function BrandSummary() {
  const [brandSummary, setBrandSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortField, setSortField] = useState('brand');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBrandSummary();
  }, []);

  const fetchBrandSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getBrandSummary();
      setBrandSummary(response);
    } catch (err) {
      const errorResult = handleApiError(err, 'Failed to fetch brand summary');
      setError(errorResult.message);
    } finally {
      setLoading(false);
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

  const sortedBrandSummary = [...brandSummary].sort((a, b) => {
    const aValue = sortField === 'brand' ? (a.brand || '').toLowerCase() : (a.count || 0);
    const bValue = sortField === 'brand' ? (b.brand || '').toLowerCase() : (b.count || 0);
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
  });

  const filteredBrandSummary = sortedBrandSummary.filter(brand =>
    (brand.brand || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Brand Summary
        </Typography>

        <TextField
          fullWidth
          label="Search brand..."
          variant="outlined"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ mb: 3 }}
        />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#bbdefb' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Brand</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#1976d2' }}>Product Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <LoadingSpinner 
                type="skeleton" 
                skeletonRows={10} 
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
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Brand Summary
      </Typography>

      <TextField
        fullWidth
        label="Search brand..."
        variant="outlined"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#bbdefb' }}>
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
                onClick={() => handleSort('count')}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  Product Count
                  {sortField === 'count' && (
                    sortDirection === 'asc' ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBrandSummary.map((brand, index) => (
              <TableRow key={index}>
                <TableCell>{brand.brand || 'Unknown'}</TableCell>
                <TableCell>{brand.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredBrandSummary.length === 0 && !error && (
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
          No brand data available
        </Typography>
      )}
    </Box>
  );
}

export default BrandSummary; 