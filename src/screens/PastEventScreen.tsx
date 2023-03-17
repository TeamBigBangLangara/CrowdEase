import RateCard from "../components/RateCard"
import { View } from "react-native"
import { useState } from "react";

const PastEventScreen = () => {
  const [starRating, setStarRating] = useState(0);

  const onStarPress = (id: number) => {
    setStarRating(id);
  }
return(
  <View>
       <RateCard
            onSubmitPress={() => { }}
            onSkipPress={() => { }}
            onStarPress={onStarPress}
            imageActive={require("../assets/icons/StarActive.png")}
            imageInactive={require("../assets/icons/star.png")}
            activeStarCount={starRating}
          />
  </View>
)
}

export default PastEventScreen