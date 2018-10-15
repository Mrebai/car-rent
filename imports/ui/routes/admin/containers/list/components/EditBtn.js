import React from 'react';
import { Link } from 'react-router-dom';

export default EditBtn = ({ id, name }) => (
  <td>
    <Link to={`/admin/${name}/update/${id}`}>
      <i className="fas fa-edit" />
    </Link>
  </td>
);
