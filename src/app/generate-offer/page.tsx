import { GenerateOfferForm } from "../components/GenerateOfferForm";
import { PageWrapper } from "../components/PageWrapper";
import { getCandidateCategories } from "../services/getCategoriesAndSubcategories";
import { getSalaryRange } from "../services/getSalaryRange";

export default async function GenerateOffer() {
  // Al generar oferta la descripción la pueda editar,
  // si la edita sugerir si lo que se ha añadido se puede mejorar o no
  // si la oferta es sobre programación que haga petición a sueldos.dev y opine sobre el salario
  //  si debería subir o no.

  // Añadir get de categoría y subcategoría

  const categories = await getCandidateCategories();
  const salaryRange = await getSalaryRange();

  return (
    <PageWrapper>
      <GenerateOfferForm categories={categories} salaryRange={salaryRange} />
    </PageWrapper>
  );
}
