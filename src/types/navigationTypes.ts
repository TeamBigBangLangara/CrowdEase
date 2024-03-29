import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  AuthStackParams,
  EventsStackParams,
  MainStackParams,
  MapStackParams,
  ReportStackParams,
  TabParams
} from "../App";
import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";

// TODO: use official typing when fixed, see https://github.com/react-navigation/react-navigation/issues/10802#issuecomment-1326687295
export type MainStackNavigationProps<T extends keyof MainStackParams> = NativeStackScreenProps<
  MainStackParams,
  T
>

export type EventsStackNavigationProps<T extends keyof EventsStackParams> = NativeStackScreenProps<
  EventsStackParams,
  T
  >

export type ReportStackNavigationProps<T extends keyof ReportStackParams> = NativeStackScreenProps<
  ReportStackParams,
  T
  >

export type MapStackNavigationProps<T extends keyof MapStackParams> = NativeStackScreenProps<
  MapStackParams,
  T
  >
export type TabNavigationProps<T extends keyof TabParams> = MaterialBottomTabNavigationProp<
  TabParams,
  T
>

export type AuthStackNavigationProps<T extends keyof AuthStackParams> = NativeStackScreenProps<
  AuthStackParams,
  T
>
