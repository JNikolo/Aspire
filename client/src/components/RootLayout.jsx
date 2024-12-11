import { useAuth } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import { ChatbotBubble } from "./ChatbotBubble";

export function RootLayout() {
  const { isSignedIn } = useAuth();

  return (
    <>
      <Outlet />
      {isSignedIn && <ChatbotBubble />}
    </>
  );
}
