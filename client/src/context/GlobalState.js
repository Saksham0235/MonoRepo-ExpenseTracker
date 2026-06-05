import React, { createContext, useReducer, useCallback } from 'react';
import appReducer from './AppReducer';
import { addExpense, deleteExpense, getExpenses, updateExpense } from '../services/expenseService';

const initialState = {
  transactions: [],
  error: null,
  loading: true,
  notification: null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getTransactions = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await getExpenses();
      dispatch({ type: 'GET_TRANSACTIONS', payload: data });
    } catch (e) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: e.message });
    }
  }, []);

  const addTransaction = async (transaction) => {
    try {
      const data = await addExpense(transaction);
      dispatch({ type: 'ADD_TRANSACTION', payload: data });
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: 'Expense added!', type: 'success' } });
    } catch (e) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: e.message });
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: 'Failed to add expense.', type: 'error' } });
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await deleteExpense(id);
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: 'Expense deleted.', type: 'success' } });
    } catch (e) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: e.message });
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: 'Failed to delete expense.', type: 'error' } });
    }
  };

  const updateTransaction = async (id, updatedData) => {
    try {
      const updated = await updateExpense(id, updatedData);
      dispatch({ type: 'UPDATE_TRANSACTION', payload: { id, data: updated } });
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: 'Expense updated!', type: 'success' } });
    } catch (e) {
      dispatch({ type: 'TRANSACTION_ERROR', payload: e.message });
      dispatch({ type: 'SET_NOTIFICATION', payload: { message: 'Failed to update expense.', type: 'error' } });
    }
  };

  const clearNotification = useCallback(() => {
    dispatch({ type: 'SET_NOTIFICATION', payload: null });
  }, []);

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      error: state.error,
      loading: state.loading,
      notification: state.notification,
      getTransactions,
      addTransaction,
      deleteTransaction,
      updateTransaction,
      clearNotification,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
