import { SvgXml } from "react-native-svg";

export default (props: any) => {
  const xml = `<svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" width="36" height="36" rx="13" fill="#E7F2F3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.4902 10.6755C17.8638 9.77726 19.1363 9.77726 19.51 10.6755L21.245 14.847L25.7484 15.208C26.7181 15.2858 27.1114 16.496 26.3725 17.1289L22.9414 20.068L23.9896 24.4626C24.2154 25.4089 23.1859 26.1569 22.3556 25.6498L18.5001 23.2948L14.6445 25.6498C13.8143 26.1569 12.7848 25.4089 13.0105 24.4626L14.0588 20.068L10.6276 17.1289C9.88878 16.496 10.282 15.2858 11.2518 15.208L15.7552 14.847L17.4902 10.6755Z" fill="#FDB022"/>
</svg>



    
  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
