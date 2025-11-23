/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CartItemModel = {
  __typename?: 'CartItemModel';
  id: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  variants: Array<OrderVariantModel>;
};

export type CartModel = {
  __typename?: 'CartModel';
  createdAt: Scalars['DateTime']['output'];
  items: Array<CartItemModel>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export enum Category {
  Bags = 'BAGS',
  Drinkware = 'DRINKWARE',
  Electronics = 'ELECTRONICS',
  Footware = 'FOOTWARE',
  Headwear = 'HEADWEAR',
  Hoodies = 'HOODIES',
  Jackets = 'JACKETS',
  Kids = 'KIDS',
  Pets = 'PETS',
  Shirts = 'SHIRTS',
  Stickers = 'STICKERS'
}

export type CreateCartItemDto = {
  productId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  variants: Array<OrderVariantDto>;
};

export type CreateOrderDto = {
  orderItems: Array<OrderItemDto>;
  status: Status;
  totalPrice: Scalars['Float']['input'];
};

export type CreateOrderResponseModel = {
  __typename?: 'CreateOrderResponseModel';
  order: OrderModel;
  redirectUrl: Scalars['String']['output'];
};

export type CreateProductDto = {
  category: Category;
  description: Scalars['String']['input'];
  imageUrls: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  stock: Scalars['Float']['input'];
  variants: Array<VariantDto>;
};

export type CreateUserDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createItem: CartModel;
  createOrder: CreateOrderResponseModel;
  createProduct: ProductModel;
  createUser: UserModel;
  removeItem: CartModel;
  removeOrder: OrderModel;
  removeProduct: ProductModel;
  updateItem: CartItemModel;
  updateOrder: OrderModel;
  updateProduct: ProductModel;
};


export type MutationCreateItemArgs = {
  createCartItemInput: CreateCartItemDto;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderDto;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductDto;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserDto;
};


export type MutationRemoveItemArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveOrderArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveProductArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateItemArgs = {
  id: Scalars['String']['input'];
  updateCartItemInput: UpdateCartItemDto;
};


export type MutationUpdateOrderArgs = {
  id: Scalars['String']['input'];
  updateOrderInput: UpdateOrderDto;
};


export type MutationUpdateProductArgs = {
  id: Scalars['String']['input'];
  updateProductInput: UpdateProductDto;
};

export type OrderItemDto = {
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  variants: Array<OrderVariantDto>;
};

export type OrderItemModel = {
  __typename?: 'OrderItemModel';
  name: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  productId: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  variants: Array<OrderVariantModel>;
};

export type OrderModel = {
  __typename?: 'OrderModel';
  id: Scalars['String']['output'];
  invoiceId: Scalars['String']['output'];
  orderItems: Array<OrderItemModel>;
  status: Status;
  timestamp: Scalars['DateTime']['output'];
  totalPrice: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
};

