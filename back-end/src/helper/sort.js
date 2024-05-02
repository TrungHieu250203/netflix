module.exports = (query) => {
    const sort = {};
    if(query.sortKey && query.sortValue) {
      sort[query.sortKey] = query.sortValue;
    }
    return sort;
}