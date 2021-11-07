/* eslint-disable max-lines-per-function */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPen } from '@fortawesome/free-solid-svg-icons';
import '../styles/table.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div className="table-container ml-12">
        <table className="px-2 py-1">
          <thead>
            <tr className="bg-gray-50 text-gray-800 rounded">
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {/* const ask = Number(exchangeRates[currency].ask) */}
            { expenses.map(({ id, description, tag, method,
              value, currency, exchangeRates }) => (
              <tr
                key={ id }
                className="bg-gray-50 text-gray-800 rounded"
              >
                  <td>{description}</td>
                  <td>{tag }</td>
                  <td>{method}</td>
                  <td>{value}</td>
                  <td>{currency}</td>
                  <td>{exchangeRates[currency].name}</td>
                  <td>{(value * (exchangeRates[currency].ask)).toFixed(2)}</td>
                  <td>
                    <button type="button" className="text-gray-50">
                      <FontAwesomeIcon
                      icon={ faPen }
                      className="px-1 py-1 mr-3 bg-yellow-600 rounded
                      hover:bg-yellow-500 transition duration-300"
                      />
                    </button>
                    <button type="button" className="text-gray-50">
                      <FontAwesomeIcon
                        icon={ faMinus }
                        className="px-1 py-1 ml-3 bg-red-600 rounded
                        hover:bg-red-500 transition duration-300"
                      />
                    </button>
                  </td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapDispatchToProps)(Table);
