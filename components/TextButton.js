import React from 'react';
import {
    TouchableOpacity,
    Text
} from 'react-native';

import {FONTS, COLORS} from "../constants";

const TextButton = ({
    contentContainerStyle, 
    disable,
    label,
    lavelStyle,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent:'center',
                backgroundColor: COLORS.primary,
                ...contentContainerStyle
            }}
            disabled={disable}
            onPress={onPress}
        >
            <Text
                style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                    fontFamily: "Roboto_Bold",
                    ...lavelStyle
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    )   
}

export default TextButton;