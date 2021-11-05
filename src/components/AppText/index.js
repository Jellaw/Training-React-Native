import React from 'react';
import {Text} from 'react-native';

import defaultStyles from '~/assets/colors';

function AppText({text, style, ...props}) {
  return (
    <Text style={[defaultStyles.text, style]} {...props}>
      {text}
    </Text>
  );
}

export default AppText;
