import { useState, useEffect } from "react";

import { CategoryPieChart } from "./components/categoryPieChart";




function App() {
  
  // Get stored data on start
const [transactions, setTransactions] = useState<{ desc: string; amount: number; category: string }[]>(() => {

  const saved = localStorage.getItem("transactions");
  return saved ? JSON.parse(saved) : [];
});

const [theme, setTheme] = useState("light");

const toggleTheme = () => {
  setTheme(prev => (prev === "light" ? "dark" : "light"));
};


// Save to localStorage whenever transactions change
useEffect(() => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}, [transactions]);


  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
 


  const [category, setCategory] = useState("Other");


  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  // Calculate total per category
const categoryTotals: Record<string, number> = {};

transactions.forEach((t) => {
  if (!categoryTotals[t.category]) {
    categoryTotals[t.category] = 0;
  }
  categoryTotals[t.category] += t.amount;
});

const pieData = Object.keys(categoryTotals).map(category => ({
  category,
  amount: categoryTotals[category]
}));


  const deleteTransaction = (index: number) => {
  setTransactions(transactions.filter((_, i) => i !== index));
};

  const addTransaction = () => {
    if (desc.trim() === "" || amount.trim() === "") return;

  


    setTransactions([
  ...transactions,
  { desc, amount: Number(amount), category }
]);


    setDesc("");
    setAmount("");
  };

  return (
   <div
  style={{
    padding: "20px",
    fontFamily: "Arial",
    backgroundColor: theme === "light" ? "#f5f5f5" : "#121212",
    color: theme === "light" ? "#222" : "#eee",
    minHeight: "100vh",
    transition: "0.3s",
    width: "100vw",
    justifyContent: "center",
     
    
  }}
>
  

      <h2>Finance Tracker</h2>
      <button
  onClick={toggleTheme}
  style={{
    padding: "8px",
    marginBottom: "15px",
    cursor: "pointer"
  }}
>
  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
</button>

      <h3 style={{ color: total >= 0 ? "green" : "red" }}>
       Balance: ${total}
      </h3>


      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        style={{
  padding: "8px",
  marginRight: "8px",
  backgroundColor: theme === "light" ? "#222" : "#ddd",
  color: theme === "light" ? "#fff" : "#000",
  border: "none",
  cursor: "pointer"
}}

      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
  padding: "8px",
  marginRight: "8px",
  backgroundColor: theme === "light" ? "#fff" : "#1f1f1f",
  color: theme === "light" ? "#000" : "#fff",
  border: "1px solid #777"
}}

      />

      <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  style={{ padding: "8px", marginRight: "8px" }}
>
  <option value="Income">Income</option>
  <option value="Food">Food</option>
  <option value="Transport">Transport</option>
  <option value="Rent">Rent</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Other">Other</option>
</select>


      <button onClick={addTransaction} style={{ padding: "8px" }}>
        Add
      </button>

      <div style={{ marginTop: "20px" }}>
  <h3>Spending Breakdown</h3>
  <CategoryPieChart data={pieData} />
</div>


      <ul>
        {transactions.map((t, i) => (
          <li key={i} style={{ color: t.amount >= 0 ? "green" : "red" }}>
  {t.desc} ({t.category}): ${t.amount}

  <button 
    onClick={() => deleteTransaction(i)} 
    style={{ marginLeft: "10px" }}
  >
    ❌
  </button>
</li>

        ))}
      </ul>
    </div>
  );
}

export default App;
