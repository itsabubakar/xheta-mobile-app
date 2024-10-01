import { SvgXml } from "react-native-svg";

export default (props: any) => {
  const xml = `<svg width="63" height="62" viewBox="0 0 63 62" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="4.5" y="4" width="54" height="54" rx="27" fill="white" fill-opacity="0.2"/>
<rect x="2.5" y="2" width="58" height="58" rx="29" stroke="white" stroke-opacity="0.3" stroke-width="4"/>
<path d="M25.21 18.829C23.5119 17.7585 21.3 18.9788 21.3 20.9861V41.0141C21.3 43.0214 23.5119 44.2417 25.21 43.1712L41.0942 33.1572C42.681 32.1568 42.681 29.8433 41.0942 28.843L25.21 18.829Z" fill="white"/>
</svg>
    
  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
