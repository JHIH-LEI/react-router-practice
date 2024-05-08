import { useNavigation } from "react-router-dom";

export function GlobalSpinner({ children }) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      {isLoading && <div className="loading-spinner"></div>}
      <div className={`container ${isLoading ? "loading" : undefined}`}>
        {children}
      </div>
    </>
  );
}
