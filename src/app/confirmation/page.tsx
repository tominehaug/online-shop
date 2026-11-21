import ConfirmationMessage from "@/components/Confirmation";
import HomeButton from "@/components/HomeButton";

export default function ConfirmationPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-3 pb-10">
      <ConfirmationMessage />
      <HomeButton />
    </div>
  );
}
