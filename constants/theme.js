import {Dimensions} from 'react-native';
const { width, height } = Dimensions.get("window");

export const COLORS ={
    primary: '#696969', // Gray
    secondary: '#1e90ff', // Blue
    white: '#FFFFFF',
    black: '#000000',
    black2: '#282828',
    lightGrey: '#919191',
    darkGrey:'#757575'
};

export const SIZES = {
    width,
    height,

    h1:20,
    h2:12,
};

export const FONTS = {

    h1:{fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h1, lineHeight: 30},
    h2:{fontFamily: 'Poppins-Light', fontSize: SIZES.h2, lineHeight: 18},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;