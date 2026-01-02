import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Discover = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const toastShownRef = useRef(false);

  // Move all hooks before conditional returns
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    itemType: '',
    status: 'all',
    dateRange: '',
    sortBy: 'newest'
  });
  const [tempFilters, setTempFilters] = useState({ ...filters });

  useEffect(() => {
    if (!isAuthenticated && !toastShownRef.current) {
      toast.warning('Please login first to discover items');
      toastShownRef.current = true;
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      fetchItems();
    }
  }, [filters, isAuthenticated]);

  useEffect(() => {
    // Initial load
    if (isAuthenticated) {
      setLoading(true);
      fetchItems();
    }
  }, [isAuthenticated]);

  const fetchItems = async () => {
    console.log('Fetching items with filters:', filters);
    try {
      const response = await api.items.getDiscoverItems({});
      console.log('API response:', response);
      
      // Set available categories from database
      const categories = [...new Set(response.items.map(item => item.itemType))];
      setAvailableCategories(categories);
      console.log('Available categories:', categories);
      
      // Apply client-side filtering as workaround
      let filteredItems = response.items || [];
      
      // Apply status filter
      if (filters.status && filters.status !== 'all') {
        filteredItems = filteredItems.filter(item => item.reportType === filters.status);
        console.log(`Items after status filter (${filters.status}): ${filteredItems.length}`);
      }
      
      // Apply itemType filter using category field (new items) and itemType mapping (existing items)
      if (filters.itemType) {
        console.log(`Filtering by itemType: "${filters.itemType}"`);
        console.log('Available categories in database:', [...new Set(response.items.map(item => item.category).filter(Boolean))]);
        console.log('Available itemTypes in database:', [...new Set(response.items.map(item => item.itemType))]);
        
        // First, filter by category field (for properly categorized new items)
        let categoryFiltered = filteredItems.filter(item => item.category === filters.itemType);
        
        // Then, filter existing items by mapping itemType to categories
        const categoryMapping = {
          'accessories': ['bottle', 'bottles', 'watch', 'jewelry', 'belt', 'bag', 'sunglasses'],
          'books': ['pen', 'book', 'notebook', 'textbook', 'journal'],
          'documents': ['test', 'id', 'passport', 'license', 'certificate', 'paper'],
          'electronics': ['phone', 'laptop', 'tablet', 'headphones', 'charger', 'cable'],
          'clothing': ['shirt', 'pants', 'jacket', 'dress', 'shoes', 'hat'],
          'keys': ['key', 'keychain', 'car key'],
          'wallet': ['wallet', 'purse', 'money', 'card'],
          'other': ['condom'] // items that don't fit other categories
        };
        
        const keywords = categoryMapping[filters.itemType] || [];
        let itemTypeFiltered = filteredItems.filter(item => 
          !item.category && keywords.some(keyword => item.itemType.toLowerCase().includes(keyword))
        );
        
        // Combine both results
        filteredItems = [...categoryFiltered, ...itemTypeFiltered];
        
        console.log(`Items after category filter (${filters.itemType}): ${categoryFiltered.length}`);
        console.log(`Items after itemType mapping filter (${filters.itemType}): ${itemTypeFiltered.length}`);
        console.log(`Total items after itemType filter (${filters.itemType}): ${filteredItems.length}`);
      }
      
      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredItems = filteredItems.filter(item => 
          item.itemType?.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.location?.toLowerCase().includes(searchLower)
        );
        console.log(`Items after search filter (${filters.search}): ${filteredItems.length}`);
      }
      
      // Apply date range filter
      if (filters.dateRange) {
        const now = new Date();
        const cutoffDate = new Date();
        
        switch (filters.dateRange) {
          case 'today':
            cutoffDate.setHours(0, 0, 0, 0);
            break;
          case 'week':
            cutoffDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            cutoffDate.setMonth(now.getMonth() - 1);
            break;
          case 'three-months':
            cutoffDate.setMonth(now.getMonth() - 3);
            break;
          default:
            break;
        }
        
        filteredItems = filteredItems.filter(item => {
          const itemDate = new Date(item.createdAt);
          return itemDate >= cutoffDate;
        });
        console.log(`Items after dateRange filter (${filters.dateRange}): ${filteredItems.length}`);
      }
      
      // Apply sorting
      filteredItems.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        
        switch (filters.sortBy) {
          case 'oldest':
            return dateA - dateB;
          case 'newest':
          default:
            return dateB - dateA;
        }
      });
      
      setItems(filteredItems);
      console.log('Final filtered items:', filteredItems.length);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setTempFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setTempFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const applyFilters = () => {
    console.log('Apply Filters clicked');
    console.log('Temp filters:', tempFilters);
    console.log('Current filters:', filters);
    
    setFilters({ ...tempFilters });
    console.log('Filters updated to:', tempFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      search: '',
      itemType: '',
      status: 'all',
      dateRange: '',
      sortBy: 'newest'
    };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
  };

  // Early return after all hooks
  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Discover Items</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse through lost and found items. Use filters to narrow down your search and find what you're looking for.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <input
                type="text"
                id="search"
                name="search"
                value={tempFilters.search}
                onChange={handleSearchChange}
                placeholder="Search items..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                id="category"
                name="itemType"
                value={tempFilters.itemType}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="books">Books</option>
                <option value="documents">Documents</option>
                <option value="keys">Keys</option>
                <option value="wallet">Wallet/Purse</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={tempFilters.status}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Items</option>
                <option value="lost">Lost Items</option>
                <option value="found">Found Items</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <select
                id="dateRange"
                name="dateRange"
                value={tempFilters.dateRange}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Any Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="three-months">Last 3 Months</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Showing <span className="font-medium">{items.length}</span> items
            </p>
            <div className="flex gap-2">
              <select
                name="sortBy"
                value={tempFilters.sortBy}
                onChange={handleFilterChange}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="relevance">Most Relevant</option>
              </select>
              <button 
                onClick={resetFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Reset
              </button>
              <button 
                onClick={applyFilters}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading items...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item._id || item.id} className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.reportType === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.reportType === 'lost' ? 'Lost' : 'Found'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {item.itemType}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {item.description}
                  </p>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <p className="flex items-center mb-1">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {item.location}
                    </p>
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {new Date(item.dateLost || item.dateFound || item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
            
            {items.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300">No items found matching your criteria.</p>
              </div>
            )}
          </>
        )}
        
        <div className="mt-12 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
              Previous
            </button>
            <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg">
              1
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
              2
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
              3
            </button>
            <button className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600">
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Discover;
