import { SvgXml } from "react-native-svg";

export default (props: any) => {
  const xml = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" rx="16" fill="#F7F7F9"/>
<path d="M19.9999 14.0328C20 14.0219 20 14.0109 20 14C20 11.7909 18.2092 10 16 10C13.7909 10 12 11.7909 12 14L11.9999 14.5C11.9999 16.0438 11.4169 17.4513 10.459 18.5146C11.6143 18.9411 12.8323 19.238 14.0955 19.3878C14.72 19.4619 15.3555 19.5 15.9999 19.5C16.6444 19.5 17.28 19.4619 17.9046 19.3878C19.1677 19.238 20.3856 18.941 21.5408 18.5146C20.5829 17.4513 19.9999 16.0438 19.9999 14.5V14.0328Z" fill="white"/>
<path d="M17.9046 19.3878C19.1677 19.238 20.3856 18.941 21.5408 18.5146C20.5829 17.4513 19.9999 16.0438 19.9999 14.5V14.0328C20 14.0219 20 14.0109 20 14C20 11.7909 18.2092 10 16 10C13.7909 10 12 11.7909 12 14L11.9999 14.5C11.9999 16.0438 11.4169 17.4513 10.459 18.5146C11.6143 18.9411 12.8323 19.238 14.0955 19.3878M17.9046 19.3878C17.28 19.4619 16.6444 19.5 15.9999 19.5C15.3555 19.5 14.72 19.4619 14.0955 19.3878M17.9046 19.3878C17.9666 19.5807 18 19.7865 18 20C18 21.1046 17.1046 22 16 22C14.8955 22 14 21.1046 14 20C14 19.7865 14.0335 19.5808 14.0955 19.3878M10.083 13C10.2745 11.8584 10.7884 10.8262 11.5278 10M20.4723 10C21.2117 10.8262 21.7256 11.8584 21.9171 13" stroke="#03363D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    
  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};
