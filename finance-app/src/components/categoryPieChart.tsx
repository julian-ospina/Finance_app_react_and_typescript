import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface CategoryData {
  category: string;
  amount: number;
}

interface Props {
  data: CategoryData[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8A2BE2", "#FF6384"];

export function CategoryPieChart({ data }: Props) {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data as any}  // ✅ Let Recharts accept our TS shape
        dataKey="amount"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {data.map((_, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
