import React from 'react';

import { userService } from '../_services';

import { CountryDropdown } from 'react-country-region-selector';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Upload, message, Button } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/lib/upload";
import { Input, Checkbox, Col, Row, Select, InputNumber, AutoComplete, Cascader } from 'antd';

const { Dragger } = Upload;

const props = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            country: '',
            dateofbirth: '',
            isActive: true,
            salary: 0,
            submitted: false,
            loading: false,
            error: '',
            file: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   
    handleChange(e) {
        const { name, value } = e.target;
        const target = e.target;
        const value2 = target.type === 'checkbox' ? target.checked : target.value;
        console.log(target.value);
        console.log(target.selected);
        this.setState({ [name]: value2 });
    }

    handleDateChange(value, name) {
        this.setState({ [name]: value });
    }


    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const {username, password, firstName, lastName, address, country, dateofbirth, isActive, salary,file,  submitted, loading, error } = this.state;


        this.setState({ loading: true });
        userService.addUser(username, password,firstName, lastName, address, country, isActive, parseInt(salary, 10), dateofbirth)
            .then(
                user => {
                    userService.uploadImage(file) .then(imagePath => {
                        userService.login(username, password).then(loginResult => {
                            userService.editUser(user.id, imagePath.fullPath).then(result => {
                                const { from } = this.props.location.state || { from: { pathname: "/" } };
                                this.props.history.push(from);
                            })
                        });
                        
                    });
                },
                error => this.setState({ error, loading: false })
            );

    }
    selectCountry (val) {
        this.setState({ country: val });
      }
      
      onUpload(file) {
          console.log(file);
          this.setState({ ["file"]: file });
      }

    render() {
        const { username, password, firstName, lastName, address, country, dateofbirth, isActive, salary,  submitted, loading, error } = this.state;
        return (
            
            <div id="loginform">
             
                <h2 id="headerTitle">SIGN UP</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    
                    <Input type="text" description="First Name" placeholder="Enter your first name" name="firstName" type="text" value={firstName} onChange={this.handleChange} />
                        {submitted && !firstName &&
                            <div className="help-block">First name is required</div>
                        }
                    <Input type="text" description="Last Name" placeholder="Enter your last name" name="lastName" value={lastName} onChange={this.handleChange} />
                        {submitted && !lastName &&
                            <div className="help-block">Last name is required</div>
                        }
                    <Input type="text" description="Username" placeholder="Enter your username" name="username" type="text" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }  
                
     
                    <Input type="text" description="Password" placeholder="Enter your password" name="password" type="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                      <CountryDropdown
                            value={country}
                            name="country"
                            onChange={(val) => this.selectCountry(val)} />

                    <Input type="text" description="Address" placeholder="Enter your address" name="address" type="text" value={address} onChange={this.handleChange} />
                        {submitted && !address &&
                            <div className="help-block">Address is required</div>
                        }
                    <Checkbox name="isActive"
            type="checkbox"
            checked={isActive}
            onChange={this.handleChange}>Active</Checkbox>
<DatePicker placeholderText="Enter your date of birth" selected={dateofbirth} value={dateofbirth} name="dateofbirth"   onChange={(date)=>this.handleDateChange(date, 'dateofbirth')} />

                    <Input type="number" description="Salary" placeholder="Enter your salary" name="salary"  value={salary} onChange={this.handleChange} />
                        {submitted && !salary &&
                            <div className="help-block">Salary is required</div>
                        }
                       <Dragger
      name="file"
      multiple={false}
      onRemove={() => {
       this.onUpload(undefined);
      }}
      beforeUpload={(file) => {
          console.log(file);
        this.onUpload(file);
        return false;
      }}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Dragger>
                    <div className="form-group">
                        <div id="button" class="row">
                            <button className="btn btn-primary" disabled={loading}>Create Account</button>
                            {loading &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                    </div>
                    {error &&
                        <div className={'alert alert-danger'}>{error}</div>
                    }
                </form>
                
            </div>
        );
    }
}

export { SignUpPage }; 