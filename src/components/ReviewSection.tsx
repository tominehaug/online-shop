import { Review } from "@/features/products/product.types";

export default function ReviewSection({ review }: { review: Review[] }) {
  return (
    <ul>
      {review.map((review) => (
        <li
          key={review.id}
          style={{
            marginBottom: "20px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h3>{review.username}</h3>
          <p>Rating: {review.rating}/5</p>
          <p>{review.description}</p>
        </li>
      ))}
    </ul>
  );
}
