const {
  CONTENT
} = require('../../utils/constants');

const generateFindQuery = params => {
  const {
    searchQuery,
    filterType,
    filterValue,
  } = params;
  const findQuery = {};
  if (searchQuery) {
    findQuery.title = new RegExp(searchQuery, 'i');
  }

  if (filterType && filterValue) {
    const filterValues = filterValue.split(',');
    let filterField = filterType;
    if (filterType === CONTENT.FILTER_TYPES.CREATED_BY) {
      filterField = 'acl.createdBy.id';
    } else if (filterType === CONTENT.FILTER_TYPES.TAGS) {
      filterField = 'tags.id';
    }
    findQuery[filterField] = {
      $in: filterValues
    };
  }

  return findQuery;
}

module.exports = {
  generateFindQuery,
};