//react imports
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

//layout
import ProtectedLayout from "./layouts/ProtectedLayout";

//pages
import Home from "./pages/PublicPages/Home";
import Login from "./pages/Authentication/Login";

// user
import ChangePassword from "./pages/ProtectedPages/auth/ChangePassword";
import NotFound from "./pages/PublicPages/NotFound";
import DeviceManagement from "./pages/ProtectedPages/Device/DeviceManagement";
import FarmManagement from "./pages/ProtectedPages/Farm/FarmManagement";
import CameraManagement from "./pages/ProtectedPages/Camera/CameraManagement";
import AddFarm from "./pages/ProtectedPages/Farm/AddFarm";
import ViewFarm from "./pages/ProtectedPages/Farm/ViewFarm";
import HomeAdmin from "./pages/ProtectedPages/ProtectedPage";
import EditForm from "./pages/ProtectedPages/Farm/EditForm";
import UserManagement from "./pages/ProtectedPages/user/UserManagement";
import UserView from "./pages/ProtectedPages/user/UserView";
import DeviceView from "./pages/ProtectedPages/Device/DeviceView";
import CameraView from "./pages/ProtectedPages/Camera/CameraView";
import NewsManagement from "./pages/ProtectedPages/News/NewsManagement";
import AddNews from "./pages/ProtectedPages/News/AddNews";
import EditNews from "./pages/ProtectedPages/News/EditNews";
import FAQSmanagement from "./pages/ProtectedPages/FAQS/FAQSmanagement";
import DeviceActivity from "./pages/ProtectedPages/Device/DeviceActivity";
import DeviceEdit from "./pages/ProtectedPages/Device/DeviceEdit";
import CameraActivity from "./pages/ProtectedPages/Camera/CameraActivity";
import CameraEdit from "./pages/ProtectedPages/Camera/CameraEdit";
import Userguide from "./pages/ProtectedPages/USERGUIDE/Userguide";
import Privacy from "./pages/ProtectedPages/USERGUIDE/Privacy";
import Notation from "./pages/ProtectedPages/USERGUIDE/Notation";
import NewsView from "./pages/ProtectedPages/News/NewsView";
import InquiryManagement from "./pages/ProtectedPages/inquiry/InquiryManagement";
import InquiryView from "./pages/ProtectedPages/inquiry/InquiryView";
import InquiryEdit from "./pages/ProtectedPages/inquiry/InquiryEdit";
import { useEffect } from "react";
import ForgotPasswordPage from "./pages/Authentication/ForgotPasswordPage";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Authentication Routes */}
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* protected routes */}
                <Route element={<ProtectedLayout />}>
                    <Route path="/home" element={<HomeAdmin />} />
                    <Route path="/change-password" element={<ChangePassword />} />

                    {/* user  */}
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/user-view/:_id" element={<UserView />} />

                    {/* Device */}
                    <Route path="/device-management" element={<DeviceManagement />} />
                    <Route path="/device-view/:_id" element={<DeviceView />} />
                    <Route path="/device-edit/:_id" element={<DeviceEdit />} />
                    <Route path="/device-activity/:_id" element={<DeviceActivity />} />

                    {/* Farm  */}
                    <Route path="/farm-management" element={<FarmManagement />} />
                    <Route path="/add-farm" element={<AddFarm />} />
                    <Route path="/edit-farm/:id" element={<EditForm />} />
                    <Route path="/viewfarm/:id" element={<ViewFarm />} />

                    {/* Camera  */}
                    <Route path="/camera-management" element={<CameraManagement />} />
                    <Route path="/camera-edit/:_id" element={<CameraEdit />} />
                    <Route path="/camera-activity/:_id" element={<CameraActivity />} />
                    <Route path="/camera-view/:_id" element={<CameraView />} />

                    {/* News  */}
                    <Route path="/news-management" element={<NewsManagement />} />
                    <Route path="/edit-news/:_id" element={<EditNews />} />
                    <Route path="/add-news" element={<AddNews />} />
                    <Route path="/news-view/:_id" element={<NewsView />} />

                    {/* INQUIRY  */}
                    <Route path="/inquiry-management" element={<InquiryManagement />} />
                    <Route path="/inquiry-view/:_id" element={<InquiryView />} />
                    <Route path="/inquiry-edit/:_id" element={<InquiryEdit />} />

                    {/* FAQS  */}
                    <Route path="/faq-management" element={<FAQSmanagement />} />

                    {/* USER GUIDe  */}
                    <Route path="/user-guide" element={<Userguide />} />
                    <Route path="/privacy-policy" element={<Privacy />} />
                    <Route path="/notaion" element={<Notation />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
