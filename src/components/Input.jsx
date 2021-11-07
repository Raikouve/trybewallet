import React, { Component } from 'react';
import PropTypes from 'prop-types';
import labelTranslate from '../helpers/translate';

export default class Input extends Component {
  render() {
    const { name, type, value, onChange } = this.props;
    return (
      <label htmlFor={ name }>
        { labelTranslate(name) }
        <input
          className="px-1 py-1 border-2 border-gray-100 focus:border-blue-600
          focus:border-opacity-50 rounded transition duration-300"
          type={ type }
          name={ name }
          id={ name }
          value={ value }
          onChange={ onChange }
        />
      </label>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
