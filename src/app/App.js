import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { PrivateRoute } from '../auth/PrivateRoute';
import { HomePage } from '../components/HomePage';
import LoginPage from '../auth/LoginPage';
import RunReportLoginPage from '../auth/RunReportLoginPage';
import {ReportContainer} from '../components/ReportContainer';
import './App.css';

class App extends React.Component  {

    onUnload() {
        localStorage.removeItem('orm');
    }

    componentDidMount() {
       window.addEventListener("beforeunload", this.onUnload)
    }

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    render() {
        if (document.location.pathname.startsWith('/runreport')) {
            document.runReportMode = true;
            document.reportId = document.location.pathname.substring('/runreport'.length + 1);
        }
        return (<div>
            <Router>
                <div>
                    {document.runReportMode && <PrivateRoute path="/" component={ReportContainer}/>}
                    {document.runReportMode && <Route path="/login" component={RunReportLoginPage}/>}
                    {!document.runReportMode && <PrivateRoute exact path="/" component={HomePage}/>}
                    {!document.runReportMode && <Route path="/login" component={LoginPage}/>}
                </div>
            </Router>
        </div>);
    }
}



export { App };
