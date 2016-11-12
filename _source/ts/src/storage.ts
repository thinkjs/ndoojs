export class Storage {
  static _data: any = {};
  static REWRITE: number = 1;
  static DESTROY: number = 2;
  static _lib: {
      has(data: any, key: string): boolean;
  };

  constructor(key, value, option: number) {
    let destroy = option & Storage.DESTROY;
    let rewrite = option & Storage.REWRITE;
    let data = Storage._data;

    if (value === undefined) {
      return data[key];
    }

    if (destroy) {
      delete data[key];
      return true;
    }

    if (!rewrite && Storage._lib.has(data, key)) {
      return false;
    }

    return data[key] = value;
  }
}