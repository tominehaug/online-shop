import { Review } from "@/features/products/product.types";

export default function ReviewSection({ review }: { review: Review[] }) {
  return (
    <ul>
      {review.length > 0 ? (
        review.map((review) => (
          <li key={review.id} className="border-t border-accent p-4 relative">
            <h3 className="text-lg font-bold">{review.username}</h3>
            <p className="absolute top-4 right-4">
              <strong>Rating:</strong> {review.rating}/5★
            </p>
            <p>{review.description}</p>
          </li>
        ))
      ) : (
        <li className="mb-8 pl-4">No reviews yet.</li>
      )}
    </ul>
  );
}
