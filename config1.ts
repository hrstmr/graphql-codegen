import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: {
        'https://localhost:4000/graphql/': {
            headers: {
                Authorization: 'Bearer ' + process.env.AUTH_TOKEN,
            },
        },
    },
    generates: {
        './graphql.schema.json': {
            plugins: ['introspection'],
        },
        './src/operations.ts': {
            documents: 'src/**/*.gql',
            plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
        },
        './src/graphql.ts': {
            plugins: ['typescript'],
        },
    },
};

export default config;
