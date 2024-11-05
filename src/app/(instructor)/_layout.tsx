import { Tabs } from "expo-router";

import {
  Home,
  HomeFilled,
  Courses,
  CoursesFilled,
  More,
  MoreFilled,
  BootCampIconFilled,
  BootCampIcon,
  LessonIconFilled,
  LessonIcon,
} from "~/assets/icons"; // Import both normal and filled icons
import { useTheme } from "~/theme";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: theme.colors.primary, // Label color when active
        tabBarInactiveTintColor: "gray", // Label color when inactive
        headerShown: false,
        tabBarStyle: {
          paddingTop: 12,
          paddingBottom: 12,
          height: 68,
        },
        tabBarLabelStyle: {
          marginTop: 4,
          fontSize: 12,
        },
        tabBarIcon: ({ color, focused }) => {
          let IconComponent;

          switch (route.name) {
            case "home":
              IconComponent = focused ? HomeFilled : Home;
              break;
            case "(courses)":
              IconComponent = focused ? CoursesFilled : Courses;
              break;
            case "(bootcamp)":
              IconComponent = focused ? BootCampIconFilled : BootCampIcon;
              break;
            case "(lessons)":
              IconComponent = focused ? LessonIconFilled : LessonIcon;
              break;
            case "(more)":
              IconComponent = focused ? MoreFilled : More;
              break;
            default:
              IconComponent = Home;
          }

          return (
            <IconComponent fill={focused ? theme.colors.primary : "white"} />
          ); // Changes fill based on active state
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="(courses)" options={{ title: "Courses" }} />
      <Tabs.Screen name="(bootcamp)" options={{ title: "Bootcamp" }} />
      <Tabs.Screen name="(lessons)" options={{ title: "Lessons" }} />
      <Tabs.Screen name="(more)" options={{ title: "More" }} />

      {/* Hidden Notifications Route */}
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarButton: () => null, // Hides the tab button
        }}
      />
    </Tabs>
  );
}
