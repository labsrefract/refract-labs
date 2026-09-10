import { Navigate, useParams } from "react-router";
import ServiceCategoryLayout from "../components/ServiceCategoryLayout";
import { getLegacyServiceRedirect, getServiceCategory } from "../content/services";
import { usePageMeta } from "../hooks/usePageMeta";
import NotFound from "./NotFound";

export default function ServiceCategory() {
  const { slug } = useParams();
  const legacy = getLegacyServiceRedirect(slug);
  const category = getServiceCategory(slug);

  usePageMeta(
    category ? `${category.title} Services | Refract Labs` : "Page not found — Refract Labs",
    category?.metaDescription ?? "That page does not exist. Head back to Refract Labs to keep going.",
    category ? `/services/${category.id}` : "/404",
  );

  if (legacy) return <Navigate to={legacy} replace />;
  if (!category) return <NotFound />;

  return <ServiceCategoryLayout category={category} />;
}
