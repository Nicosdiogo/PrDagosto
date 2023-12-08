import React from "react";
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    Text,
    ImageBackground,
    View
} from 'react-native';
import { SharedElement } from "react-navigation-shared-element";

import {COLORS, FONTS, SIZES } from "../constants";




const CategoryCard = ({ SharedElementPrefix, category, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                height: 150,
                width: 200,
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* ImageBackground */}

            <SharedElement
                id={`${SharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
                style={[StyleSheet.absoluteFillObject]} 
            >
                <Image
                    source={category?.thumbnail}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: SIZES.radius      
                    }}
                />
            </SharedElement>
            
            {/* Title */}
            <View
                style={{
                    position: "absolute",
                    bottom: 50,
                    left: 8
                }}    
            >
                <SharedElement
                    id={`${SharedElementPrefix}-CategoryCard-Title-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Text
                        style={{
                            position: 'absolute', 
                            color: COLORS.white,
                            ...FONTS.h2,
                            fontFamily: "Roboto_Bold"
                        }}
                    >
                        {category?.title}
                    </Text>
                </SharedElement>
            </View>
            
        </TouchableOpacity>
    )
}

export default CategoryCard;