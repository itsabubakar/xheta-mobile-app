import { SvgXml } from "react-native-svg";

export default (props: any) => {
  const xml = `<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.49994 17.75C9.08994 17.75 8.74994 17.41 8.74994 17V12.81L8.02994 13.53C7.73994 13.82 7.25994 13.82 6.96994 13.53C6.67994 13.24 6.67994 12.76 6.96994 12.47L8.96994 10.47C9.17994 10.26 9.50994 10.19 9.78994 10.31C10.0699 10.42 10.2499 10.7 10.2499 11V17C10.2499 17.41 9.90994 17.75 9.49994 17.75Z" fill="#03363D"/>
<path d="M11.4999 13.75C11.3099 13.75 11.1199 13.68 10.9699 13.53L8.96994 11.53C8.67994 11.24 8.67994 10.76 8.96994 10.47C9.25994 10.18 9.73994 10.18 10.0299 10.47L12.0299 12.47C12.3199 12.76 12.3199 13.24 12.0299 13.53C11.8799 13.68 11.6899 13.75 11.4999 13.75Z" fill="#03363D"/>
<path d="M15.5 22.75H9.5C4.07 22.75 1.75 20.43 1.75 15V9C1.75 3.57 4.07 1.25 9.5 1.25H14.5C14.91 1.25 15.25 1.59 15.25 2C15.25 2.41 14.91 2.75 14.5 2.75H9.5C4.89 2.75 3.25 4.39 3.25 9V15C3.25 19.61 4.89 21.25 9.5 21.25H15.5C20.11 21.25 21.75 19.61 21.75 15V10C21.75 9.59 22.09 9.25 22.5 9.25C22.91 9.25 23.25 9.59 23.25 10V15C23.25 20.43 20.93 22.75 15.5 22.75Z" fill="#03363D"/>
<path d="M22.5 10.75H18.5C15.08 10.75 13.75 9.41999 13.75 5.99999V1.99999C13.75 1.69999 13.93 1.41999 14.21 1.30999C14.49 1.18999 14.81 1.25999 15.03 1.46999L23.03 9.46999C23.24 9.67999 23.31 10.01 23.19 10.29C23.07 10.57 22.8 10.75 22.5 10.75ZM15.25 3.80999V5.99999C15.25 8.57999 15.92 9.24999 18.5 9.24999H20.69L15.25 3.80999Z" fill="#03363D"/>
</svg>

  `;
  const prop = { ...props, xml };
  return <SvgXml {...prop} />;
};