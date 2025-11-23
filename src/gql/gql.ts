/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetCartCount {\n    cart {\n      items {\n        quantity\n      }\n    }\n  }\n": typeof types.GetCartCountDocument,
    "\n  mutation CreateProduct($input: CreateProductDto!) {\n    createProduct(createProductInput: $input) {\n      id\n      name\n    }\n  }\n": typeof types.CreateProductDocument,
    "\n  query GetCart {\n    cart {\n      items {\n        id\n        productId\n        quantity\n        variants {\n          name\n          value\n        }\n      }\n    }\n    products {\n      id\n      name\n      price\n      imageUrls\n    }\n  }\n": typeof types.GetCartDocument,
    "\n  mutation UpdateItem($id: String!, $input: UpdateCartItemDto!) {\n    updateItem(id: $id, updateCartItemInput: $input) {\n      id\n      quantity\n    }\n  }\n": typeof types.UpdateItemDocument,
    "\n  mutation RemoveItem($id: String!) {\n    removeItem(id: $id) {\n        items {\n            id\n        }\n    }\n  }\n": typeof types.RemoveItemDocument,
    "\n  query GetCartForCheckout {\n    cart {\n      items {\n        id\n        productId\n        quantity\n        variants {\n          name\n          value\n        }\n      }\n    }\n    products {\n      id\n      name\n      price\n      imageUrls\n    }\n  }\n": typeof types.GetCartForCheckoutDocument,
    "\n  mutation CreateOrder($input: CreateOrderDto!) {\n    createOrder(createOrderInput: $input) {\n      order {\n        id\n        totalPrice\n      }\n      redirectUrl\n    }\n  }\n": typeof types.CreateOrderDocument,
    "\n  query GetProducts {\n    products {\n      id\n      name\n      description\n      price\n      stock\n      imageUrls\n      category\n    }\n  }\n": typeof types.GetProductsDocument,
    "\n  query GetProduct($id: String!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      stock\n      imageUrls\n      category\n      variants {\n        name\n        options\n      }\n    }\n  }\n": typeof types.GetProductDocument,
    "\n  mutation CreateItem($input: CreateCartItemDto!) {\n    createItem(createCartItemInput: $input) {\n      items {\n        id\n        quantity\n      }\n    }\n  }\n": typeof types.CreateItemDocument,
    "\n  mutation CreateUser($input: CreateUserDto!) {\n    createUser(createUserInput: $input) {\n      id\n      email\n    }\n  }\n": typeof types.CreateUserDocument,
};
const documents: Documents = {
    "\n  query GetCartCount {\n    cart {\n      items {\n        quantity\n      }\n    }\n  }\n": types.GetCartCountDocument,
    "\n  mutation CreateProduct($input: CreateProductDto!) {\n    createProduct(createProductInput: $input) {\n      id\n      name\n    }\n  }\n": types.CreateProductDocument,
    "\n  query GetCart {\n    cart {\n      items {\n        id\n        productId\n        quantity\n        variants {\n          name\n          value\n        }\n      }\n    }\n    products {\n      id\n      name\n      price\n      imageUrls\n    }\n  }\n": types.GetCartDocument,
    "\n  mutation UpdateItem($id: String!, $input: UpdateCartItemDto!) {\n    updateItem(id: $id, updateCartItemInput: $input) {\n      id\n      quantity\n    }\n  }\n": types.UpdateItemDocument,
    "\n  mutation RemoveItem($id: String!) {\n    removeItem(id: $id) {\n        items {\n            id\n        }\n    }\n  }\n": types.RemoveItemDocument,
    "\n  query GetCartForCheckout {\n    cart {\n      items {\n        id\n        productId\n        quantity\n        variants {\n          name\n          value\n        }\n      }\n    }\n    products {\n      id\n      name\n      price\n      imageUrls\n    }\n  }\n": types.GetCartForCheckoutDocument,
    "\n  mutation CreateOrder($input: CreateOrderDto!) {\n    createOrder(createOrderInput: $input) {\n      order {\n        id\n        totalPrice\n      }\n      redirectUrl\n    }\n  }\n": types.CreateOrderDocument,
    "\n  query GetProducts {\n    products {\n      id\n      name\n      description\n      price\n      stock\n      imageUrls\n      category\n    }\n  }\n": types.GetProductsDocument,
    "\n  query GetProduct($id: String!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      stock\n      imageUrls\n      category\n      variants {\n        name\n        options\n      }\n    }\n  }\n": types.GetProductDocument,
    "\n  mutation CreateItem($input: CreateCartItemDto!) {\n    createItem(createCartItemInput: $input) {\n      items {\n        id\n        quantity\n      }\n    }\n  }\n": types.CreateItemDocument,
    "\n  mutation CreateUser($input: CreateUserDto!) {\n    createUser(createUserInput: $input) {\n      id\n      email\n    }\n  }\n": types.CreateUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCartCount {\n    cart {\n      items {\n        quantity\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCartCount {\n    cart {\n      items {\n        quantity\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateProduct($input: CreateProductDto!) {\n    createProduct(createProductInput: $input) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProduct($input: CreateProductDto!) {\n    createProduct(createProductInput: $input) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCart {\n    cart {\n      items {\n        id\n        productId\n        quantity\n        variants {\n          name\n          value\n        }\n      }\n    }\n    products {\n      id\n      name\n      price\n      imageUrls\n    }\n  }\n"): (typeof documents)["\n  query GetCart {\n    cart {\n      items {\n        id\n        productId\n        quantity\n        variants {\n          name\n          value\n        }\n      }\n    }\n    products {\n      id\n      name\n      price\n      imageUrls\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateItem($id: String!, $input: UpdateCartItemDto!) {\n    updateItem(id: $id, updateCartItemInput: $input) {\n      id\n      quantity\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateItem($id: String!, $input: UpdateCartItemDto!) {\n    updateItem(id: $id, updateCartItemInput: $input) {\n      id\n      quantity\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveItem($id: String!) {\n    removeItem(id: $id) {\n        items {\n            id\n        }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveItem($id: String!) {\n    removeItem(id: $id) {\n        items {\n            id\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCartForCheckout {\n    cart {\n      items {\n        id\n        productId\n        quantity\n        variants {\n          name\n          value\n        }\n      }\n    }\n    products {\n      id\n      name\n      price\n      imageUrls\n    }\n  }\n"): (typeof documents)["\n  query GetCartForCheckout {\n    cart {\n      items {\n        id\n        productId\n        quantity\n        variants {\n          name\n          value\n        }\n      }\n    }\n    products {\n      id\n      name\n      price\n      imageUrls\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateOrder($input: CreateOrderDto!) {\n    createOrder(createOrderInput: $input) {\n      order {\n        id\n        totalPrice\n      }\n      redirectUrl\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrder($input: CreateOrderDto!) {\n    createOrder(createOrderInput: $input) {\n      order {\n        id\n        totalPrice\n      }\n      redirectUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProducts {\n    products {\n      id\n      name\n      description\n      price\n      stock\n      imageUrls\n      category\n    }\n  }\n"): (typeof documents)["\n  query GetProducts {\n    products {\n      id\n      name\n      description\n      price\n      stock\n      imageUrls\n      category\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProduct($id: String!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      stock\n      imageUrls\n      category\n      variants {\n        name\n        options\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProduct($id: String!) {\n    product(id: $id) {\n      id\n      name\n      description\n      price\n      stock\n      imageUrls\n      category\n      variants {\n        name\n        options\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateItem($input: CreateCartItemDto!) {\n    createItem(createCartItemInput: $input) {\n      items {\n        id\n        quantity\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateItem($input: CreateCartItemDto!) {\n    createItem(createCartItemInput: $input) {\n      items {\n        id\n        quantity\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($input: CreateUserDto!) {\n    createUser(createUserInput: $input) {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: CreateUserDto!) {\n    createUser(createUserInput: $input) {\n      id\n      email\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;