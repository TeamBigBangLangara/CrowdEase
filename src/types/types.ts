import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParams, TabParams } from '../App'
import { MainStackParams } from '../App'
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs'

export type MainStackNavigationProps<T extends keyof MainStackParams> = NativeStackScreenProps<
  MainStackParams,
  T
>

export type AuthStackNavigationProps<T extends keyof AuthStackParams> = NativeStackScreenProps<
  AuthStackParams,
  T
>

export type TabNavigationProps<T extends keyof TabParams> = MaterialBottomTabNavigationProp<
  TabParams,
  T
>
