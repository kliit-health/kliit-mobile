//  Created by react-native-create-bridge
import { NativeModules, NativeEventEmitter } from "react-native";
const { AppInstallDate } = NativeModules;
const AppInstallDateEmitter = new NativeEventEmitter(AppInstallDate);
export default {
  getInstallDate() {
    return AppInstallDate.getInstallDate();
  },
  emitter: AppInstallDateEmitter,
  EXAMPLE_CONSTANT: AppInstallDate.EXAMPLE_CONSTANT,
};

