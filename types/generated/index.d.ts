import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from 'types/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ObjectID: any;
  _Any: any;
};

export type Account = {
  __typename?: 'Account';
  _id: Scalars['ObjectID'];
};

export enum ArrayFilterByEnum {
  In = 'IN',
  Nin = 'NIN'
}

/** Filter for documents which have a property that is a Boolean. */
export type BooleanFieldFilter = {
  bool: Scalars['Boolean'];
  filterBy: BooleanFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

/** Equal or Not Equal */
export enum BooleanFilterByEnum {
  Eq = 'EQ',
  Ne = 'NE'
}

export type CreatePaywallInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  product_id: Scalars['ID'];
  status?: InputMaybe<PaywallStatusEnum>;
};

export type CreatePaywallPurchaseInput = {
  account?: InputMaybe<Scalars['ObjectID']>;
  paywall: Scalars['ObjectID'];
  status?: InputMaybe<PaywallPurchaseStatusEnum>;
};

export type CreateServiceInput = {
  limits: Array<PaywallLimitInput>;
  name: Scalars['String'];
  webhook?: InputMaybe<Scalars['String']>;
};

/** Filter for documents which have a property that is a Date. */
export type DateFieldFilter = {
  date: Scalars['DateTime'];
  filterBy: DateFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

export enum DateFilterByEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE'
}

/** Global configuration details. */
export type FilterConfig = {
  pagination?: InputMaybe<Pagination>;
};

export type GetPaywallPurchasesInput = {
  _id?: InputMaybe<StringFieldFilter>;
  account?: InputMaybe<StringFieldFilter>;
  config?: InputMaybe<FilterConfig>;
  createdAt?: InputMaybe<StringFieldFilter>;
  created_by?: InputMaybe<StringFieldFilter>;
  paywall?: InputMaybe<StringFieldFilter>;
  status?: InputMaybe<StringFieldFilter>;
  updatedAt?: InputMaybe<StringFieldFilter>;
};

export type GetPaywallPurchasesResponse = {
  __typename?: 'GetPaywallPurchasesResponse';
  data: Array<PaywallPurchase>;
  stats: Stats;
};

export type GetPaywallsInput = {
  _id?: InputMaybe<StringFieldFilter>;
  config?: InputMaybe<FilterConfig>;
  createdAt?: InputMaybe<StringFieldFilter>;
  created_by?: InputMaybe<StringFieldFilter>;
  name?: InputMaybe<StringFieldFilter>;
  productId?: InputMaybe<StringFieldFilter>;
  status?: InputMaybe<StringFieldFilter>;
  updatedAt?: InputMaybe<StringFieldFilter>;
};

export type GetPaywallsResponse = {
  __typename?: 'GetPaywallsResponse';
  data: Array<Paywall>;
  stats: Stats;
};

export type GetServicesInput = {
  _id?: InputMaybe<StringFieldFilter>;
  config?: InputMaybe<FilterConfig>;
  createdAt?: InputMaybe<StringFieldFilter>;
  created_by?: InputMaybe<StringFieldFilter>;
  name?: InputMaybe<StringFieldFilter>;
  updatedAt?: InputMaybe<StringFieldFilter>;
};

export type GetServicesResponse = {
  __typename?: 'GetServicesResponse';
  data: Array<Service>;
  stats: Stats;
};

/** Filter for documents which have a property that is an Integer. */
export type IntFieldFilter = {
  filterBy: IntFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  int: Scalars['Int'];
  operator?: InputMaybe<OperatorFieldConfigEnum>;
};

export enum IntFilterByEnum {
  Eq = 'EQ',
  Gt = 'GT',
  Gte = 'GTE',
  Lt = 'LT',
  Lte = 'LTE',
  Ne = 'NE'
}

export type Limit = {
  __typename?: 'Limit';
  name: Scalars['String'];
  scopes: Array<Scope>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPaywall: Paywall;
  createPaywallPurchase: PaywallPurchase;
  createService: Service;
  updatePaywall: Paywall;
  updatePaywallPurchase: PaywallPurchase;
  updateService: Service;
};


export type MutationCreatePaywallArgs = {
  createPaywallInput: CreatePaywallInput;
};


export type MutationCreatePaywallPurchaseArgs = {
  createPaywallPurchaseInput: CreatePaywallPurchaseInput;
};


export type MutationCreateServiceArgs = {
  createServiceInput: CreateServiceInput;
};


