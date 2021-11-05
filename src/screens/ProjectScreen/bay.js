import React, {useState} from 'react';
import {Animated} from 'react-native';
import {Svg, Defs, G, Path, Circle} from 'react-native-svg';
import colors from '~/assets/colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const ALERT_STATUS = 'ALERT';
const PAUSE_STATUS = 'PAUSE';
const CHECK_STATUS = 'CHECK';
const ScaffoldingBay = props => {
  const [color, setColor] = useState(colors.green);
  const {item, isShow, isSelect, onPress} = props;

  React.useEffect(() => {
    if (item.status == ALERT_STATUS) return setColor(colors.red);
    if (item.status == PAUSE_STATUS) return setColor(colors.grey);
    if (item.status == CHECK_STATUS) return setColor(colors.orange);
    return setColor(colors.green);
  }, []);

  const anim = React.useRef(new Animated.Value(0));
  const transform = anim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 17],
  });
  const opacity = anim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  React.useEffect(() => {
    if (isSelect) {
      Animated.loop(
        Animated.timing(anim.current, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
      ).start();
    }
  }, [isSelect]);

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="0 0 40 40"
      {...props}>
      <Defs />
      <G id="prefix__scaffolding_img" transform="translate(4345 4221)">
        <Path
          id="prefix__Union_171"
          data-name="Union 171"
          d="M2 40V22.83a3 3 0 010-5.659V3H0V1h2V0h2v1h2v2H4v14.171a3 3 0 010 5.659V40z"
          transform="translate(-4328 -4221)"
          fill="#e9eaf0"
        />
        <Path
          id="prefix__Union_172"
          data-name="Union 172"
          d="M0 32v-1h40v1zm0-5v-1h40v1zM0 1V0h40v1z"
          transform="translate(-4345 -4221)"
          fill="#b4b8c9"
        />
        <Path
          id="prefix__Rectangle_2198"
          data-name="Rectangle 2198"
          transform="translate(-4345 -4185)"
          fill="#818389"
          d="M0 0h40v4H0z"
        />
      </G>
      {isShow && (
        <>
          <Circle id="prefix__node" cx={20} cy={20} r={5} fill={color} />
          {isSelect && (
            <AnimatedCircle
              id="prefix__here"
              cx={20}
              cy={20}
              fill="none"
              r={transform}
              strokeWidth={4}
              stroke={color}
              opacity={opacity}
            />
          )}
        </>
      )}
      <Path
        id="prefix__bay_link"
        fill="rgba(255,255,255,0)"
        onPress={onPress}
        d="M0 0h40v40H0z"
      />
    </Svg>
  );
};

export default ScaffoldingBay;
