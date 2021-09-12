import React, { useReducer, createContext } from "react";
import contextReducer from "./contextReducer";
const initialState = JSON.parse(localStorage.getItem("transactions")) || [
  {
    amount: 33,
    category: "Extra income",
    type: "Income",
    date: "2021-09-18",
    id: "c7366a22-c38f-485f-a585-aedc9d6d674a",
  },
  {
    amount: 150,
    category: "Travel",
    date: "2021-09-14",
    id: "c2fdad7f-7ba7-42ed-9556-a5b2c0fdac40",
    type: "Expense",
  },
];

export const ExpencetrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransaction = (id) =>
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  const addTransaction = (transaction) =>
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });

  let balance = transactions.reduce((acc, currVal) => {
    return currVal.type === "Expense"
      ? acc - currVal.amount
      : acc + currVal.amount;
  }, 0);

  return (
    <ExpencetrackerContext.Provider
      value={{ deleteTransaction, addTransaction, transactions, balance }}
    >
      {children}
    </ExpencetrackerContext.Provider>
  );
};
