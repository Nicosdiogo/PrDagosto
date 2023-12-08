
import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Modal,
    FlatList
} from 'react-native';
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    images,
    dummyData
} from "../../constants";
import {
    IconButton,
    HorizontalCourseCard,
    TextButton,
    VerticalCourseCard,
    LineDivider,
    CategoryCard
} from "../../components";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    runOnJS
} from "react-native-reanimated";
import Calender from 'react-native-calendars/src/calendar';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import { onPress } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';

const Menu = ({ appTheme, toggleTheme }) => {

    const [selected, setSelected] = useState('');
    LocaleConfig.locales['pt-br'] = {
        monthNames: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
        ],
        monthNamesShort: [
            'Jan.',
            'Fev.',
            'Mar.',
            'Abr.',
            'Mai.',
            'Jun.',
            'Jul.',
            'Ago.',
            'Set.',
            'Out.',
            'Nov.',
            'Dez.',
        ],
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
    };

    LocaleConfig.defaultLocale = 'pt-br';

    const [showModal, setShowModal ] = useState(false);
    const [showModalClassif, setShowModalClassif ] = useState(false);
    const [showModalResultado, setShowModalResultado ] = useState(false);
    const [showModalEquipa, setShowModalEquipa ] = useState(false);
    const [showModalBilhetes, setShowModalBilhetes ] = useState(false);

    const [newCourseNotification, setNewCourseNotification] = React.useState(false)
    const [studyReminder, setStudyReminder] = React.useState(false)



    const dayUnderView = () => {
        return (
            <View>
                <Text>This is day under view for custom</Text>
            </View>
        );
    };


    const renderDayIcon = () => (
        <IconButton
            icon={icons.sun}
            iconStyle={{
                tintColor: COLORS.black,
            }}
            onPress={() => toggleThemeHandler()}
        />
    );




    const markedDates = {
        '2023-07-15': {
            selected: true,
            customStyles: {
                container: { backgroundColor: 'green', borderRadius: 10 },
                text: { color: 'white' },
            },
            image: require("../../assets/images/bg_3.png"),
        },
        '2023-07-20': {
            selected: true,
            customStyles: {
                container: { backgroundColor: 'red', borderRadius: 10 },
                text: { color: 'black' },
            },
            image: require("../../assets/images/bg_3.png"),
        },
        // Adicione mais dias conforme necessário
    };

    const renderCustomDay = (day, item) => {
        const dateString = day.dateString;
        const date = new Date(dateString);
        const dayNumber = date.getDate().toString();
        // Verifica se a data atual está na lista de datas marcadas
        if (markedDates[day.dateString]) {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: item?.customStyles?.text?.color }}>{dayNumber}</Text>
                    <Image source={item?.image} style={{ width: 25, height: 25, marginTop: 5 }} />
                </View>
            );
        }
        // Retorna o componente padrão para as outras datas
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>{dayNumber}</Text>
            </View>
        );
    };

    // Handler

    function toggleThemeHandler() {
        if (appTheme?.name == "light") {
            toggleTheme("dark")
        } else {
            toggleTheme("light")
        }
    }

    // Render

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 0,
                    paddingHorizontal: SIZES.padding,
                    justifyContent: 'space-between',
                    backgroundColor: COLORS.secondary1,
                    paddingBottom: 10,
                    paddingTop: 50,
                    marginBottom: 10
                }}
            >
                {/* Profile Image */}
                <TouchableOpacity
                    style={{
                        width: 30,
                        height: 30
                    }}
                >
                    <Image
                        source={images.profile}
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 40,
                            borderWidth: 1,
                            borderColor: COLORS.white
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            width: "100%",
                            height: "100%",
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}
                    >

                    </View>
                </TouchableOpacity>

                <IconButton
                    icon={icons.logoPri}
                    iconStyle={{
                        tintColor: COLORS.white,
                    }}
                />

                <IconButton
                    icon={icons.sun}
                    iconStyle={{
                        tintColor: COLORS.white
                    }}
                    onPress={() => toggleThemeHandler()}
                />
            </View>
        )
    }

    function renderSection() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'flex-start',
                }}
            >

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.black,
                        borderRadius: 10,
                        margin: 10,
                        color: COLORS.white,
                        width: "95%",
                        fontSize: SIZES.padding,
                        padding: SIZES.padding

                    }}
                    onPress={() => setShowModal(true)}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: SIZES.padding
                            , ...FONTS.h2
                        }}
                    >
                        Calendário
                    </Text>
                    <IconButton
                        icon={icons.canlendario1}
                        iconStyle={{
                            tintColor: appTheme?.tintColor,
                        }}
                    />
                </TouchableOpacity>

                {/* Modal Calendar */}

                <Modal visible={showModal} animationType="slide">

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            backgroundColor: COLORS.primary2,
                            paddingBottom: 10,
                            justifyContent: 'space-between',
                            fontSize: SIZES.padding,
                            padding: 10,
                            paddingTop: 50
                        }}
                    >

                        <IconButton
                            icon={icons.back}
                            iconStyle={{
                                tintColor: COLORS.black,
                                width: 25
                            }}
                            containerStyle={{
                                top: -2,
                                width: 60,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 25,
                                backgroundColor: COLORS.white
                            }}
                            onPress={() => setShowModal(false)}
                        />

                        <Text
                            style={{
                                color: COLORS.white,
                                fontSize: SIZES.padding,
                                marginTop: 5,
                                left: -5
                                , ...FONTS.h2
                            }}
                        >
                            CALENDÁRIO
                        </Text>

                        <IconButton
                            icon={icons.logoPri}
                            iconStyle={{
                                tintColor: COLORS.white,
                            }}
                        />

                    </TouchableOpacity>

                    {/* CALENDARIO */}
                    {/*<FlatList
                        data={dummyData.calendario}
                        numColumns={1}
                        horizontal
                        scrollEnabled={false}
                        listkey="Browsecalendario"
                        keyExtractor={item => `Browsecalendario-${item.id}`}
                        contentContainerStyle={{
                            flex: 1,
                            justifyContent: 'center',
                            marginTop: SIZES.radius
                        }}
                        renderItem={({item, index}) => (
                            <CategoryCard
                                SharedElementPrefix="Search"
                                category={item}
                                containerStyle={{
                                  
                                    justifyContent: 'center',
                                    height: 50,
                                    width: 40,
                                    marginTop: SIZES.radius,
                                    marginLeft: 1,
                                    
                                   
                                }}
                            />
                        )}
                    />*/}

                    <View style={{ flex: 1 }}>
                        <Calendar
                            style={{ borderWidth: 1, borderColor: 'black', }}
                            hideExtraDays
                            minDate={'2023-05-10'}
                            maxDate={'2023-12-31'}

                            //hideArrows={true}
                            //displayLoadingIndicator
                            markingType={'period'}

                            dayComponent={({ date, state, markedDates }) => {

                                return (
                                    <TouchableOpacity
                                        onPress={() => { console.log('Dia Selecionado', date.dateString) }}
                                        markedDates={{ '2023-07-27': { disabled: true, customStyles: {
                                            container: { backgroundColor: 'green', borderRadius: 10, width: 25, height: 25 },
                                            text: { color: 'white' },
                                        }, } }}
                                        style={{
                                            width: 50,
                                            height: 50,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            //backgroundColor: date.dateString === '2023-07-27' ? 'green' : 'white',

                                        }}
                                    >
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                hideArrows: state === 'disabled' ? true : 'black',
                                                fontSize: 20,
                                            }}
                                        >
                                            {date.day}
                                        </Text>
                                        
                                        

                                     
                                        <IconButton
                                            
                                            icon={date.dateString === '2023-07-21' ? icons.Desp : null |
                                                  date.dateString ===  '2023-07-12' ? icons.petro : null  |
                                                  date.dateString ===  '2023-07-24' ? icons.academicaLobito : null |
                                                  date.dateString ===  '2023-07-03' ? icons.SagEsp : null |
                                                  date.dateString ===  '2023-07-07' ? icons.SportCab : null |
                                                  date.dateString ===  '2023-07-09' ? icons.libolo : null |
                                                  date.dateString ===  '2023-07-17' ? icons.kabuscorp : null |
                                                  date.dateString ===  '2023-07-27' ? icons.FCBravosM : null
                                                
                                                }
                                            iconStyle={{
                                                tintColor: date.dateString === '2023-07-21' ? null : 'white' | 
                                                           date.dateString ===  '2023-07-12' ? null : 'white' | 
                                                           date.dateString ===  '2023-07-24' ? null : 'white' | 
                                                           date.dateString ===  '2023-07-03' ? null : 'white' |
                                                            date.dateString ===  '2023-07-07' ? null : 'white' |
                                                            date.dateString ===  '2023-07-09' ? null : 'white' |
                                                            date.dateString ===  '2023-07-17' ? null : 'white' |
                                                            date.dateString ===  '2023-07-27' ? null : 'white' 
                                            }}
                                        />

                                    </TouchableOpacity>
                                )
                            }}

                            markedDates={{
                                '2023-07-15': {
                                    marked: true, customStyles: {
                                        container: { backgroundColor: 'green', borderRadius: 10, width: 25, height: 25 },
                                        text: { color: 'white' },
                                    },
                                },
                                '2023-07-24': { marked: true, doxtColor: 'red' },
                                '2023-07-25': { marked: true, dotColor: 'red' },
                                '2023-07-26': { marked: true },
                                '2023-07-27': { disabled: true, disableTouchEvent: false }
                            }}

                        // dayComponent={renderCustomDay}

                        />

                       
                    </View>
                </Modal >

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.black,
                        borderRadius: 10,
                        top: -10,
                        margin: 10,
                        color: COLORS.white,
                        width: "95%",
                        fontSize: SIZES.padding,
                        padding: SIZES.padding

                    }}
                    onPress={() => setShowModalClassif(true)}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: SIZES.padding
                            , ...FONTS.h2
                        }}
                       
                    >
                        Classificação
                    </Text>
                    <IconButton
                        icon={icons.classifi}
                        iconStyle={{
                            tintColor: COLORS.white,
                        }}
                    />
                </TouchableOpacity>

                {/*     MODAL CLASSIFICAÇÃO AQUI */}
                <Modal visible={showModalClassif} animationType="slide">

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            backgroundColor: COLORS.primary2,
                            paddingBottom: 10,
                            justifyContent: 'space-between',
                            fontSize: SIZES.padding,
                            padding: 10,
                            paddingTop: 50
                        }}
                    >

                        <IconButton
                            icon={icons.back}
                            iconStyle={{
                                tintColor: COLORS.black,
                                width: 25
                            }}
                            containerStyle={{
                                top: -2,
                                width: 60,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 25,
                                backgroundColor: COLORS.white
                            }}
                            onPress={() => setShowModalClassif(false)}
                        />

                        <Text
                            style={{
                                color: COLORS.white,
                                fontSize: SIZES.padding,
                                marginTop: 5,
                                left: -5
                                , ...FONTS.h2
                            }}
                        >
                            Classificação
                        </Text>

                        <IconButton
                            icon={icons.logoPri}
                            iconStyle={{
                                tintColor: COLORS.white,
                            }}
                        />

                    </TouchableOpacity>

                    

                    <View style={{ flex: 1 }}>
                        
                                      
                       
                    </View>
                </Modal >






                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.black,
                        borderRadius: 10,
                        top: -20,
                        margin: 10,
                        color: COLORS.white,
                        width: "95%",
                        fontSize: SIZES.padding,
                        padding: SIZES.padding

                    }}
                    onPress={() => setShowModalResultado(true)}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: SIZES.padding
                            , ...FONTS.h2
                        }}
                    >
                        Resultados
                    </Text>
                    <IconButton
                        icon={icons.resultado}
                        iconStyle={{
                            tintColor: COLORS.white,
                        }}
                    />
                </TouchableOpacity>

                        {/*     MODAL RESULTADO AQUI */}
                <Modal visible={showModalResultado} animationType="slide">

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            backgroundColor: COLORS.primary2,
                            paddingBottom: 10,
                            justifyContent: 'space-between',
                            fontSize: SIZES.padding,
                            padding: 10,
                            paddingTop: 50
                        }}
                    >

                        <IconButton
                            icon={icons.back}
                            iconStyle={{
                                tintColor: COLORS.black,
                                width: 25
                            }}
                            containerStyle={{
                                top: -2,
                                width: 60,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 25,
                                backgroundColor: COLORS.white
                            }}
                            onPress={() => setShowModalResultado(false)}
                        />

                        <Text
                            style={{
                                color: COLORS.white,
                                fontSize: SIZES.padding,
                                marginTop: 5,
                                left: -5
                                , ...FONTS.h2
                            }}
                        >
                            Resultados
                        </Text>

                        <IconButton
                            icon={icons.logoPri}
                            iconStyle={{
                                tintColor: COLORS.white,
                            }}
                        />

                    </TouchableOpacity>

                    

                    <View style={{ flex: 1 }}>
                        
                                      
                       
                    </View>
                </Modal >


                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.black,
                        borderRadius: 10,
                        top: -30,
                        margin: 10,
                        color: COLORS.white,
                        width: "95%",
                        fontSize: SIZES.padding,
                        padding: SIZES.padding

                    }}
                    onPress={() => setShowModalEquipa(true)}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: SIZES.padding
                            , ...FONTS.h2
                        }}
                    >
                        Equipa
                    </Text>
                    <IconButton
                        icon={icons.campo}
                        iconStyle={{
                            tintColor: COLORS.white,
                        }}
                    />
                </TouchableOpacity>

                       {/* MODAL RESULTADO AQUI */}
                <Modal visible={showModalEquipa} animationType="slide">

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            backgroundColor: COLORS.primary2,
                            paddingBottom: 10,
                            justifyContent: 'space-between',
                            fontSize: SIZES.padding,
                            padding: 10,
                            paddingTop: 50
                        }}
                    >

                        <IconButton
                            icon={icons.back}
                            iconStyle={{
                                tintColor: COLORS.black,
                                width: 25
                            }}
                            containerStyle={{
                                top: -2,
                                width: 60,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 25,
                                backgroundColor: COLORS.white
                            }}
                            onPress={() => setShowModalEquipa(false)}
                        />

                        <Text
                            style={{
                                color: COLORS.white,
                                fontSize: SIZES.padding,
                                marginTop: 5,
                                left: -5
                                , ...FONTS.h2
                            }}
                        >
                            Equipa
                        </Text>

                        <IconButton
                            icon={icons.logoPri}
                            iconStyle={{
                                tintColor: COLORS.white,
                            }}
                        />

                    </TouchableOpacity>

                    

                    <View style={{ flex: 1 }}>
                        
                                      
                       
                    </View>
                </Modal >

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.black,
                        borderRadius: 10,
                        top: -40,
                        margin: 10,
                        color: COLORS.white,
                        width: "95%",
                        fontSize: SIZES.padding,
                        padding: SIZES.padding

                    }}
                    onPress={() => setShowModalBilhetes(true)}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: SIZES.padding
                            , ...FONTS.h2
                        }}
                    >
                        Compra de Bilhetes
                    </Text>
                    <IconButton
                        icon={icons.ingresso}
                        iconStyle={{
                            tintColor: COLORS.white,
                        }}
                    />
                </TouchableOpacity>

                  {/* MODAL BILHETES AQUI */}
                <Modal visible={showModalBilhetes} animationType="slide">

                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            backgroundColor: COLORS.primary2,
                            paddingBottom: 10,
                            justifyContent: 'space-between',
                            fontSize: SIZES.padding,
                            padding: 10,
                            paddingTop: 50
                        }}
                    >

                        <IconButton
                            icon={icons.back}
                            iconStyle={{
                                tintColor: COLORS.black,
                                width: 25
                            }}
                            containerStyle={{
                                top: -2,
                                width: 60,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 25,
                                backgroundColor: COLORS.white
                            }}
                            onPress={() => setShowModalBilhetes(false)}
                        />

                        <Text
                            style={{
                                color: COLORS.white,
                                fontSize: SIZES.padding,
                                marginTop: 5,
                                left: -5
                                , ...FONTS.h2
                            }}
                        >
                            Compra de Bilhetes
                        </Text>

                        <IconButton
                            icon={icons.logoPri}
                            iconStyle={{
                                tintColor: COLORS.white,
                            }}
                        />

                    </TouchableOpacity>

                    

                    <View style={{ flex: 1 }}>
                        
                                      
                       
                    </View>
                </Modal >

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.black,
                        borderRadius: 10,
                        top: -50,
                        margin: 10,
                        color: COLORS.white,
                        width: "95%",
                        fontSize: SIZES.padding,
                        padding: SIZES.padding

                    }}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: SIZES.padding
                            , ...FONTS.h2
                        }}
                    >
                        Loja Oficial
                    </Text>
                    <IconButton
                        icon={icons.shop}
                        iconStyle={{
                            tintColor: COLORS.white,
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.black,
                        borderRadius: 10,
                        top: -60,
                        margin: 10,
                        color: COLORS.white,
                        width: "95%",
                        fontSize: SIZES.padding,
                        padding: SIZES.padding

                    }}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: SIZES.padding
                            , ...FONTS.h2
                        }}
                    >
                        Radio D'Agosto
                    </Text>
                    <IconButton
                        icon={icons.radio}
                        iconStyle={{
                            tintColor: COLORS.white,
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        justifyContent: 'space-between',
                        backgroundColor: COLORS.primary2,
                        borderRadius: 10,
                        top: -70,
                        margin: 10,
                        width: "95%",
                        fontSize: SIZES.padding,
                        padding: SIZES.padding

                    }}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: SIZES.padding,
                            ...FONTS.h2
                        }}
                    >
                        Definições
                    </Text>
                    <IconButton
                        icon={icons.def}
                        iconStyle={{
                            tintColor: COLORS.white,
                        }}
                    />
                </TouchableOpacity>





            </View >
        )
    }



    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.gray10
            }}
        >

            {/* Header */}
            {renderHeader()}



            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 50,

                }}
            >

                {/* Section */}
                {renderSection()}

            </ScrollView>
        </View>
    )
}




export default Menu;