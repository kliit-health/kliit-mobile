//  Created by react-native-create-bridge

import React, { Component } from 'react'
import { requireNativeComponent } from 'react-native'

const AppInstallDate = requireNativeComponent('AppInstallDate', AppInstallDateView)

export default class AppInstallDateView extends Component {
  render () {
    return <AppInstallDate {...this.props} />
  }
}

AppInstallDateView.propTypes = {
  exampleProp: React.PropTypes.any
}
