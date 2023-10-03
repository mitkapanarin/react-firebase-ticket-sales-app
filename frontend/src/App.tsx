import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import Cookies from "js-cookie";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  ErrorPage,
  Login,
  Signup,
  BookMark,
  PurchaseHistory,
  Events,
  Profile,
  EventDetailsPage,
  MusicalConcerts,
  StandUpComedies,
  DisplaySearchResult,
  ShoppingCart,
  Checkout,
  EditEventForm,
} from "./Pages";
import Sidebar from "./components/Sidebar/Sidebar";
import ProtectedRoutes from "./Pages/utils/ProtectetRoutes";
import { loginSuccess, logoutSuccess } from "./store/Slices/userSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // @ts-ignore
        Cookies.set("accessToken", user?.accessToken);
        dispatch(loginSuccess({ userUid: uid }));
      } else {
        0;
        Cookies.remove("accessToken");
        dispatch(logoutSuccess());
      }
    });
  });

  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<div>Welcome</div>} />
          <Route
            path="/dashboard"
            // element={userRole === "admin" ? <Home /> : <Navigate to="/" />}
          />
          <Route path="/events" element={<Events />} />
          <Route path="/musical-concerts" element={<MusicalConcerts />} />
          <Route path="/stand-up-comedies" element={<StandUpComedies />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/bookmark" element={<BookMark />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route
            path="/display-search-result"
            element={<DisplaySearchResult />}
          />
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-event/:id" element={<EditEventForm />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
