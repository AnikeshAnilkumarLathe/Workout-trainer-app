import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function TabsLayout() {
    return (
    <Tabs>
    <Tabs.Screen name="index" options={{tabBarLabel: "Home" , tabBarIcon:({color})=> <FontAwesome name="home" size={24} color={color} /> , title:"Home" }}/>
    <Tabs.Screen name="workouts/index" options={{tabBarLabel: "Dashboard" , tabBarIcon:({color})=> <FontAwesome5 name="dumbbell" size={24} color={color} />, title:"Exercises for you" }}/>
    <Tabs.Screen name="workouts/[id]" options={{tabBarLabel: "Workout" , tabBarIcon:({color})=> <FontAwesome5 name="running" size={24} color={color} />, title:"Currently performing" }}/>
    <Tabs.Screen name="profile" options={{tabBarLabel: "My Profile" , tabBarIcon:({color})=> <FontAwesome name="user" size={24} color={color} />, title:"My Profile" }}/>
    </Tabs>

    );
}