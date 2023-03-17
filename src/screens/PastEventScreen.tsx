import { Alert, FlatList, StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { useQuery } from "react-query";
import { getEvents } from "../api/event";


import EventCard from "../components/EventCard";
import { getUser } from '../auth/user';
import { LoggedUser } from "types/types";
import { useEffect, useState } from "react";
import { getRating } from "../api/bigBangAPI/rating";
import { colors } from "../styles/colors";

const PastEventScreen = () => {
  const [userInfo, setUserInfo] = useState<LoggedUser>({ uid: '', email: '', });

  const requestEvents = useQuery("events", () => getEvents(),
    {
      onError: (error: TypeError) => {
        Alert.alert("Error", error.message);
      },
    });

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      setUserInfo(user);

      const rating = await getRating(user.uid);
    }
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <ScrollView>
        <View style={styles.container}>
          <FlatList
            data={requestEvents.data}
            renderItem={({ item, }) =>
              <EventCard
                key={item.id}
                event={item}
                eventType={"past"}
                userID={userInfo?.uid}
              />
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.netural.backgroundBlack,
    paddingHorizontal: 20,
    paddingVertical: 24,
},
});

export default PastEventScreen;