export type OrderVariantDto = {
  name: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type OrderVariantModel = {
  __typename?: 'OrderVariantModel';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type PaymentModel = {
  __typename?: 'PaymentModel';
  checkoutId: Scalars['String']['output'];
  redirectUrl: Scalars['String']['output'];
};

export type ProductModel = {
  __typename?: 'ProductModel';
  category: Category;
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageUrls: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  stock: Scalars['Float']['output'];
  variants: Array<VariantModel>;
};

export type Query = {
  __typename?: 'Query';
  cart: CartModel;
  order: OrderModel;
  orders: Array<OrderModel>;
  payments: Array<PaymentModel>;
  product: ProductModel;
  products: Array<ProductModel>;
  users: Array<UserModel>;
};


export type QueryOrderArgs = {
  id: Scalars['String']['input'];
};


export type QueryProductArgs = {
  id: Scalars['String']['input'];
};

export enum Status {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Paid = 'PAID',
  Pending = 'PENDING',
  Shipped = 'SHIPPED'
}

export type UpdateCartItemDto = {
  change: Scalars['Float']['input'];
};

export type UpdateOrderDto = {
  status?: InputMaybe<Status>;
  totalPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateProductDto = {
  category?: InputMaybe<Category>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  stock?: InputMaybe<Scalars['Float']['input']>;
};

export type UserModel = {
  __typename?: 'UserModel';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type VariantDto = {
  name: Scalars['String']['input'];
  options: Array<Scalars['String']['input']>;
};

export type VariantModel = {
  __typename?: 'VariantModel';
  name: Scalars['String']['output'];
  options: Array<Scalars['String']['output']>;
  productId: Scalars['String']['output'];
};

export type GetCartCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartCountQuery = { __typename?: 'Query', cart: { __typename?: 'CartModel', items: Array<{ __typename?: 'CartItemModel', quantity: number }> } };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductDto;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductModel', id: string, name: string } };

export type GetCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartQuery = { __typename?: 'Query', cart: { __typename?: 'CartModel', items: Array<{ __typename?: 'CartItemModel', id: string, productId: string, quantity: number, variants: Array<{ __typename?: 'OrderVariantModel', name: string, value: string }> }> }, products: Array<{ __typename?: 'ProductModel', id: string, name: string, price: number, imageUrls: Array<string> }> };

export type UpdateItemMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateCartItemDto;
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'CartItemModel', id: string, quantity: number } };

export type RemoveItemMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveItemMutation = { __typename?: 'Mutation', removeItem: { __typename?: 'CartModel', items: Array<{ __typename?: 'CartItemModel', id: string }> } };

export type GetCartForCheckoutQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartForCheckoutQuery = { __typename?: 'Query', cart: { __typename?: 'CartModel', items: Array<{ __typename?: 'CartItemModel', id: string, productId: string, quantity: number, variants: Array<{ __typename?: 'OrderVariantModel', name: string, value: string }> }> }, products: Array<{ __typename?: 'ProductModel', id: string, name: string, price: number, imageUrls: Array<string> }> };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderDto;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'CreateOrderResponseModel', redirectUrl: string, order: { __typename?: 'OrderModel', id: string, totalPrice: number } } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'ProductModel', id: string, name: string, description: string, price: number, stock: number, imageUrls: Array<string>, category: Category }> };

export type GetProductQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', product: { __typename?: 'ProductModel', id: string, name: string, description: string, price: number, stock: number, imageUrls: Array<string>, category: Category, variants: Array<{ __typename?: 'VariantModel', name: string, options: Array<string> }> } };

export type CreateItemMutationVariables = Exact<{
  input: CreateCartItemDto;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'CartModel', items: Array<{ __typename?: 'CartItemModel', id: string, quantity: number }> } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserModel', id: string, email: string } };


export const GetCartCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCartCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]}}]} as unknown as DocumentNode<GetCartCountQuery, GetCartCountQueryVariables>;
export const CreateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProductDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createProductInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateProductMutation, CreateProductMutationVariables>;
export const GetCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}}]}}]}}]} as unknown as DocumentNode<GetCartQuery, GetCartQueryVariables>;
export const UpdateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCartItemDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateCartItemInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]} as unknown as DocumentNode<UpdateItemMutation, UpdateItemMutationVariables>;
export const RemoveItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveItemMutation, RemoveItemMutationVariables>;
export const GetCartForCheckoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCartForCheckout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}}]}}]}}]} as unknown as DocumentNode<GetCartForCheckoutQuery, GetCartForCheckoutQueryVariables>;
export const CreateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrderDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createOrderInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalPrice"}}]}},{"kind":"Field","name":{"kind":"Name","value":"redirectUrl"}}]}}]}}]} as unknown as DocumentNode<CreateOrderMutation, CreateOrderMutationVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"stock"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"options"}}]}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const CreateItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCartItemDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCartItemInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]}}]} as unknown as DocumentNode<CreateItemMutation, CreateItemMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;