import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type UserRole = "admin" | "driver" | null;

interface User {
  name: string;
  email: string;
  role: string;
  userRole: UserRole;
  driverId?: string;
}

interface Notification {
  id: string;
  message: string;
  meta?: string;
  type: "payment" | "driver" | "vehicle" | "maintenance" | "info";
  read: boolean;
  timestamp: string;
}

interface SearchResult {
  type: "driver" | "vehicle" | "payment";
  id: string;
  title: string;
  subtitle: string;
}

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: UserRole;
  isDark: boolean;
  notifications: Notification[];
  unreadCount: number;
  searchQuery: string;
  searchResults: SearchResult[];
  login: (email: string, password: string, role?: UserRole) => void;
  logout: () => void;
  toggleDark: () => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const mockNotifications: Notification[] = [
  {
    id: "n1",
    message: "James Okafor made weekly payment",
    meta: "₦35,000",
    type: "payment",
    read: false,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "n2",
    message: "Hyundai Elantra sent to maintenance",
    meta: "Brake service",
    type: "vehicle",
    read: false,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "n3",
    message: "Fatima Bello account suspended",
    meta: "₦84,000 outstanding",
    type: "driver",
    read: false,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "n4",
    message: "Chukwudi Eze made weekly payment",
    meta: "₦40,000",
    type: "payment",
    read: true,
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "n5",
    message: "Vehicle service reminder: OGN-789-TU",
    meta: "Due in 5 days",
    type: "maintenance",
    read: true,
    timestamp: new Date(Date.now() - 259200000).toISOString(),
  },
];

const mockSearchData: SearchResult[] = [
  {
    type: "driver",
    id: "d1",
    title: "James Okafor",
    subtitle: "Toyota Corolla · LND-234-XY",
  },
  {
    type: "driver",
    id: "d2",
    title: "Amaka Nwosu",
    subtitle: "Honda Accord · ABJ-567-KL",
  },
  {
    type: "driver",
    id: "d3",
    title: "Chukwudi Eze",
    subtitle: "Toyota Camry · LND-891-MN",
  },
  {
    type: "driver",
    id: "d4",
    title: "Fatima Bello",
    subtitle: "Hyundai Elantra · KAN-123-PQ",
  },
  {
    type: "driver",
    id: "d5",
    title: "Emeka Obi",
    subtitle: "Honda Civic · LND-456-RS",
  },
  {
    type: "vehicle",
    id: "v1",
    title: "Toyota Corolla 2021",
    subtitle: "LND-234-XY · Active",
  },
  {
    type: "vehicle",
    id: "v2",
    title: "Honda Accord 2020",
    subtitle: "ABJ-567-KL · Active",
  },
  {
    type: "vehicle",
    id: "v4",
    title: "Hyundai Elantra 2021",
    subtitle: "KAN-123-PQ · Maintenance",
  },
  {
    type: "payment",
    id: "p2",
    title: "Late Payment — Amaka Nwosu",
    subtitle: "₦32,000 · Week ending Mar 17",
  },
];

// Apply theme on first load before React renders
const initDark = (() => {
  const saved =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("fleeetos-theme")
      : null;
  const prefersDark = saved ? saved === "dark" : true;
  if (prefersDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  return prefersDark;
})();

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState(initDark);
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [searchQuery, setSearchQueryState] = useState("");

  const login = useCallback(
    (email: string, _password: string, role: UserRole = "admin") => {
      if (role === "driver") {
        setUser({
          name: "James Okafor",
          email,
          role: "Driver",
          userRole: "driver",
          driverId: "d1",
        });
      } else {
        setUser({
          name: "Fleet Admin",
          email,
          role: "Owner",
          userRole: "admin",
        });
      }
    },
    [],
  );

  const logout = useCallback(() => setUser(null), []);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("fleeetos-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("fleeetos-theme", "light");
      }
      return next;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((n) => n.map((x) => ({ ...x, read: true })));
  }, []);

  const markRead = useCallback((id: string) => {
    setNotifications((n) =>
      n.map((x) => (x.id === id ? { ...x, read: true } : x)),
    );
  }, []);

  const setSearchQuery = useCallback((q: string) => setSearchQueryState(q), []);

  const searchResults =
    searchQuery.trim().length > 0
      ? mockSearchData.filter(
          (r) =>
            r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.subtitle.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        userRole: user?.userRole ?? null,
        isDark,
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
        searchQuery,
        searchResults,
        login,
        logout,
        toggleDark,
        markAllRead,
        markRead,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
