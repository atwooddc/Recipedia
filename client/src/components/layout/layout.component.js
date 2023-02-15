import './layout.styles.css'
import {Outlet} from 'react-router-dom'
import Sidebar from '../sidebar/sidebar.component'

const Layout = () => (
    <div className="layout">
        <Sidebar/>
        <div className="pages">
            <Outlet/>
        </div>
    </div>
)

export default Layout