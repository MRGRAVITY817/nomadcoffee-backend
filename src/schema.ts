import {
  loadFilesSync,
  makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";
// Merge Type Defs
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const typeDefs = mergeTypeDefs(loadedTypes);

// Merge Resolvers
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.{queries,mutations}.ts`
);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
