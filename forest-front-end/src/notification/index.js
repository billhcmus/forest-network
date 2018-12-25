import { notification, Icon } from 'antd';
import React from "react";

export const openNotification = (title, description) => {
    notification.open({
        message: title,
        description: description,
        icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
    });
};
