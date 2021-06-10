import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { Input, Checkbox, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { userService } from '../_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            file: null,
        };
    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
        }, () => {
        });

    }
    render() {
        const { user } = this.state;
        return (
            <Card title="User Profile" extra={<div><Checkbox checked={user.active} disabled>Active</Checkbox> <Link to="/login">Logout</Link>
            </div> } style={{marginTop: "20px"}}>
            <img src={user.profileImagePath} alt="logo" />
              <Row gutter={[16, 24]}>
                <Col className="gutter-row" span={24}>
                      <Avatar size={64} icon={<UserOutlined />} />
                 </Col>
                 <Col className="gutter-row" span={24}>
                      <Input size="large"  value={user.username} addonBefore={<label>Username</label>}/>
                 </Col>
                 <Col className="gutter-row" span={12}>                
                      <Input size="large"  value={user.firstName} addonBefore={<label>First Name</label>}/>
                </Col>
                 <Col className="gutter-row" span={12}>       
                          <Input size="large"  value={user.lastName} addonBefore={<label>Last Name</label>}/>
                </Col>
                <Col className="gutter-row" span={12}>                
                         <Input size="large"  value={user.country} addonBefore={<label>Country</label>}/>
                </Col>
                 <Col className="gutter-row" span={12}>       
                         <Input size="large"  value={user.address} addonBefore={<label>Address</label>}/>

                </Col>
                <Col className="gutter-row" span={12}>                
                        <Input size="large"  value={user.salary} addonBefore={<label>Salary</label>}/>
                </Col>
                 <Col className="gutter-row" span={12}>       
                         <Input size="large"  value={user.dateOfBirth} addonBefore={<label>Date of birth</label>}/>

                </Col>
           
              </Row>
            
             </Card>
        );
    }
}

export { HomePage };