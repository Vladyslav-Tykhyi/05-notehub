import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./components/App/App";
import "modern-normalize/modern-normalize.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Toaster position="top-center" />
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
