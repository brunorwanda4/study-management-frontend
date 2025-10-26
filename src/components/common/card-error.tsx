import { FetchError } from "@/lib/types/fetchErr";

interface props {
  error?: FetchError;
}

const CardError = ({ error }: props) => {
  if (error) {
    return (
      <div className="card bg-error/20 border-error border p-6 text-red-500">
        <div className="card-body happy-line p-0">
          <div className="flex gap-2">
            <strong>Error:</strong> {error.message}{" "}
          </div>
          <div className="flex gap-2">
            <strong>Details:</strong> {error.details}{" "}
          </div>
          {error.status && (
            <div>
              <strong>Status:</strong> {error.status}{" "}
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="card bg-error/20 border-error border p-6 text-red-500">
      <div className="card-body p-0">
        <div className="flex">
          <strong>Error:</strong>Not found
        </div>
        <div className="flex gap-2">
          <strong>Details:</strong> Document UI is not available try other
        </div>
      </div>
    </div>
  );
};

export default CardError;
