interface ApolloResponse {
  data: any;
  loading: boolean;
  networkStatus: number;
  stale: boolean;
}

export { ApolloResponse };
