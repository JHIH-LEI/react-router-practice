import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const PRODUCTION_ERROR = <div>something went wrong</div>;

export function ErrorBoundary() {
  const error = useRouteError();
  // if (isRouteErrorResponse(error)) {

  // }
  if (import.meta.env.PROD) {
    return PRODUCTION_ERROR;
  } else {
    return (
      <div className="container">
        <pre>{error.message} </pre>
        <pre>{error.stack}</pre>
      </div>
    );
  }
}
