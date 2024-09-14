import AdminSidebar from "./AdminSidebar";
import "./Admin.scss";
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';


const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <AdminSidebar collapsed={collapsed}></AdminSidebar>
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars className="toggle-menu-btn" onClick={() => { setCollapsed(!collapsed) }} />
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>


        </div>
    );
}

export default Admin;