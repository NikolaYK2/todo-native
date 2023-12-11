import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

export const useSafeAreaStyles = () => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    safeArea: {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  });
};