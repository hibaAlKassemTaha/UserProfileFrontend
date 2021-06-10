import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../App/App.css'
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { SignUpPage } from '../SignUpPage';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Router>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/signUp" component={SignUpPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export { App }; 