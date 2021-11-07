/* eslint-disable max-lines-per-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, sendExpensesInfo } from '../actions';
import Input from '../components/Input';
import Select from '../components/Select';
import { payMethods, tags } from '../helpers';
import getCurrencyInfo from '../services/currencyAPI';
import Header from '../components/Header';
import '../styles/wallet.css';
import Table from '../components/Table';

class Wallet extends Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { fetchCurrenciesToProps } = this.props;
    fetchCurrenciesToProps();
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async handleButtonClick() {
    const { expenses, sendExpensesToProps } = this.props;
    const response = await getCurrencyInfo();
    sendExpensesToProps({ id: expenses.length, ...this.state, exchangeRates: response });
  }

  render() {
    const { props: { userEmail, walletCurrencies, expenses }, state: {
      value, description, currency, method, tag },
    handleInputChange, handleButtonClick } = this;
    return (
      <section
        className="w-full h-full bg-gray-800 wallet"
      >
        <Header userEmail={ userEmail } expenses={ expenses } />
        <div className="flex w-full h-5/6">
          <form
            className="w-80 h-full flex flex-col justify-around
            items-center px-4 py-4 bg-gray-50 rounded wallet-form"
          >
            <h3 className="text-xl">Insira sua despesa</h3>
            <Input
              type="text"
              name="value"
              value={ value }
              onChange={ handleInputChange }
            />
            <Input
              type="text"
              name="description"
              value={ description }
              onChange={ handleInputChange }
            />
            <Select
              name="currency"
              value={ currency }
              options={ walletCurrencies.filter((optCurrency) => optCurrency !== 'USDT') }
              onChange={ handleInputChange }
            />
            <Select
              name="method"
              value={ method }
              options={ payMethods }
              onChange={ handleInputChange }
            />
            <Select
              name="tag"
              value={ tag }
              options={ tags }
              onChange={ handleInputChange }
            />
            <button
              name="adicionar despesa"
              type="button"
              onClick={ handleButtonClick }
              className="px-4 py-2 bg-gray-700 text-gray-50 rounded
              hover:bg-gray-800 transition duration-300"
            >
              Adicionar despesa
            </button>
          </form>
          <Table />
        </div>
      </section>
    );
  }
}

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchCurrenciesToProps: PropTypes.func.isRequired,
  sendExpensesToProps: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
  walletCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  walletCurrencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesToProps: () => dispatch(fetchCurrencies()),
  sendExpensesToProps: (expenses) => dispatch(sendExpensesInfo(expenses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
