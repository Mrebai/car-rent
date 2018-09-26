import gql from 'graphql-tag';

export default (items, source) => {
  const queryName = `all${source}s`;
  const queryItems = items.join(' ');
  if (items && items.lengt > 0 && source) {
    return (gql` query ${queryName}{
        ${queryName}{
            ${queryItems} 
        }
    }`);
  }
};
