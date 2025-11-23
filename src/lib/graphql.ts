import { GraphQLClient } from 'graphql-request';

// Prefer environment-based configuration for deployments, with a localhost fallback for dev.
const GRAPHQL_URL =
  import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:3003/graphql';

export const graphQLClient = new GraphQLClient(GRAPHQL_URL, {
  requestMiddleware: (request) => {
    const token = localStorage.getItem('token');

    // Explicitly reconstruct headers to ensure nothing is lost or overridden unexpectedly
    const headers: Record<string, string> = {
      ...(request.headers as Record<string, string>),
      'Content-Type': 'application/json',
      'apollo-require-preflight': 'true',
      'x-apollo-operation-name': 'mercado-front',
    };

    if (token) {
      headers['Authentication'] = token;
    }

    return {
      ...request,
      headers,
    };
  },
});
