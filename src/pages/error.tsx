import { Link, useRouteError } from "react-router-dom";

export function Error() {
  const error = useRouteError() as Error;

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold">Oops, something happened...</h1>

      <p className="body-md">
        An error occurred in the application. Below you can find more details:
      </p>

      <pre className="body-sm">{error?.message || JSON.stringify(error)}</pre>

      <p className="body-md">
        Go back to the{" "}
        <Link to="/" className="text-orange-base hover:text-orange-dark">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
