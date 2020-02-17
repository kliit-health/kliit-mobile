import { NavigationActions, StackActions } from 'react-navigation';

class NavigationService {
  constructor() {
    this._navigator = null;
  }

  set navigator(navigator) {
    this._navigator = navigator;
  }

  get navigator() {
    return this._navigator;
  }

  navigate(routeName, params, action) {
    this.navigator.dispatch(NavigationActions.navigate({ routeName, params, action }));
  }

  goBack() {
    this.navigator.dispatch(NavigationActions.back());
  }

  push(routeName, params, action) {
    this.navigator.dispatch(StackActions.push({ routeName, params, action }));
  }

  pop(numberOfScreens) {
    this.navigator.dispatch(StackActions.pop({ n: numberOfScreens }));
  }

  reset(routeName, index, params, navigatorKey) {
    const mainAction = NavigationActions.navigate({ routeName, params });
    this.navigator.dispatch(StackActions.reset({ index, actions: [mainAction], key: navigatorKey }));
  }
}

export default new NavigationService();
