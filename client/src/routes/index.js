import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";
import CheckPasswordPage from "../pages/CheckPasswordPage";
import HomePage from "../pages/HomePage";
import MessagePage from "../components/MessagePage";
import AuthLayouts from "../layout";
import PasswordReset from "../pages/PasswordReset";

const router = createBrowserRouter([
{
    path: "/",
    element: <App/>,
    children: [
        {
            path: "register", 
            element: <AuthLayouts><RegisterPage/></AuthLayouts>
        },
        {
            path: "email", 
            element: <AuthLayouts><CheckEmailPage/></AuthLayouts>
        },
        {
            path: "password",
            element: <AuthLayouts><CheckPasswordPage/></AuthLayouts>
        },
        {
            path: "password-reset",
            element: <AuthLayouts><PasswordReset/></AuthLayouts>
        },
        {
            path: "",
            element: <HomePage/>,
            children: [
                {
                    path: ":userId", 
                    element: <MessagePage/>
                }
            ]
        }
    ]
}
]);

export default router;