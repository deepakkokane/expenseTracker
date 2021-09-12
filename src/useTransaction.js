import { useContext } from "react";
import { ExpencetrackerContext } from "./context/context";
import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from "./constants/categories";

const useTransaction = (title) => {
  resetCategories();

  const { transactions } = useContext(ExpencetrackerContext);

  const transactionPertype = transactions.filter((t) => t.type == title);

  const total = transactionPertype.reduce(
    (acc, currVal) => (acc += currVal.amount),
    0
  );

  const categories = title === "Income" ? incomeCategories : expenseCategories;

  transactionPertype.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);

    if (category) category.amount += t.amount;
  });

  const filteredCategories = categories.filter((c) => c.amount > 0);

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
    labels: filteredCategories.map((c) => c.type),
  };

  return {
    total,
    chartData,
  };
};

export default useTransaction;
