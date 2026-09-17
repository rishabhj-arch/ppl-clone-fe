import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SignIn } from "./components/auth/SingIn";
import ProtectedRoute from "./layouts/ProtectedRoute";
import { CreateNew } from "./components/createNew/CreateNew";
import { WhatWeDo } from "./components/page/WhatWeDo";
import { WhoWeAre } from "./components/page/WhoWeAre";
import { InsightsPage } from "./components/Insights & News/InsightsPage";
import { InsightsDetails } from "./components/Insights & News/InsightsDetails";
import { ContactUs } from "./pages/ContactUs";
import { Layout, WebsiteLayout } from "./layouts/Layout";
import Edit from "./pages/Edit";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Webdashboard } from "./pages/dashboard/Webdashboard";
import { OurservicesPage } from "./components/OurServices/OurservicesPage";
import { useEffect } from "react";
import PageNotFound from "./components/shared/PageNotFound";

import 'react-quill/dist/quill.snow.css';
import TermsandCondtions from "./components/page/TermsandCondtions";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  
  useEffect(() => {
    const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
      ".Btn-posnawr, .btn-posnawr"
    );

    const handleMouseMove = (e: MouseEvent) => {
      const button = e.currentTarget as HTMLButtonElement;
      const parentRect: DOMRect = button.getBoundingClientRect();
      const relX: number = e.clientX - parentRect.left;
      const relY: number = e.clientY - parentRect.top;
      const span = button.getElementsByTagName("span");

      if (span.length > 0) {
        span[0].style.top = `${relY}px`;
        span[0].style.left = `${relX}px`;
      }
    };

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", handleMouseMove);
      button.addEventListener("mouseout", handleMouseMove);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", handleMouseMove);
        button.removeEventListener("mouseout", handleMouseMove);
      });
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
      <Routes>
        {/* Admin Route */}
        <Route path="/admin/login" element={<SignIn />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="create"
            element={
              <ProtectedRoute>
                <CreateNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit/:newsid"
            element={
              <ProtectedRoute>
                <Edit />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        {/* Website Route */}
        <Route path="" element={<WebsiteLayout />}>
          <Route path="" element={<Webdashboard />} />
          <Route path="/home" element={<Webdashboard />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/our-services" element={<OurservicesPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route
            path="/insights-&-news-details/:newsid"
            element={<InsightsDetails />}
          />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/terms&use" element={<TermsandCondtions />} />
        </Route>
      </Routes>
      </DndProvider>
    </QueryClientProvider>
  );
};

export default App;
