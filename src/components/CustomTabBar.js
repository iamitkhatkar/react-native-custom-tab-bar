import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Animated, {SequencedTransition} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const CustomTabBar = ({state, descriptors, navigation}) => {
  const {bottom} = useSafeAreaInsets();

  let activeItem = 0;
  let deepActiveIndex = 0;

  const navState = navigation.getState();

  if (navState) {
    activeItem = navState.index;
    if (navState.routes[activeItem] && navState.routes[activeItem].state) {
      deepActiveIndex = navState.routes[activeItem].state.index;
    }
  }

  return (
    <View style={[styles.container, {paddingBottom: bottom}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={label}
            onLongPress={onLongPress}
            style={styles.item}>
            {isFocused && (
              <View style={styles.row}>
                {new Array(deepActiveIndex + 1).fill('').map((_, i) => (
                  <Animated.View
                    layout={SequencedTransition}
                    key={i}
                    style={styles.bar}
                  />
                ))}
              </View>
            )}
            {options.tabBarIcon({focused: isFocused})}
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 5,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: 4,
    gap: 4,
  },
  bar: {
    flex: 1,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#129',
  },
});
