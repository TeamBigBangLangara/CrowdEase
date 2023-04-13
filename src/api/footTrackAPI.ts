import { env } from "../../env";

const params = new URLSearchParams({
  'api_key_private': env.REACT_BESTTIME_APIKEY,
});

export const getCrowd = () => {
fetch(`https://besttime.app/api/v1/forecasts/live?${params}`, {
  method: 'POST',
}).then(function(res) {
  return res;
});};
