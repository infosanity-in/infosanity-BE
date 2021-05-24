const TagModel = require('../../models/tag.model');
const { successResponse, errorResponse } = require('../../utils/response');

// Create a Tag
const createTag = async (req, res) => {
  try {
    const { name, rank } = req.body;

    const tag = new TagModel({
      name,
      rank,
    });

    tag.save();

    return successResponse({ res });
  } catch (error) {
    return errorResponse({
      res,
      error,
      responseMessage: 'Error creating new tag.',
    });
  }
};

// Update a tag
const updateTag = async (req, res) => {
  try {
    const { tagId } = req.params.id;

    const { name, rank } = req.body;

    const updatedTag = await TagModel.findByIdAndUpdate(
      tagId,
      {
        name,
        rank,
      },
      { new: true }
    );

    updatedTag.save();

    return successResponse({ res, statusCode: 201 });
  } catch (error) {
    return errorResponse({
      res,
      error,
      responseMessage: 'Error updating tag.',
    });
  }
};

//! Delete a Tag - Only Admin Access
const deleteTag = async (req, res) => {
  try {
    const tagId = req && req.params ? req.params.id : '';
    const delTag = await TagModel.findByIdAndRemove(tagId);

    delTag.save();

    return successResponse({ res });
  } catch (error) {
    return errorResponse({
      res,
      error,
      responseMessage: 'Error deleting. tag.',
    });
  }
};

// Fetch Tags
const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.find();
  } catch (error) {}
};

// Fetch info about a single tag
const getTagInfo = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = [createTag, updateTag, getAllTags, getTagInfo, deleteTag];
