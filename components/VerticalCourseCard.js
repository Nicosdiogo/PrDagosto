import React from "react";
import { 
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";

import { IconLabel } from "../components"
import {SIZES, COLORS, FONTS, icons} from "../constants";

const VerticalCourseCard = ({ containerStyle, course}) => {
    return (
        <TouchableOpacity
            style = {{ 
                width: 325,
                ...containerStyle
            }}
        >
            {/* Thumbnail */}
            <Image 
                source={course.thumbnail}
                resizeMode="cover"
                style={{
                    width: "100%",
                    height: 150,
                    marginBottom: SIZES.radius,
                    marginTop: SIZES.radius,
                    borderRadius: SIZES.radius
                }}
            />

            {/* Details */}
            <View
                style={{
                    flexDirection: 'row'
                }}
                >

                {/* Play */}
                <View
                    style={{
                        width: 45,
                        height: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                        backgroundColor: COLORS.primary
                    }}
                >
                    <Image
                        source={icons.play}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />
                </View>
                {/* Info */}
                <View
                    style={{
                        flexShrink: 1,
                        paddingHorizontal: SIZES.radius
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            ...FONTS.h3,
                            fontSize: 18
                            , fontFamily: "Roboto_Bold"
                        }}>
                            {course.title}
                    </Text>

                    <IconLabel
                    icon={icons.time}
                    label={course.duration}
                    containerStyle={{
                        marginTop: SIZES.base
                    }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default VerticalCourseCard;