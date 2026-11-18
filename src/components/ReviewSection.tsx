import { Review } from "@/features/products/product.types";

export default function ReviewSection({ review }: { review: Review[] }) {
  return (
    <ul className="relative">
      {review.length > 0 ? (
        review.map((review) => (
          <li key={review.id} className="mb-3 border-t border-accent p-4">
            <h3 className="text-lg font-bold">{review.username}</h3>
            <p className="absolute top-4 right-4">
              <strong>Rating:</strong> {review.rating}/5★
            </p>
            <p>{review.description}</p>
          </li>
        ))
      ) : (
        <li>No reviews yet.</li>
      )}
    </ul>
  );
}
