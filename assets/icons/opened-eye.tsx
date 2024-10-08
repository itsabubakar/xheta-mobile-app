import { SvgXml } from "react-native-svg";

export default (props: any) => {
  const xml = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.03623 12.3224C1.96715 12.1151 1.96709 11.8907 2.03605 11.6834C3.42441 7.50972 7.36147 4.5 12.0015 4.5C16.6394 4.5 20.5749 7.50692 21.965 11.6776C22.0341 11.8849 22.0342 12.1093 21.9652 12.3166C20.5768 16.4903 16.6398 19.5 11.9997 19.5C7.36188 19.5 3.42632 16.4931 2.03623 12.3224Z" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.0007 12C15.0007 13.6569 13.6575 15 12.0007 15C10.3438 15 9.00068 13.6569 9.00068 12C9.00068 10.3431 10.3438 9 12.0007 9C13.6575 9 15.0007 10.3431 15.0007 12Z" stroke="#686868" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
