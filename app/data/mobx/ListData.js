import { observable, computed, runInAction, action } from "mobx";

export default class ListData {
  constructor() {
    setImmediate(() => {
      this.refresh();
    });
  }

  @observable isRefreshing = true;

  @observable data = [];

  @action
  refresh = () => {
    this.isRefreshing = true;
    this.fetch();
  };

  async fetch() {
    if (!this.isRefreshing) {
      return;
    }
    runInAction(() => {
      this.fetchData();
    });
  }

  async fetchData(func) {
  }
}
