import React from 'react';
import PropTypes from 'prop-types';
import VerticalMenu from '../../../coreUi/VerticalMenu';

const TextField = ({ source, data }) => (
  <th>{data}</th>
);


TextField.propTypes = {
  source: PropTypes.string.isRequired,
  data: PropTypes.string,
};

TextField.defaultProps = {
  data: "undefined",

};

export default TextField;
