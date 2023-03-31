const params = new URLSearchParams({
  'api_key_private': 'pri_d22d46ca1806456b8bc804dc54147603',
});

export const getCrowd = () => {
fetch(`https://besttime.app/api/v1/forecasts/live?${params}`, {
  method: 'POST',
}).then(function(res) {
  return res;
});};
