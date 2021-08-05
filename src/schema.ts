import { IResolvers, loadFilesSync } from "graphql-tools";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

// Merge Type Defs
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
export const typeDefs = mergeTypeDefs(loadedTypes);

// Merge Resolvers
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);
export const resolvers: any = mergeResolvers(loadedResolvers);
