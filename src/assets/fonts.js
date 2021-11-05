const type = {
  base: (size = 15, color) => {
    return {
      fontFamily: 'SFUIText-Regular',
      fontSize: size,
      color: color || 'black',
    };
  },
  bold: (size = 15, color) => {
    return {
      fontFamily: 'SFUIText-Bold',
      fontSize: size,
      color: color || 'black',
    };
  },
  medium: (size = 15, color) => {
    return {
      fontFamily: 'SFUIText-Medium',
      fontSize: size,
      color: color || 'black',
    };
  },
  semibold: (size = 15, color) => {
    return {
      fontFamily: 'SFUIText-Semibold',
      fontSize: size,
      color: color || 'black',
    };
  },
  light: (size = 15, color) => {
    return {
      fontFamily: 'SFUIText-Light',
      fontSize: size,
      color: color || 'black',
    };
  },
  heavy: (size = 15, color) => {
    return {
      fontFamily: 'SFUIText-Heavy',
      fontSize: size,
      color: color || 'black',
    };
  },
  emphasis: (size = 15) => {
    return {
      fontFamily: 'SFUIText-Regular',
      fontSize: size,
    };
  },
  poppins: {
    base: (size = 15, color) => {
      return {
        fontFamily: 'Poppins-Regular',
        fontSize: size,
        color: color || 'black',
      };
    },
    bold: (size = 15, color) => {
      return {
        fontFamily: 'Poppins-Bold',
        fontSize: size,
        color: color || 'black',
      };
    },
    light: (size = 15, color) => {
      return {
        fontFamily: 'Poppins-Light',
        fontSize: size,
        color: color || 'black',
      };
    },
    semibold: (size = 15, color) => {
      return {
        fontFamily: 'Poppins-Semibold',
        fontSize: size,
        color: color || 'black',
      };
    },
  },
};

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12,
  tiny: 8.5,
};

const style = {
  h1: {
    ...type.base,
    fontSize: size.h1,
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2,
  },
  h3: {
    ...type.emphasis,
    fontSize: size.h3,
  },
  h4: {
    ...type.base,
    fontSize: size.h4,
  },
  h5: {
    ...type.base,
    fontSize: size.h5,
  },
  h6: {
    ...type.emphasis,
    fontSize: size.h6,
  },
  normal: {
    ...type.base,
    fontSize: size.regular,
  },
  description: {
    ...type.base,
    fontSize: size.medium,
  },
};

export default {
  type,
  size,
  style,
};
