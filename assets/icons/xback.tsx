import { SvgXml } from "react-native-svg";

export default (props: any) => {
  const xml = `<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10.0001 8.125L11.8751 10M11.8751 10L13.7501 11.875M11.8751 10L13.7501 8.125M11.8751 10L10.0001 11.875M7.85052 15.9754L2.53801 10.6629C2.1719 10.2968 2.1719 9.7032 2.53802 9.33709L7.85052 4.02459C8.02633 3.84877 8.26479 3.75 8.51343 3.75L16.2501 3.75C17.2856 3.75 18.1251 4.58947 18.1251 5.625V14.375C18.1251 15.4105 17.2856 16.25 16.2501 16.25H8.51343C8.26479 16.25 8.02633 16.1512 7.85052 15.9754Z"
    stroke="#434343"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
    
  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
