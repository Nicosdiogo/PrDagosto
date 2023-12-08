import React from 'react'
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import { IconLabel } from "../components";
import {SIZES, COLORS, FONTS, icons } from "../constants";
import { processFontFamily } from 'expo-font';

const HorizontalCourseCard = ({ containerStyle, course }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                ...containerStyle
            }}
        >
            {/* Thumbnail */}
            <ImageBackground
                source={course.thumbnail}
                resizeMode="cover"
                style={{
                    width: 110,
                    height: 110,
                    marginBottom: 1
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                <View
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                    backgroundColor: COLORS.white
                }}
                >
                    <Image
                        source={icons.favourite}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 10,
                            tintColor: course.is_favourite ?
                            COLORS.secondary : COLORS.
                            additionalColor4
                        }}
                    
                    />

                </View>
            </ImageBackground>

            {/* Details */}
            <View
                style={{
                    flex: 1,
                    marginLeft: SIZES.base
                }}
            >
                {/* Title */}
                <Text
                    style={{
                        ...FONTS.h3,
                        fontSize: 18,
                        fontFamily: "Roboto_Regular"
                    }}
                >
                    {course.title}
                </Text>

                {/* Instructor  DUration */}
                <View

                   style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.base
                    }}
                >
                        <Text
                            style={{
                                ...FONTS.body4,
                                fontFamily: "Roboto_Regular"
                            }}
                        >
                            {course.instructor}
                            
                        </Text>

                        <IconLabel 
                            icon={icons.time}
                            label={course.duration}
                            containerStyle={{
                                marginLeft: SIZES.base
                            }}
                            iconStyle={{
                                width: 15,
                                height: 15
                            }}
                            labelStyle={{
                                ...FONTS.body4,
                                fontFamily: "Roboto_Regular"
                            }}
                        /> 
                </View>
                {/* Price & Ratings */}
                <View
                    
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: SIZES.base
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h2,
                            fontFamily: "Roboto_Black",
                            color: "black"
                        }}
                    >
                        {course.price.toFixed(3)},00 AKZ
                    </Text>
               

                <IconLabel
                    icon={icons.star}
                    label={course.ratings}
                    containerStyle={{
                        marginLeft: SIZES.base
                    }}
                    iconStyle={{
                        width: 15,
                        height: 15,
                        tintColor: COLORS.primary2
                    }}
                    labelStyle={{
                        marginLeft: 5,
                        color: COLORS.black,
                        ...FONTS.h3,
                        fontFamily: "Roboto_Bold"
                    }}
                />
            </View>
        </View>
        </TouchableOpacity>
    )   
}

export default HorizontalCourseCard;