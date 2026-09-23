declare module "react-query" {
  export class QueryClient {}
  export const QueryClientProvider: (props: any) => any;
  export function useMutation<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown
  >(...args: any[]): any;
  export function useQuery<TData = unknown, TError = unknown>(
    ...args: any[]
  ): any;
}