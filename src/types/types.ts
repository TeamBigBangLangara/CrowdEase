import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TabParams } from '../App'
import { MainStackParams } from '~/App'
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs'

// TODO: use official typing when fixed, see https://github.com/react-navigation/react-navigation/issues/10802#issuecomment-1326687295
export type MainStackNavigationProps<T extends keyof MainStackParams> = NativeStackScreenProps<
  MainStackParams,
  T
>

export type TabNavigationProps<T extends keyof TabParams> = MaterialBottomTabNavigationProp<
  TabParams,
  T
>
