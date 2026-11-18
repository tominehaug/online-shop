import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";

export default function ProductDetailsLoading() {
  return (
    <main className="flex-1 text-2xl grid place-content-center justify-items-center gap-3">
      <FontAwesomeIcon icon={faCircleNotch} className="animate-spin" />
      <p>Loading product details...</p>
    </main>
  );
}
