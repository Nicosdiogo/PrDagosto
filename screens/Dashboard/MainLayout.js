import React from 'react';
import {View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { Shadow } from "react-native-shadow-2";
import { 
    Home,
    Menu,
    Profile,
    Search } 
    from '/react-native/app/PrDagosto/screens';
import { COLORS, SIZES, FONTS, constants } from '/react-native/app/PrDagosto/constants';
import Notifications from './Notifications';

const bottom_tabs = constants.bottom_tabs.map((bottom_tab) => ({
    ...bottom_tab,
    ref: React.createRef()
}))

const TabIndicator = ({ measureLayout, scrollX }) => {
  
  const inputRange = bottom_tabs.map((_, i) => i * SIZES.width)
  
  const TabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.width)
  })

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x)
  })

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        height: 5,
        width: TabIndicatorWidth,
        //borderRadius: SIZES.radius,
        backgroundColor: 'red',
        transform: [{
          translateX
        }]
      }}
    />
  )
}

const Tabs = ({scrollX, onBottomTabPress }) => {

const containerRef = React.useRef()
const [measureLayout, setMeasureLayout] = React.useState([])

React.useEffect(() => {
  let ml = []

  bottom_tabs.forEach(bottom_tab => {
    bottom_tab?.ref?.current?.measureLayout(
      containerRef.current,
      (x, y, width, height) => {
        ml.push({
          x, y, width, height
        })

        if(ml.length === bottom_tabs.length){
            setMeasureLayout(ml)
        }

      }
    )
  })
}, [containerRef.current])
  
  return (
    <View
    ref={containerRef}
    style={{
      flex: 1,
      flexDirection: 'row'
    }}
    >

      {/* Tab Indicator */}
      {measureLayout.length> 0 && <TabIndicator
      measureLayout={measureLayout} scrollX={scrollX} />}

      {/* Tabs */}
      {bottom_tabs.map( (item, index)=> {
        return (
            <TouchableOpacity
              key={`BottomTab-${index}`}
              ref={item.ref}
              style={{
                flex: 1,
                paddingHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15
              }}
              onPress={() => onBottomTabPress(index)}
            >
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 15
                  }}
                />
                <Text style={{
                  marginTop: 4,
                  width: 80, 
                  textAlign: 'center',
                  
                  color: COLORS.white,
                  ...FONTS.h5,
                  fontSize: 12
                }}>
                  {item.label}
                </Text>
            </TouchableOpacity>
        )
      })}
    </View>
  )
}

const MainLayout = ({appTheme}) => {
  
  const flatListRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current; 

  const onBottomTabPress = React.useCallback(bottomTabIndex => 
  {
      flatListRef?.current?.scrollToOffset({
          offset: bottomTabIndex * SIZES.width
      })
  })

  function renderContent(){
    return(
      <View
         style={{
            flex: 1
          }}
      >
        
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={item =>`Main-${item.id}`}
          onScroll={
            Animated.event([
              {nativeEvent: { contentOffset: { x: scrollX }}}
              ], 
                {
                  useNativeDriver: false
                }
              )
          }
          renderItem={({item, index})=> {
            return (
              <View 
                  style={{
                    height: SIZES.height,
                    width: SIZES.width,
                      tintColor:COLORS.white
                  
                  }}
              >
                {item.label == constants.screens.home && <Home/>}
                {item.label == constants.screens.search && <Search/>}
                {item.label == constants.screens.profile && <Profile/>}
                {item.label == constants.screens.notifications && <Notifications/>}
                {item.label == constants.screens.menu && <Menu/>}
                
              </View>
           )
         }}
        />
      </View>
   )
 }

  function renderBottomTab(){
    return (
        <View
            style={{
              //height: SIZES.h5,
                marginBottom: 0,
                //paddingHorizontal: SIZES.padding,
                //paddingVertical: SIZES.radius
                backgroundColor: appTheme?.backgroundColor1
            }}
        >
            <Shadow style={{
                          width: SIZES.width - (SIZES.padding * 0),
                          height: 75
                          }} 
            >
                <View
                  style={{
                    flex: 1,
                    //borderRadius: SIZES.radius,
                    backgroundColor: appTheme?.backgroundColor9
                }}
                >
                <Tabs 
                  scrollX={scrollX}
                  onBottomTabPress={onBottomTabPress}  
                />
                </View>
            </Shadow>
        </View>
    )
  }

  return(
    <View style={{
      flex: 1,
      backgroundColor: COLORS.white
    }
    }
    >

      {/* Content */}
      {renderContent()}


       {/* Bottom Tab */}
        
       {renderBottomTab()}
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

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);