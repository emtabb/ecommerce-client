import React from 'react';

// Icon Library https://icons.getbootstrap.com/

const dataSidebar = [{
    href: "/",
    icon: "dashboard",
    label: "Bảng điều khiển"
},
{
    href: "/outboxes",
    icon: "local_shipping",
    label: "Đơn hàng"
},
{
    href: "/products",
    icon: "content_paste",
    label: "Danh mục sản phẩm"
},
{
    href: "/create-form",
    icon: "bi bi-file-earmark-plus fa-lg",
    label: "Thêm sản phẩm"
},

]
// {
//     href: "/library",
//     icon: "local_see",
//     label: "Thư viện hình ảnh"
// }
export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>ESPACE MANAGER</h3>
                </div>

                <ul className="list-unstyled components">
                    {
                        dataSidebar.map(item => (
                            <li key={item.key} className="">
                                <a href={item.href}>{item.label}<i className={item.icon}></i></a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        )
    }
}