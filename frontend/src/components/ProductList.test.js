import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductList from './ProductList';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Mock Material-UI icons
jest.mock('@mui/icons-material', () => ({
  Add: () => 'AddIcon',
  Visibility: () => 'ViewIcon',
  Edit: () => 'EditIcon',
  Delete: () => 'DeleteIcon',
}));

const mockProducts = [
  {
    product_key: 1,
    product_name: 'Test Product 1',
    brand: 'Test Brand',
    model: 'T-1000',
    price: 99.99,
    retailer: 'Test Retailer',
    product_description: 'A test product'
  },
  {
    product_key: 2,
    product_name: 'Test Product 2',
    brand: 'Another Brand',
    model: 'T-2000',
    price: 149.99,
    retailer: 'Another Retailer',
    product_description: 'Another test product'
  }
];

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('ProductList', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  test('renders loading state initially', () => {
    axios.get.mockImplementation(() => new Promise(() => {})); // Never resolves
    renderWithRouter(<ProductList />);
    
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  test('renders products after successful API call', async () => {
    axios.get.mockResolvedValue({ data: mockProducts });
    
    renderWithRouter(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
      expect(screen.getByText('Test Brand')).toBeInTheDocument();
      expect(screen.getByText('$99.99')).toBeInTheDocument();
    });
  });

  test('filters products based on search term', async () => {
    axios.get.mockResolvedValue({ data: mockProducts });
    
    renderWithRouter(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    const searchInput = screen.getByLabelText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'Another' } });

    expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  test('shows error message when API call fails', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));
    
    renderWithRouter(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch products')).toBeInTheDocument();
    });
  });

  test('renders Add Product button', async () => {
    axios.get.mockResolvedValue({ data: mockProducts });
    
    renderWithRouter(<ProductList />);
    
    await waitFor(() => {
      expect(screen.getByText('Add Product')).toBeInTheDocument();
    });
  });
}); 