import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated
} from 'react-native';
import { connect } from "react-redux";

import { COLORS, FONTS, SIZES} from "../constants";

const ProfileRadioButton = ({ appTheme, icon, label, isSelected, onPress }
) => {

    const radioAnimated = React.useRef(new Animated.Value(0)).current;

    const circleColorAnimated = radioAnimated.interpolate({
        inputRange: [0, 17],
        outputRange: [COLORS.gray40, COLORS.primary]
    })

    const lineColorAnimated = radioAnimated.interpolate({
        inputRange: [0, 17],
        outputRange: [COLORS.additionalColor4, COLORS.additionalColor13]
    })
    React.useEffect(() => {
        if(isSelected) {
            Animated.timing(radioAnimated, {
                toValue: 17,
                duration: 300,
                useNativeDriver: false
            }).start();
        }else {
            Animated.timing(radioAnimated, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start();
        }
    }, [isSelected])
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 80,
                alignItems: 'center'
            }}
        >
            {/* Icon */}
            <View
                style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    backgroundColor: appTheme?.backgroundColor3
                }}
            >
                <Image
                    source={icon}
                    resizeMode="contain"
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: appTheme?.tintColor
                    }}
                />
            </View>

            {/* Label */}
            <View 
                style={{
                    flex: 1,
                    marginLeft: SIZES.radius
                }}
            >
                <Text
                    style={{
                        color: appTheme?.textColor, 
                        ...FONTS.h3,
                        fontFamily: 'Roboto_Bold'
                    }}
                >
                    {label}
                </Text>
            </View>

            {/* Radio Button */}
            <TouchableOpacity
                style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={onPress}
            >
                <Animated.View
                    style={{
                        width:"100%",
                        height: 5,
                        borderRadius: 3,
                        backgroundColor: lineColorAnimated
                    }}
                />

                <Animated.View 
                    style={{
                        position: 'absolute',
                        left: radioAnimated,
                        width: 25,
                        height: 25,
                        borderRadius: 15,
                        borderWidth: 5,
                        borderColor: circleColorAnimated,
                        backgroundColor: appTheme?.backgroundColor1 
                    }}
                />
           </TouchableOpacity>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        appTheme: state.appTheme,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTheme: (themeType) => {
            return dispatch(toggleTheme(themeType)
        )}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileRadioButton);