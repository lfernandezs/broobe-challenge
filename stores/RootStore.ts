import AsyncStorage from "@react-native-async-storage/async-storage";
import MetricsStore from "./MetricsStore/MetricsStore";
import { Storage } from "./MetricsStore/MetricsStore.types";
import { makeAutoObservable } from "mobx";

let sharedInstance: RootStore;

export default class RootStore {
    metricsStore: MetricsStore;

    constructor(storage: Storage) {
        this.metricsStore = new MetricsStore(storage);
        makeAutoObservable(this);
    }

    static shared = () => {
        if (sharedInstance) {
            return sharedInstance;
        }
        sharedInstance = new RootStore(AsyncStorage);
        return sharedInstance;
    }
}