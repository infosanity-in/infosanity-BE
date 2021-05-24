/* 
  Todo
  
  tags listing
  default sort - rank desc

  - searchQuery
  - pagination(bool) = false
  - pageSize
  - pageNumber
*/

import { Router } from 'express';
const {
  getAllTags,
  getTagInfo,
  createTag,
  updateTag,
  deleteTag,
} = require('../controllers/tags/tags.controller');

const router = Router();

/**
 * GET / - Get all the tags
 */
router.get('/', getAllTags);

/**
 * POST / - Create a new tag
 */
router.post('/', createTag);

/**
 * Get /:id - Get Infor regarding a speicific tag
 */
router.get('/:id', getTagInfo);

/**
 * PUT /:id - Update the existing tag
 */
router.put('/:id', updateTag);

/**
 * DELETE /:id - Delete a tag
 */
router.delete('/:id', deleteTag);
