class Pagination {
  constructor({ pageNumber, pageSize }) {
    if (pageNumber === '0' || !pageNumber || isNaN(pageNumber))
      throw new Error('Invalid pageNumber.')
    if (!pageSize || isNaN(pageSize))
      throw new Error('Invalid pageSize');
    this.pageNumber = parseInt(pageNumber);
    this.pageSize = parseInt(pageSize);
  }

  getLimit() {
    return this.pageSize;
  }

  getOffset() {
    return (this.pageNumber - 1) * this.pageSize;
  }

  getNoOfPages(totalRecords) {
    if (!totalRecords) {
      return 0;
    }
    return Math.ceil(totalRecords / this.getLimit());
  }
}

module.exports = Pagination;