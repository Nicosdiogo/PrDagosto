import React, { Children } from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    ScrollView
} from 'react-native';

import { 
    IconButton,
    HorizontalCourseCard,
    TextButton,
    VerticalCourseCard,
    LineDivider,
    CategoryCard
} from "../../components";
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    images,
    dummyData
 } from "../../constants"

import { useFonts, Roboto_700Bold, Roboto_900Black,Roboto_400Regular } from '@expo-google-fonts/roboto';
 
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation} from "@react-navigation/native"
import Carousel from 'react-native-snap-carousel';

const Section = ({containerStyle, title, onPress, children }) => {
    return (
        <View
            style={{
                ...containerStyle
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text
                    style={{
                        flex: 1,
                        ...FONTS.h2,
                        
                    }}
                >
                    {title}
                </Text>

                <TextButton
                    contentContainerStyle={{
                        width: 100  ,
                        borderRadius: 30,
                        backgroundColor: COLORS.primary
                    }}
                    label="Exibir Todos"
                    onPress={onPress}
                />
            </View>

            {children}
            
        </View>
    )
}

const Home = () => {
    
    const navigation = useNavigation();

    function renderHeader() {
        
        const [fontsLoaded] = useFonts({
            // h1
            'Roboto_Black': require("../../assets/fonts/Roboto-Black.ttf"),
            // h2 h3 h4 h5
            'Roboto_Bold': require("../../assets/fonts/Roboto-Bold.ttf"),
            // body1 body2 body3 body4 body5
            'Roboto_Regular': require("../../assets/fonts/Roboto-Regular.ttf")
        });

        if (!fontsLoaded)  {
            return null;
        }

        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    marginBottom: 10,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center'
                }}
            >
                {/* Greetings */}
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Text style={{ ...FONTS.h2,   }}>Olá, Programadores!</Text>
                    <Text style={{
                                color: COLORS.gray50,
                                
                    }}>
                        Domingo, 21 de Maio de 2023
                    </Text>
                </View>

                {/* Notification */}
                <IconButton 
                    icon = {icons.notification}
                    iconStyle={{
                        tintColor: COLORS.black
                    }}
                />
            </View>
        )
    }

    function renderStartLearning() {
        return (
            <ImageBackground 
                source={images.featured_bg_image}
                style={{
                    alignItems: 'flex-start',
                    marginTop: 10,
                    marginHorizontal: SIZES.padding,
                    padding: 15
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                
                {/* Info */}
                <View>
                    <Text 
                        style={{
                            color: COLORS.white,
                            ...FONTS.body2,
                            
                    }}
                    >
                        1º De Agosto
                    </Text>
                    <Text 
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2,
                            
                    }}>
                        Aprenda tudo sobre nós com a nossa nova Aplicação!
                    </Text>
                    
                </View>
                {/* Image */}
                <Image
                source={images.start_learning}
                style={{
                    width: "100%",
                    height: 160,
                    marginBottom: SIZES.padding,
                    marginTop: 10
                }}
                labelStyle={{
                    color: COLORS.black
                }}
                />
                {/*Button */}
                <TextButton
                label="Saber Mais"
                contentContainerStyle={{
                    height:40,
                    paddingHorizontal: SIZES.padding,
                    borderRadius: 20,
                    backgroundColor: COLORS.white
                }}
                lavelStyle={{
                    color: COLORS.black
                }}
                />

            </ImageBackground>
        )
    }

    function renderCourses(){
        return(
        <Carousel
        loop
                itemWidth={SIZES.width}
                sliderWidth={SIZES.width} 
                useScrollView={true}  
            
               horizontal={true}
                data={dummyData.courses_list_2}
                showsHorizontalScrollIndicator={false}
                marginHorizontal={10}
    
                renderItem={({item, index}) => (
                    <VerticalCourseCard
                        containerStyle={{
                            marginLeft: index == 0 ? SIZES.
                            padding: SIZES.radius,
                            marginRight: index == dummyData.
                            courses_list_1.length - 1 ? SIZES.
                            padding : 0,
                            
                       }}
                       course={item}
                    />
                    
                )}
            />
        )
    }

    function renderCategories() {
        return (
            <Section
                title="Categorias"
            >
                <FlatList
                    horizontal
                    pagingEnabled={false}
                    itemWidth={SIZES.width}
                    sliderWidth={SIZES.width} 
                    useScrollView
                    
                    data={dummyData.categories}
                    listKey="Categories"
                    keyExtractor={item => `Categories-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                   
                    contentContainerStyle={{
                        marginTop: 10
                    }}
                    renderItem={({item, index}) => (
                        <CategoryCard
                            SharedElementPrefix="Home"
                            category={item}
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : SIZES.base,
                                marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0,
                            }}
                            onPress={() => navigation.navigate("CourseListing", {category: item, sharedElementPrefix: "Home"})}
                        />
                    )}
                />
            </Section>
        )
    }

    function renderPopularCourses() {
        return (
            <Section
                title="Cursos Populares"
                containerStyle={{
                    marginTop: 30
                }}
            >
                <FlatList
                    data={dummyData.courses_list_2}
                    listKey="PopularCourses"
                    scrollEnabled={false}
                    keyExtractor={item => `PopularCourses-${item.
                    id}`}
                    contentContainerStyle={{
                        marginTop: SIZES.radius,
                        paddingHorizontal: SIZES.padding
                    }}
                    renderItem={({item, index}) => (
                        <HorizontalCourseCard
                            course={item}
                            containerStyle={{
                                marginVertical: SIZES.padding,
                                marginTop: index == 0 ? SIZES.
                                radius : SIZES.padding,
                            }}

                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <LineDivider
                            style={{
                                backgroundColor: COLORS.gray20
                            }}

                        />
                    )
                }
                />
            </Section>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Header */}
            {renderHeader()}
            {/* Content */}
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 150,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Start Learning */}
                {renderStartLearning()}

                {/* Courses */}
                {renderCourses()}

                <LineDivider
                    lineStyle={{
                        marginVertical: SIZES.padding
                    }}
                />

                {/* Catetories */}
               {renderCategories()}

               {/* Popular Courses*/}
               {renderPopularCourses()}
             </ScrollView>
        </View>
    )
}

export default Home;