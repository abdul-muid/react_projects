export const WeatherInfo = ({ label, value }) => {
  return (
    <h3 className="text-center text-3xl mt-6 ">
      {label}: <span className="font-bold">{value}</span>
    </h3>
  );
};
