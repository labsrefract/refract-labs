import { Navigate } from "react-router";
import { categoryPath, serviceCategories } from "../content/services";

const first = serviceCategories[0];

export default function ServicesIndex() {
  return <Navigate to={first ? categoryPath(first.id) : "/"} replace />;
}
