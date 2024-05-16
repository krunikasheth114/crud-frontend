import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const ClientProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}
      {/* <ReactQueryDevtools initialIsOpen/> */}
    </QueryClientProvider>
  );
};

export default ClientProvider;