const express = require('express');
const router = express.Router();
const database = require('../services/database');
const aiService = require('../services/aiService');

/**
 * POST /items/lost
 * Create a new lost item with AI matching
 */
router.post('/lost', async (req, res) => {
  try {
    console.log('Received lost item request:', req.body);
    
    const {
      imageUrl,
      itemType,
      category,
      description,
      location,
      dateLost,
      contactInfo
    } = req.body;

    console.log('Extracted fields:', { itemType, category, description, location, dateLost });

    if (!itemType || !description || !location || !dateLost) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({ 
        error: 'Missing required fields: itemType, description, location, dateLost' 
      });
    }

    // First, save to database
    const itemData = {
      itemType,
      description,
      location,
      dateLost: new Date(dateLost),
      contactInfo: contactInfo || '',
      imageUrl: imageUrl || '',
      reportType: 'lost',
      status: 'active'
    };

    const savedItem = await database.insertItem(itemData);

    // Then, send to AI service for embedding and matching
    try {
      const aiResponse = await aiService.reportItem({
        imageUrl: imageUrl || '',
        description,
        location,
        category: itemType,
        reportType: 'lost'
      });

      // Update item with AI-generated ID and matches
      await database.updateItem(savedItem._id, {
        itemId: aiResponse.item_id,
        matches: aiResponse.matches || []
      });

      res.status(201).json({ 
        message: 'Lost item created successfully',
        item: {
          ...savedItem,
          itemId: aiResponse.item_id,
          matches: aiResponse.matches || []
        }
      });

    } catch (aiError) {
      console.error('AI service error:', aiError);
      // Still save the item even if AI fails
      res.status(201).json({ 
        message: 'Lost item created successfully (AI processing pending)',
        item: savedItem
      });
    }

  } catch (error) {
    console.error('Create lost item error:', error);
    res.status(500).json({ 
      error: 'Failed to create lost item' 
    });
  }
});

/**
 * POST /items/found
 * Create a new found item with AI matching
 */
router.post('/found', async (req, res) => {
  try {
    const {
      imageUrl,
      itemType,
      description,
      location,
      dateFound,
      contactInfo
    } = req.body;

    if (!itemType || !description || !location || !dateFound) {
      return res.status(400).json({ 
        error: 'Missing required fields: itemType, description, location, dateFound' 
      });
    }

    // First, save to database
    const itemData = {
      itemType,
      description,
      location,
      dateFound: new Date(dateFound),
      contactInfo: contactInfo || '',
      imageUrl: imageUrl || '',
      reportType: 'found',
      status: 'active'
    };

    const savedItem = await database.insertItem(itemData);
    console.log('Found item saved to database:', savedItem);

    // Then, send to AI service for embedding and storage
    try {
      const aiResponse = await aiService.reportItem({
        imageUrl: imageUrl || '',
        description,
        location,
        category: itemType,
        reportType: 'found'
      });

      // Update item with AI-generated ID (no matches for found items)
      await database.updateItem(savedItem._id, {
        itemId: aiResponse.item_id
      });

      res.status(201).json({ 
        message: 'Found item reported successfully',
        item: {
          ...savedItem,
          itemId: aiResponse.item_id
        }
      });

    } catch (aiError) {
      console.error('AI service error:', aiError);
      // Still save the item even if AI fails
      res.status(201).json({ 
        message: 'Found item reported successfully (AI processing pending)',
        item: savedItem
      });
    }

  } catch (error) {
    console.error('Create found item error:', error);
    res.status(500).json({ 
      error: 'Failed to create found item' 
    });
  }
});

/**
 * GET /items/discover
 * Get all lost and found items
 */
router.get('/discover', async (req, res) => {
  try {
    const items = await database.getAllItems();
    
    res.json({
      items: items,
      total: items.length
    });

  } catch (error) {
    console.error('Discover items error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch items' 
    });
  }
});

/**
 * GET /items/lost
 * Get all lost items
 */
router.get('/lost', async (req, res) => {
  try {
    const items = await database.getItemsByType('lost');
    
    res.json({
      items: items,
      total: items.length
    });

  } catch (error) {
    console.error('Get lost items error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch lost items' 
    });
  }
});

/**
 * GET /items/found
 * Get all found items
 */
router.get('/found', async (req, res) => {
  try {
    const items = await database.getItemsByType('found');
    
    res.json({
      items: items,
      total: items.length
    });

  } catch (error) {
    console.error('Get found items error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch found items' 
    });
  }
});

module.exports = router;
