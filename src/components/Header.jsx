import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import logo from '../images/toninvest.png';

export default class Header extends Component {
  render() {
    const { userEmail, expenses } = this.props;
    return (
      <header
        className="w-full h-20 flex justify-between bg-gradient-to-r
        from-blue-500 to-blue-600 px-4 py-4 text-gray-50 items-center header"
      >
        <div className="w-1/6 h/full">
          <Link to="/trybewallet">
            <img src={ logo } alt="toninvest" />
          </Link>
        </div>
        <div className="text-center">
          <span data-testid="email-field" className="block">{ userEmail }</span>
          <span data-testid="total-field" className="font-semibold">
            { expenses.reduce((acc, curr) => {
              acc += (curr.exchangeRates[curr.currency].ask * curr.value);
              return acc;
            }, 0).toFixed([2]) }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  expenses: PropTypes.shape({
    reduce: PropTypes.func,
  }).isRequired,
  userEmail: PropTypes.string.isRequired,
};
