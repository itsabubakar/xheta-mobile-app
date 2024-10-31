import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import { useRef, useState } from "react";
import { View } from "react-native";

import { Text } from "~/theme";

const CustomVideoPlayer = ({ source }: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const refVideo = useRef(null);
  const [inFullscreen, setInFullsreen] = useState(false);

  return (
    <View>
      <VideoPlayer
        // fullscreen={{
        //   enterFullscreen: () => {
        //     setInFullsreen(!inFullscreen);
        //     refVideo.current.setStatusAsync({
        //       shouldPlay: true,
        //     });
        //   },
        //   exitFullscreen: () => {
        //     setInFullsreen(!inFullscreen);
        //     refVideo.current.setStatusAsync({
        //       shouldPlay: false,
        //     });
        //   },
        //   inFullscreen,
        // }}
        icon={{
          play: <Text style={{ color: "#FFF" }}>PLAY</Text>,
          pause: <Text style={{ color: "#FFF" }}>PAUSE</Text>,
        }}
        style={{
          height: 343,
          controlsBackgroundColor: "gray",
        }}
        videoProps={{
          shouldPlay: isPlaying,
          resizeMode: ResizeMode.CONTAIN,
          source: {
            uri: source,
          },
          // ref: refVideo,
        }}
      />
    </View>
  );
};

export default CustomVideoPlayer;
