/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ErrorResult {
  message: string;
}

export interface PaginationDTO {
  /** @default 1 */
  page?: number;
  /** @default 10 */
  perPage?: number;
}

export interface PaginationMeta {
  perPage: number;
  currentPage: number;
  lastPage: number;
  total: number;
  from?: number | null;
  to?: number | null;
}

export interface TokenData {
  token: string;
}

export interface CommandAwardData {
  id: number;
  nomination: string;
  description: string;
  project: string | null;
  authors: string;
  year: number;
  image: string | null;
  imageInfo: FileItemData | null;
}

export interface FileItemData {
  uuid: string;
  url: string;
  originalName: string;
  extension: string;
  size: number;
}

export interface ImageData {
  id: number;
  image: string;
  imageInfo: FileItemData | null;
  preview: string | null;
  previewInfo: FileItemData | null;
  year: number;
}

export interface NewsData {
  id: number;
  title: string;
  content: string;
  /** @format date-time */
  published_at: string;
  preview: string | null;
  previewInfo: FileItemData | null;
  gallery: FileItemData[];
}

export interface PersonalAwardData {
  id: number;
  name: string;
  position: string;
  company: string;
  award: string;
  grade: string | null;
  issued: string | null;
  year: number;
  image: string | null;
  imageInfo: FileItemData | null;
  gender: boolean;
  personal_award_section_id: number;
  second_personal_award_section_id: number | null;
}

export interface PersonalAwardSectionData {
  id: number;
  title: string;
  grade_filter: boolean;
  company_filter: boolean;
  issuer_filter: boolean;
  is_visible: boolean;
  filters: PersonalAwardSectionFilterData;
}

export interface PersonalAwardSectionFilterData {
  year?: string[] | null;
  grade?: string[] | null;
  company?: string[] | null;
  issued?: string[] | null;
}

export interface TextItemData {
  key: string;
  text: string;
}

export interface TimelineItemData {
  id: number;
  title: string;
  description: string;
  /** @format date-time */
  date: string;
  link: string | null;
  is_active: boolean;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface CommandAwardInput {
  nomination: string;
  description: string;
  project: string | null;
  authors: string;
  /** @example 2025 */
  year?: number;
  /** @example "14c43139-d582-479c-9f30-d0db8842f3f1" */
  image?: string | null;
}

export interface ImageInput {
  /** @example "14c43139-d582-479c-9f30-d0db8842f3f1" */
  image?: string;
  /** @example "14c43139-d582-479c-9f30-d0db8842f3f1" */
  preview?: string | null;
  /** @example 2025 */
  year?: number;
}

export interface NewsInput {
  title: string;
  content: string;
  /** @format date-time */
  published_at: string;
  preview?: string | null;
  gallery?: string[];
}

export interface PersonalAwardFilter {
  name?: string | null;
  companies?: string[] | null;
  issuers?: string[] | null;
  grade?: string | null;
  year?: number | null;
  personal_award_section_id?: number | null;
}

export interface PersonalAwardInput {
  name: string;
  position: string;
  company: string;
  award: string;
  grade: string | null;
  issued: string | null;
  gender: boolean;
  /** @example 2025 */
  year?: number;
  /** @example "14c43139-d582-479c-9f30-d0db8842f3f1" */
  image?: string | null;
  personal_award_section_id: number;
  second_personal_award_section_id: number | null;
}

export interface PersonalAwardSectionInput {
  title: string;
  issuer_filter: boolean;
  company_filter: boolean;
  grade_filter: boolean;
  is_visible: boolean;
}

export interface TimelineItemInput {
  title: string;
  description: string;
  /** @format date-time */
  date: string;
  link?: string | null;
  is_active?: boolean;
}

export interface GetAllCommandAwardsResult {
  data: CommandAwardData[];
}

export interface UploadChunkedFileResult {
  data: FileItemData | null;
  progress: number;
}

export type UploadChunkedFileUseCase = any;

export interface UploadFilesInput {
  "files[]"?: File[];
}

export interface UploadFilesResult {
  data: FileItemData[];
}

export type UploadFilesUseCase = any;

export interface GetAllImagesResult {
  data: ImageData[];
}

export interface GetNewsResult {
  data: NewsData[];
  meta: PaginationMeta;
}

export interface GetPersonalAwardsResult {
  data: PersonalAwardData[];
  meta: PaginationMeta;
}

export interface GetAllPersonalAwardSectionsResult {
  data: PersonalAwardSectionData[];
}

export interface GetAllTextsResult {
  data: TextItemData[];
}

export interface PutTextInput {
  text: string;
}

export type PutTextUseCase = any;

export interface GetAllTimelineItemsResult {
  data: TimelineItemData[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data.data;
    });
  };
}

/**
 * @title Sibur Awards
 * @version 2.0
 */
