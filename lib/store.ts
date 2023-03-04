import S3 from "aws-sdk/clients/s3";

class Store {
  static #s3 = null;
  #nsp: string;
  #s3UrlPrefix = process.env.S3_URL_PREFIX;

  constructor(nsp: string) {
    this.#nsp = nsp;
  }

  getKey(key: string): string {
    return "store/" + this.#nsp + "/" + key.replace(/^\//, "");
  }

  get s3() {
    // @ts-expect-error TODO: fix type mismatch
    return (Store.#s3 =
      Store.#s3 ||
      new S3({
        apiVersion: "2006-03-01",
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      }));
  }

  async get(key: string) {
    return fetch(this.#s3UrlPrefix + this.getKey(key)).then(res => {
      if (res.status === 403) return null;
      if (!res.ok) throw new Error("Store error");
      return res.arrayBuffer();
    });
  }

  async getText(key: string) {
    return fetch(this.#s3UrlPrefix + this.getKey(key)).then(res => {
      if (res.status === 403) return null;
      if (!res.ok) throw new Error("Store error");
      return res.text();
    });
  }

  async getJSON(key: string) {
    return fetch(this.#s3UrlPrefix + this.getKey(key)).then(res => {
      if (res.status === 403) return null;
      if (!res.ok) throw new Error("Store error");
      return res.json();
    });
  }

  // TODO: implement as ReadableStream from `fetch`
  // getAsStream(_key) {}

  async set(key: string, Body: string | ArrayBuffer | Buffer | Blob) {
    await this.s3
      .upload({
        // @ts-expect-error TODO: fix type mismatch
        Bucket: process.env.S3_BUCKET,
        Key: this.getKey(key),
        Body,
      })
      .promise();
  }
}

export function createStore(nsp: string) {
  return new Store(nsp);
}

// ideally this would be VERCEL_PROJECT_ID
// but it doesn't exist ¯\_(ツ)_/¯
const DEFAULT_NAMESPACE = "rauchg-blog";
// TODO: fix type mismatch
let defaultStore: any = null;

export function get(key: string): Promise<ArrayBuffer | null> {
  if (defaultStore === null) {
    defaultStore = createStore(DEFAULT_NAMESPACE);
  }

  return defaultStore.get(key);
}

export function set(key: string, body: string | ArrayBuffer): Promise<void> {
  if (defaultStore === null) {
    defaultStore = createStore(DEFAULT_NAMESPACE);
  }

  return defaultStore.set(key, body);
}

export function getJSON(key: string): Promise<any> {
  if (defaultStore === null) {
    defaultStore = createStore(DEFAULT_NAMESPACE);
  }

  return defaultStore.getJSON(key);
}

export function getText(key: string): Promise<string> {
  if (defaultStore === null) {
    defaultStore = createStore(DEFAULT_NAMESPACE);
  }

  return defaultStore.getText(key);
}