export type MutationUpdatePaywallArgs = {
  updatePaywallInput: UpdatePaywallInput;
};


export type MutationUpdatePaywallPurchaseArgs = {
  updatePaywallPurchaseInput: UpdatePaywallPurchaseInput;
};


export type MutationUpdateServiceArgs = {
  updateServiceInput: UpdateServiceInput;
};

export enum OperatorFieldConfigEnum {
  And = 'AND',
  Or = 'OR'
}

export type Pagination = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
  reverse?: InputMaybe<Scalars['Boolean']>;
};

export type Paywall = {
  __typename?: 'Paywall';
  _id: Scalars['ObjectID'];
  createdAt: Scalars['DateTime'];
  created_by: User;
  description: Scalars['String'];
  name: Scalars['String'];
  product_id: Scalars['ID'];
  status: PaywallStatusEnum;
  updatedAt: Scalars['DateTime'];
};

export type PaywallLimitInput = {
  name: Scalars['String'];
  scopes: Array<ScopeInput>;
};

export type PaywallPurchase = {
  __typename?: 'PaywallPurchase';
  _id: Scalars['ObjectID'];
  account: Account;
  createdAt: Scalars['DateTime'];
  created_by: User;
  paywall: Paywall;
  status: PaywallPurchaseStatusEnum;
  updatedAt: Scalars['DateTime'];
};

export enum PaywallPurchaseStatusEnum {
  Active = 'ACTIVE',
  Created = 'CREATED',
  Inactive = 'INACTIVE'
}

export enum PaywallStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type Query = {
  __typename?: 'Query';
  getPaywallPurchases: GetPaywallPurchasesResponse;
  getPaywalls: GetPaywallsResponse;
  getServices: GetServicesResponse;
};


export type QueryGetPaywallPurchasesArgs = {
  getPaywallPurchasesInput: GetPaywallPurchasesInput;
};


export type QueryGetPaywallsArgs = {
  getPaywallsInput: GetPaywallsInput;
};


export type QueryGetServicesArgs = {
  getServicesInput: GetServicesInput;
};

export type Scope = {
  __typename?: 'Scope';
  paywall: Paywall;
  quantity: Scalars['Int'];
};

export type ScopeInput = {
  paywall: Scalars['ObjectID'];
  quantity: Scalars['Int'];
};

