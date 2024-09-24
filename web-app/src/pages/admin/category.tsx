import CategoryTable from "@/components/Admin/Category/CategoryTable";
import Layout from "@/components/Admin/Layout";
import { Link } from "@mui/material";

export default function Category() {
  return (
    <Layout>
      <h1>Gestion des catégories</h1>
      <Link href="/admin/category/new">Nouvelle Catégorie</Link>
      <CategoryTable />
    </Layout>
  );
}
