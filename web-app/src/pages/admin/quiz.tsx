import Layout from "@/components/Admin/Layout";
import QuizTable from "@/components/Admin/QuizTable";
import { Link } from "@mui/material";

export default function Quiz() {
  return (
    <Layout>
      <h1>Gestion des quiz</h1>
      <Link href="/admin/quiz/new">Nouveau Quiz</Link>
      <QuizTable />
    </Layout>
  );
}
