import Layout from "../../components/layout/Layout";
import NewAdvertForm from "./components/NewAdvertForm";

function NewAdvertPage({ ...props }) {
  return (
    <Layout title="Create your advert" {...props}>
      <NewAdvertForm />
    </Layout>
  );
}
export default NewAdvertPage;
