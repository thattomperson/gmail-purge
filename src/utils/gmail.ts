interface Label {
  id: string;
  labelListVisibility?: 'labelHide' | 'labelShowIfUnread' | 'labelShow';
  messageListVisibility: 'hide' | 'show';
  name: string;
  type: 'system' | 'user';
}

interface LabelsResponse {
  labels: Label[];
}

interface LabelDetailsRequest {
  id: string;
}

interface LabelDetailsResponse {
  id: string;
  messagesTotal: number;
  messagesUnread: number;
  name: String;
  threadsTotal: number;
  threadsUnread: number;
  type: 'system' | 'user';
}

interface MessagesRequest {
  maxResults?: number;
  pageToken?: string;
  labelIds?: string | string[];
  q?: string;
  includeSpamTrash?: boolean;
}

interface MessagesResponse {
  messages: {
    id: string;
  }[];
}

interface DeleteMessagesRequest {
  ids: string[];
}

interface GetMessageRequest {
  id: string;
  format?: 'metadata' | 'raw' | 'full' | 'raw';
  metadataHeaders?: string[];
}

interface MessagePart {
  partId: string;
  mimeType: string;
  filename: string;
  headers: {
    name: string;
    value: string;
  }[];
  body: {
    attachmentId: string;
    size: number;
    data: string;
  };
  parts: MessagePart[];
}

interface GetMessageResponse {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  historyId: string;
  internalDate: string;
  payload: MessagePart;
  sizeEstimate: number;
  raw: string;
}

type DeleteMessagesResponse = null;

export default class Client {
  accessToken: string;
  baseUrl = 'https://gmail.googleapis.com';
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  async get<Input extends Record<string, any>, Output extends any>(
    path: string,
    input: Input,
  ): Promise<Output> {
    const url = new URL(path, this.baseUrl);
    Object.keys(input).forEach((key) => url.searchParams.set(key, input[key]));
    url.searchParams.set('access_token', this.accessToken);

    return fetch(url).then((res) => res.json() as Output);
  }

  async post<Input extends Record<string, any>, Output extends any>(
    path: string,
    input: Input,
  ): Promise<Output> {
    const url = new URL(path, this.baseUrl);
    url.searchParams.set('access_token', this.accessToken);

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(input),
    }).then((res) => res.json() as Output);
  }

  async getLabels() {
    return this.get<Record<string, any>, LabelsResponse>(
      '/gmail/v1/users/me/labels',
      {},
    );
  }

  async getLabelDetails({ id, ...opts }: LabelDetailsRequest) {
    return this.get<Omit<LabelDetailsRequest, 'id'>, LabelDetailsResponse>(
      `/gmail/v1/users/me/labels/${id}`,
      opts,
    );
  }

  async getMessages(opts: MessagesRequest) {
    return this.get<MessagesRequest, MessagesResponse>(
      `/gmail/v1/users/me/messages`,
      opts,
    );
  }

  async deleteMessages(opts: DeleteMessagesRequest) {
    return this.post<DeleteMessagesRequest, DeleteMessagesResponse>(
      '/gmail/v1/users/me/messages/batchDelete',
      opts,
    );
  }

  async getMessage({ id, ...opts }: GetMessageRequest) {
    return this.get<Omit<GetMessageRequest, 'id'>, GetMessageResponse>(
      `/gmail/v1/users/me/messages/${id}`,
      opts,
    );
  }
}