export type Service = {
  __typename?: 'Service';
  _id: Scalars['ObjectID'];
  createdAt: Scalars['DateTime'];
  created_by: User;
  limits: Array<Limit>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Stats = {
  __typename?: 'Stats';
  cursor?: Maybe<Scalars['DateTime']>;
  page?: Maybe<Scalars['Int']>;
  remaining?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

/** Filter for documents which have a property that is an array of strings.. */
export type StringArrayFieldFilter = {
  arrayOptions: ArrayFilterByEnum;
  filterBy: StringFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  string: Array<Scalars['String']>;
};

/** Filter for documents which have a property that is a string. Filter by REGEX, ObjectID, or Match. */
export type StringFieldFilter = {
  filterBy: StringFilterByEnum;
  groups?: InputMaybe<Array<Scalars['String']>>;
  operator?: InputMaybe<OperatorFieldConfigEnum>;
  string: Scalars['String'];
};

export enum StringFilterByEnum {
  Match = 'MATCH',
  Objectid = 'OBJECTID',
  Regex = 'REGEX'
}

export type UpdatePaywallInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  paywall: GetPaywallsInput;
  product_id?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<PaywallStatusEnum>;
};

export type UpdatePaywallPurchaseInput = {
  account?: InputMaybe<Scalars['ObjectID']>;
  paywallPurchase: GetPaywallPurchasesInput;
  status?: InputMaybe<PaywallPurchaseStatusEnum>;
};

export type UpdateServiceInput = {
  limits?: InputMaybe<Array<PaywallLimitInput>>;
  name?: InputMaybe<Scalars['String']>;
  service: GetServicesInput;
  webhook?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectID'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Account: ResolverTypeWrapper<Account>;
  ArrayFilterByEnum: ArrayFilterByEnum;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BooleanFieldFilter: BooleanFieldFilter;
  BooleanFilterByEnum: BooleanFilterByEnum;
  CreatePaywallInput: CreatePaywallInput;
  CreatePaywallPurchaseInput: CreatePaywallPurchaseInput;
  CreateServiceInput: CreateServiceInput;
  DateFieldFilter: DateFieldFilter;
  DateFilterByEnum: DateFilterByEnum;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  FilterConfig: FilterConfig;
  GetPaywallPurchasesInput: GetPaywallPurchasesInput;
  GetPaywallPurchasesResponse: ResolverTypeWrapper<GetPaywallPurchasesResponse>;
  GetPaywallsInput: GetPaywallsInput;
  GetPaywallsResponse: ResolverTypeWrapper<GetPaywallsResponse>;
  GetServicesInput: GetServicesInput;
  GetServicesResponse: ResolverTypeWrapper<GetServicesResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntFieldFilter: IntFieldFilter;
  IntFilterByEnum: IntFilterByEnum;
  Limit: ResolverTypeWrapper<Limit>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  OperatorFieldConfigEnum: OperatorFieldConfigEnum;
  Pagination: Pagination;
  Paywall: ResolverTypeWrapper<Paywall>;
  PaywallLimitInput: PaywallLimitInput;
  PaywallPurchase: ResolverTypeWrapper<PaywallPurchase>;
  PaywallPurchaseStatusEnum: PaywallPurchaseStatusEnum;
  PaywallStatusEnum: PaywallStatusEnum;
  Query: ResolverTypeWrapper<{}>;
  Scope: ResolverTypeWrapper<Scope>;
  ScopeInput: ScopeInput;
  Service: ResolverTypeWrapper<Service>;
  Stats: ResolverTypeWrapper<Stats>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringArrayFieldFilter: StringArrayFieldFilter;
  StringFieldFilter: StringFieldFilter;
  StringFilterByEnum: StringFilterByEnum;
  UpdatePaywallInput: UpdatePaywallInput;
  UpdatePaywallPurchaseInput: UpdatePaywallPurchaseInput;
  UpdateServiceInput: UpdateServiceInput;
  User: ResolverTypeWrapper<User>;
  _Any: ResolverTypeWrapper<Scalars['_Any']>;
  _Entity: ResolversTypes['Account'] | ResolversTypes['Paywall'] | ResolversTypes['User'];
  _Service: ResolverTypeWrapper<_Service>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Account: Account;
  Boolean: Scalars['Boolean'];
  BooleanFieldFilter: BooleanFieldFilter;
  CreatePaywallInput: CreatePaywallInput;
  CreatePaywallPurchaseInput: CreatePaywallPurchaseInput;
  CreateServiceInput: CreateServiceInput;
  DateFieldFilter: DateFieldFilter;
  DateTime: Scalars['DateTime'];
  FilterConfig: FilterConfig;
  GetPaywallPurchasesInput: GetPaywallPurchasesInput;
  GetPaywallPurchasesResponse: GetPaywallPurchasesResponse;
  GetPaywallsInput: GetPaywallsInput;
  GetPaywallsResponse: GetPaywallsResponse;
  GetServicesInput: GetServicesInput;
  GetServicesResponse: GetServicesResponse;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  IntFieldFilter: IntFieldFilter;
  Limit: Limit;
  Mutation: {};
  ObjectID: Scalars['ObjectID'];
  Pagination: Pagination;
  Paywall: Paywall;
  PaywallLimitInput: PaywallLimitInput;
  PaywallPurchase: PaywallPurchase;
  Query: {};
  Scope: Scope;
  ScopeInput: ScopeInput;
  Service: Service;
  Stats: Stats;
  String: Scalars['String'];
  StringArrayFieldFilter: StringArrayFieldFilter;
  StringFieldFilter: StringFieldFilter;
  UpdatePaywallInput: UpdatePaywallInput;
  UpdatePaywallPurchaseInput: UpdatePaywallPurchaseInput;
  UpdateServiceInput: UpdateServiceInput;
  User: User;
  _Any: Scalars['_Any'];
  _Entity: ResolversParentTypes['Account'] | ResolversParentTypes['Paywall'] | ResolversParentTypes['User'];
  _Service: _Service;
}>;

export type ExtendsDirectiveArgs = { };

export type ExtendsDirectiveResolver<Result, Parent, ContextType = Context, Args = ExtendsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AccountResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GetPaywallPurchasesResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetPaywallPurchasesResponse'] = ResolversParentTypes['GetPaywallPurchasesResponse']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['PaywallPurchase']>, ParentType, ContextType>;
  stats?: Resolver<ResolversTypes['Stats'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GetPaywallsResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetPaywallsResponse'] = ResolversParentTypes['GetPaywallsResponse']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Paywall']>, ParentType, ContextType>;
  stats?: Resolver<ResolversTypes['Stats'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GetServicesResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['GetServicesResponse'] = ResolversParentTypes['GetServicesResponse']> = ResolversObject<{
  data?: Resolver<Array<ResolversTypes['Service']>, ParentType, ContextType>;
  stats?: Resolver<ResolversTypes['Stats'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LimitResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Limit'] = ResolversParentTypes['Limit']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scopes?: Resolver<Array<ResolversTypes['Scope']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createPaywall?: Resolver<ResolversTypes['Paywall'], ParentType, ContextType, RequireFields<MutationCreatePaywallArgs, 'createPaywallInput'>>;
  createPaywallPurchase?: Resolver<ResolversTypes['PaywallPurchase'], ParentType, ContextType, RequireFields<MutationCreatePaywallPurchaseArgs, 'createPaywallPurchaseInput'>>;
  createService?: Resolver<ResolversTypes['Service'], ParentType, ContextType, RequireFields<MutationCreateServiceArgs, 'createServiceInput'>>;
  updatePaywall?: Resolver<ResolversTypes['Paywall'], ParentType, ContextType, RequireFields<MutationUpdatePaywallArgs, 'updatePaywallInput'>>;
  updatePaywallPurchase?: Resolver<ResolversTypes['PaywallPurchase'], ParentType, ContextType, RequireFields<MutationUpdatePaywallPurchaseArgs, 'updatePaywallPurchaseInput'>>;
  updateService?: Resolver<ResolversTypes['Service'], ParentType, ContextType, RequireFields<MutationUpdateServiceArgs, 'updateServiceInput'>>;
}>;

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type PaywallResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Paywall'] = ResolversParentTypes['Paywall']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  created_by?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  product_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['PaywallStatusEnum'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaywallPurchaseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PaywallPurchase'] = ResolversParentTypes['PaywallPurchase']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  account?: Resolver<ResolversTypes['Account'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  created_by?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  paywall?: Resolver<ResolversTypes['Paywall'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['PaywallPurchaseStatusEnum'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _entities?: Resolver<Array<Maybe<ResolversTypes['_Entity']>>, ParentType, ContextType, RequireFields<Query_EntitiesArgs, 'representations'>>;
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>;
  getPaywallPurchases?: Resolver<ResolversTypes['GetPaywallPurchasesResponse'], ParentType, ContextType, RequireFields<QueryGetPaywallPurchasesArgs, 'getPaywallPurchasesInput'>>;
  getPaywalls?: Resolver<ResolversTypes['GetPaywallsResponse'], ParentType, ContextType, RequireFields<QueryGetPaywallsArgs, 'getPaywallsInput'>>;
  getServices?: Resolver<ResolversTypes['GetServicesResponse'], ParentType, ContextType, RequireFields<QueryGetServicesArgs, 'getServicesInput'>>;
}>;

export type ScopeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Scope'] = ResolversParentTypes['Scope']> = ResolversObject<{
  paywall?: Resolver<ResolversTypes['Paywall'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Service'] = ResolversParentTypes['Service']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  created_by?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  limits?: Resolver<Array<ResolversTypes['Limit']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StatsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Stats'] = ResolversParentTypes['Stats']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  page?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  remaining?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface _AnyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_Any'], any> {
  name: '_Any';
}

export type _EntityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['_Entity'] = ResolversParentTypes['_Entity']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Account' | 'Paywall' | 'User', ParentType, ContextType>;
}>;

export type _ServiceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service']> = ResolversObject<{
  sdl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Account?: AccountResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  GetPaywallPurchasesResponse?: GetPaywallPurchasesResponseResolvers<ContextType>;
  GetPaywallsResponse?: GetPaywallsResponseResolvers<ContextType>;
  GetServicesResponse?: GetServicesResponseResolvers<ContextType>;
  Limit?: LimitResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  Paywall?: PaywallResolvers<ContextType>;
  PaywallPurchase?: PaywallPurchaseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Scope?: ScopeResolvers<ContextType>;
  Service?: ServiceResolvers<ContextType>;
  Stats?: StatsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  _Any?: GraphQLScalarType;
  _Entity?: _EntityResolvers<ContextType>;
  _Service?: _ServiceResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  extends?: ExtendsDirectiveResolver<any, any, ContextType>;
}>;
