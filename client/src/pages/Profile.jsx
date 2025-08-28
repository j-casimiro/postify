import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">User Profile #{id}</h1>
    </div>
  );
}
