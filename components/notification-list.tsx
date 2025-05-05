import { Car, Coins, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function NotificationList() {
  const notifications = [
    {
      id: 1,
      type: "ride",
      title: "New ride request match",
      description: "A new ride matches your schedule",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      type: "message",
      title: "New message from Alex",
      description: "Hey, are you still available for the ride today?",
      time: "20 min ago",
      read: false,
    },
    {
      id: 3,
      type: "coin",
      title: "You earned 15 coins",
      description: "For completing your ride with Sarah",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      type: "ride",
      title: "Ride confirmed",
      description: "Your ride to Engineering Building has been confirmed",
      time: "3 hours ago",
      read: true,
    },
  ]

  return (
    <div className="divide-y">
      {notifications.map((notification) => (
        <Link
          key={notification.id}
          href={`/notifications/${notification.id}`}
          className="flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors"
        >
          <div className={`rounded-full p-2 ${notification.read ? "bg-muted" : "bg-primary/10"}`}>
            {notification.type === "ride" ? (
              <Car className={`h-4 w-4 ${notification.read ? "text-muted-foreground" : "text-primary"}`} />
            ) : notification.type === "message" ? (
              <MessageSquare className={`h-4 w-4 ${notification.read ? "text-muted-foreground" : "text-primary"}`} />
            ) : (
              <Coins className={`h-4 w-4 ${notification.read ? "text-muted-foreground" : "text-primary"}`} />
            )}
          </div>
          <div className="space-y-1 flex-1">
            <p className={`text-sm font-medium leading-none ${notification.read ? "" : "font-semibold"}`}>
              {notification.title}
            </p>
            <p className="text-xs text-muted-foreground">{notification.description}</p>
            <p className="text-xs text-muted-foreground">{notification.time}</p>
          </div>
          {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
        </Link>
      ))}
    </div>
  )
}