export class siburaward<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @name Description
   * @request DESCRIPTION:/sanctum/csrf-cookie
   */
  description = (params: RequestParams = {}) =>
    this.request<any, any>({
      path: `/sanctum/csrf-cookie`,
      method: "DESCRIPTION",
      ...params,
    });

  /**
   * No description
   *
   * @tags Авторизация
   * @name E5Ec8220D8198C7A4D9C933920B47Eca
   * @request GET:/sanctum/csrf-cookie
   */
  e5Ec8220D8198C7A4D9C933920B47Eca = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/sanctum/csrf-cookie`,
      method: "GET",
      ...params,
    });

  user = {
    /**
     * No description
     *
     * @tags Авторизация
     * @name GetUser
     * @request GET:/api/v2/user
     * @secure
     */
    getUser: (params: RequestParams = {}) =>
      this.request<UserData, any>({
        path: `/api/v2/user`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags Авторизация
     * @name Login
     * @request POST:/api/v2/login
     */
    login: (data: LoginInput, params: RequestParams = {}) =>
      this.request<TokenData, ErrorResult>({
        path: `/api/v2/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  commandAwards = {
    /**
     * No description
     *
     * @tags Командные награды
     * @name GetAllCommandAwards
     * @request GET:/api/v2/command-awards
     */
    getAllCommandAwards: (params: RequestParams = {}) =>
      this.request<GetAllCommandAwardsResult, any>({
        path: `/api/v2/command-awards`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Командные награды
     * @name CreateCommandAward
     * @request POST:/api/v2/command-awards
     * @secure
     */
    createCommandAward: (data: CommandAwardInput, params: RequestParams = {}) =>
      this.request<CommandAwardData, any>({
        path: `/api/v2/command-awards`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Командные награды
     * @name UpdateCommandAward
     * @request PUT:/api/v2/command-awards/{id}
     * @secure
     */
    updateCommandAward: (
      id: any,
      data: CommandAwardInput,
      params: RequestParams = {},
    ) =>
      this.request<CommandAwardData, ErrorResult>({
        path: `/api/v2/command-awards/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Командные награды
     * @name DeleteCommandAward
     * @request DELETE:/api/v2/command-awards/{id}
     * @secure
     */
    deleteCommandAward: (id: any, params: RequestParams = {}) =>
      this.request<UploadChunkedFileUseCase, ErrorResult>({
        path: `/api/v2/command-awards/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  files = {
    /**
     * No description
     *
     * @tags Файлы
     * @name UploadFiles
     * @request POST:/api/v2/files
     * @secure
     */
    uploadFiles: (data: UploadFilesInput, params: RequestParams = {}) =>
      this.request<UploadFilesResult, any>({
        path: `/api/v2/files`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Файлы
     * @name UploadChunkedFile
     * @request POST:/api/v2/files/upload-chunked
     * @secure
     */
    uploadChunkedFile: (data: any, params: RequestParams = {}) =>
      this.request<UploadChunkedFileResult, any>({
        path: `/api/v2/files/upload-chunked`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  images = {
    /**
     * No description
     *
     * @tags Галерея
     * @name GetAllImages
     * @request GET:/api/v2/images
     */
    getAllImages: (params: RequestParams = {}) =>
      this.request<GetAllImagesResult, any>({
        path: `/api/v2/images`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Галерея
     * @name CreateImage
     * @request POST:/api/v2/images
     * @secure
     */
    createImage: (data: ImageInput, params: RequestParams = {}) =>
      this.request<ImageData, any>({
        path: `/api/v2/images`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Галерея
     * @name UpdateImage
     * @request PUT:/api/v2/images/{id}
     * @secure
     */
    updateImage: (id: any, data: ImageInput, params: RequestParams = {}) =>
      this.request<ImageData, ErrorResult>({
        path: `/api/v2/images/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Галерея
     * @name DeleteImage
     * @request DELETE:/api/v2/images/{id}
     * @secure
     */
    deleteImage: (id: any, params: RequestParams = {}) =>
      this.request<UploadChunkedFileUseCase, ErrorResult>({
        path: `/api/v2/images/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  news = {
    /**
     * No description
     *
     * @tags Новости
     * @name GetNews
     * @request GET:/api/v2/news
     */
    getNews: (params: RequestParams = {}) =>
      this.request<GetNewsResult, any>({
        path: `/api/v2/news`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Новости
     * @name CreateNews
     * @request POST:/api/v2/news
     * @secure
     */
    createNews: (data: NewsInput, params: RequestParams = {}) =>
      this.request<NewsData, any>({
        path: `/api/v2/news`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Новости
     * @name UpdateNews
     * @request PUT:/api/v2/news/{id}
     * @secure
     */
    updateNews: (id: any, data: NewsInput, params: RequestParams = {}) =>
      this.request<NewsData, ErrorResult>({
        path: `/api/v2/news/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Новости
     * @name DeleteNews
     * @request DELETE:/api/v2/news/{id}
     * @secure
     */
    deleteNews: (id: any, params: RequestParams = {}) =>
      this.request<UploadChunkedFileUseCase, ErrorResult>({
        path: `/api/v2/news/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  personalAwards = {
    /**
     * No description
     *
     * @tags Персональные награды
     * @name GetPersonalAwards
     * @request GET:/api/v2/personal-awards
     */
    getPersonalAwards: (
      query?: {
        page?: number;
        perPage?: number;
        name?: string | null;
        "companies[]"?: string[] | null;
        "issuers[]"?: string[] | null;
        grade?: string | null;
        year?: number | null;
        personal_award_section_id?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetPersonalAwardsResult, any>({
        path: `/api/v2/personal-awards`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Персональные награды
     * @name CreatePersonalAward
     * @request POST:/api/v2/personal-awards
     * @secure
     */
    createPersonalAward: (
      data: PersonalAwardInput,
      params: RequestParams = {},
    ) =>
      this.request<PersonalAwardData, any>({
        path: `/api/v2/personal-awards`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Персональные награды
     * @name UpdatePersonalAward
     * @request PUT:/api/v2/personal-awards/{id}
     * @secure
     */
    updatePersonalAward: (
      id: any,
      data: PersonalAwardInput,
      params: RequestParams = {},
    ) =>
      this.request<PersonalAwardData, ErrorResult>({
        path: `/api/v2/personal-awards/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Персональные награды
     * @name DeletePersonalAward
     * @request DELETE:/api/v2/personal-awards/{id}
     * @secure
     */
    deletePersonalAward: (id: any, params: RequestParams = {}) =>
      this.request<UploadChunkedFileUseCase, ErrorResult>({
        path: `/api/v2/personal-awards/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  personalAwardSections = {
    /**
     * No description
     *
     * @tags Персональные награды
     * @name GetAllPersonalAwardSections
     * @request GET:/api/v2/personal-award-sections
     */
    getAllPersonalAwardSections: (params: RequestParams = {}) =>
      this.request<GetAllPersonalAwardSectionsResult, any>({
        path: `/api/v2/personal-award-sections`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Персональные награды
     * @name CreatePersonalAwardSection
     * @request POST:/api/v2/personal-award-sections
     * @secure
     */
    createPersonalAwardSection: (
      data: PersonalAwardSectionInput,
      params: RequestParams = {},
    ) =>
      this.request<PersonalAwardSectionData, any>({
        path: `/api/v2/personal-award-sections`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Персональные награды
     * @name UpdatePersonalAwardSection
     * @request PUT:/api/v2/personal-award-sections/{id}
     * @secure
     */
    updatePersonalAwardSection: (
      id: any,
      data: PersonalAwardSectionInput,
      params: RequestParams = {},
    ) =>
      this.request<PersonalAwardSectionData, ErrorResult>({
        path: `/api/v2/personal-award-sections/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Персональные награды
     * @name DeletePersonalAwardSection
     * @request DELETE:/api/v2/personal-award-sections/{id}
     * @secure
     */
    deletePersonalAwardSection: (id: any, params: RequestParams = {}) =>
      this.request<UploadChunkedFileUseCase, ErrorResult>({
        path: `/api/v2/personal-award-sections/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  texts = {
    /**
     * No description
     *
     * @tags Текстовый контент
     * @name GetAllTexts
     * @request GET:/api/v2/texts
     */
    getAllTexts: (params: RequestParams = {}) =>
      this.request<GetAllTextsResult, any>({
        path: `/api/v2/texts`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Текстовый контент
     * @name SetText
     * @request PUT:/api/v2/texts/{key}
     * @secure
     */
    setText: (key: any, data: PutTextInput, params: RequestParams = {}) =>
      this.request<TextItemData, any>({
        path: `/api/v2/texts/${key}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  timelineItems = {
    /**
     * No description
     *
     * @tags Таймлайн
     * @name GetAllTimelineItems
     * @request GET:/api/v2/timeline-items
     */
    getAllTimelineItems: (params: RequestParams = {}) =>
      this.request<GetAllTimelineItemsResult, any>({
        path: `/api/v2/timeline-items`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Таймлайн
     * @name CreateTimelineItem
     * @request POST:/api/v2/timeline-items
     * @secure
     */
    createTimelineItem: (data: TimelineItemInput, params: RequestParams = {}) =>
      this.request<TimelineItemData, any>({
        path: `/api/v2/timeline-items`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Таймлайн
     * @name UpdateTimelineItem
     * @request PUT:/api/v2/timeline-items/{id}
     * @secure
     */
    updateTimelineItem: (
      id: any,
      data: TimelineItemInput,
      params: RequestParams = {},
    ) =>
      this.request<TimelineItemData, ErrorResult>({
        path: `/api/v2/timeline-items/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Таймлайн
     * @name DeleteTimelineItem
     * @request DELETE:/api/v2/timeline-items/{id}
     * @secure
     */
    deleteTimelineItem: (id: any, params: RequestParams = {}) =>
      this.request<UploadChunkedFileUseCase, ErrorResult>({
        path: `/api/v2/timeline-items/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
