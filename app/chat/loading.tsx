import { LoadingGarden } from "@/components/feedback/LoadingGarden";

export default function ChatLoading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6">
      <LoadingGarden />
    </div>
  );
}
