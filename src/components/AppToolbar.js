import React from 'react';
import ReactDOM from 'react-dom';
import Toolbar from './Toolbar';
import '../app/App.css';
import config from '../config/appconfig';
import {BaseDesignComponent} from './BaseDesignComponent';
import {PreferencesPanel} from './PreferencesPanel';
import {SaveReportPanel} from './SaveReportPanel';
import {clearDocumentDesignData} from './helpers';
import {getModalContainer} from './helpers';
import {getDocumentDimensions} from './helpers';
import {getPixelsPerInch} from './helpers.js';
import axios from 'axios';

class AppToolbar extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.newReport = this.newReport.bind(this);
        this.newReportObject = this.newReportObject.bind(this);
        this.preferences = this.preferences.bind(this);
        this.savePreferences = this.savePreferences.bind(this);
        this.alignLeft = this.alignLeft.bind(this);
        this.alignTop = this.alignTop.bind(this);
        this.alignRight = this.alignRight.bind(this);
        this.alignBottom = this.alignBottom.bind(this);
        this.deleteReportObjects = this.deleteReportObjects.bind(this);
        this.onSave = this.onSave.bind(this);
        this.saveReport = this.saveReport.bind(this);
        this.initializeNewReport = this.initializeNewReport.bind(this);

        this.alignTextLeft = this.alignTextLeft.bind(this);
        this.alignTextMiddle = this.alignTextMiddle.bind(this);
        this.alignTextRight = this.alignTextRight.bind(this);

        
        this.state = {
            canSave: false,
            canAddObject: false
        };
    }
    
    render() {
        const {canSave, canAddObject} = this.state;
        const menu =  [
            {
                text: config.textmsg.filemenuname,
                items: [
                {
                    text: config.textmsg.newmenuname,
                    callback: this.newDocument
                },
                {
                    text: config.textmsg.preferencesmenuname,
                    callback: this.preferences
                }
                ]
            }
        ];
        const orm = JSON.parse(localStorage.getItem('orm'));
        return <div>
            <Toolbar menu={menu} brand={orm.name} logo="logo.png"></Toolbar>
            <div className="buttonbar">
                <button className="button" title='add new report' onClick={this.newReport}>
                    <img alt='new report' src='/images/newreport.png'/>
                    <span className="label">New Report</span>
                </button>
                <button className="button" disable={!canAddObject} title='add new report object' onClick={this.newReportObject}>
                    {canAddObject && <img alt='new report object' src='/images/newobject.png'/>}
                    {!canAddObject && <img alt='new report object' src='/images/newobject-disabled.png'/>}
                    <span className="label">Add Object</span>
                </button>
                <div className="aligntool">
                    <button className="button" title='align text left' disabled={!canSave} onClick={this.textAlignLeft}>
                        {canSave && <img alt='align text left' src='/images/align-text-left.png'/>} 
                        {!canSave && <img alt='align text left' src='/images/align-text-left-disabled.png'/>}
                    </button>
                    <button className="button" title='align text middle' disabled={!canSave} onClick={this.textAlignMiddle}>
                        {canSave && <img alt='align text middle' src='/images/align-text-middle.png'/>} 
                        {!canSave && <img alt='align text middle' src='/images/align-text-middle-disabled.png'/>}
                    </button>
                    <button className="button" title='align text right' disabled={!canSave} onClick={this.textAlignRight}>
                        {canSave && <img alt='align text right' src='/images/align-text-right.png'/>} 
                        {!canSave && <img alt='align text right' src='/images/align-text-right-disabled.png'/>}
                    </button>
                </div>
                <div className="aligntool">
                    <button className="button" title='align selected objects left' disabled={!canSave} onClick={this.alignLeft}>
                        {canSave && <img alt='align left' src='/images/align-left.png'/>} 
                        {!canSave && <img alt='align left' src='/images/align-left-disabled.png'/>}
                    </button>
                    <button className="button" title='align selected objects top' disabled={!canSave} onClick={this.alignTop}>
                        {canSave && <img alt='align top' src='/images/align-top.png'/>} 
                        {!canSave && <img alt='align top' src='/images/align-top-disabled.png'/>}
                    </button>
                    <button className="button" title='align selected objects right' disabled={!canSave} onClick={this.alignRight}>
                        {canSave && <img alt='align right' src='/images/align-right.png'/>} 
                        {!canSave && <img alt='align right' src='/images/align-right-disabled.png'/>}
                    </button>
                    <button className="button" title='align selected objects bottom' disabled={!canSave} onClick={this.alignBottom}>
                        {canSave && <img alt='align bottom' src='/images/align-bottom.png'/>} 
                        {!canSave && <img alt='align bottom' src='/images/align-bottom-disabled.png'/>}
                    </button>
                </div>
                <button className="button" title='delete selected report object report' disabled={!canSave} onClick={this.deleteReportObjects}>
                    {canSave && <img alt='delete report objects' src='/images/delete.png'/>} 
                    {!canSave && <img alt='delete report objects' src='/images/delete-disabled.png'/>}
                    <span className="label">Delete Objects</span>
                </button>
                <button className="button" title='save report' disabled={!canSave} onClick={this.onSave}>
                    {canSave && <img alt='save report' src='/images/save.png'/>} 
                    {!canSave && <img alt='save report' src='/images/save-disabled.png'/>}
                    <span className="label">Save Report</span>
                </button>
            </div>
        </div>;
    }

    newReport() {
        let rc = {left: 200, top: 75, width: 400, height: 425};
        let mc = getModalContainer(rc);
        ReactDOM.render(<PreferencesPanel newDocument={true} onOk={this.initializeNewReport}/>, mc);
    }

    newReportObject() {
        alert('add new report object');
    }
    
    alignLeft() {
    }
    
    alignTop() {
    }

    alignRight() {
    }

    alignBottom() {
    }
    

    alignTextLeft() {
    }

    alignTextMiddle() {
    }
    
    alignTextRight() {
    }
    
    
    deleteReportObjects() {
    }

    initializeNewReport(settings) {
        clearDocumentDesignData();
        
        for (let i = 0; i < config.defaultPreferenceNames.length; ++i) {
            document.designData.currentReport[config.defaultPreferenceNames[i]] = settings[config.defaultPreferenceNames[i]];
        }
        
        let dim = getDocumentDimensions(settings.documentSize);
        let ppi = getPixelsPerInch();
        document.designData.currentReport.documentWidth = dim[0] * ppi;
        document.designData.currentReport.documentHeight = dim[1] * ppi;
        if (dim[0] < 2) {
            document.designData.currentReport.headerHeight = ppi/4;
        } else if (dim[0] < 5) {
            document.designData.currentReport.headerHeight = ppi/2;
        } else {
            document.designData.currentReport.headerHeight = ppi;
        }
        
        if (dim[1] < 2) {
            document.designData.currentReport.footerHeight = ppi/4;
        } else if (dim[1] < 5) {
            document.designData.currentReport.footerHeight = ppi/2;
        } else {
            document.designData.currentReport.footerHeight = ppi;
        }
        
        document.designData.currentReport.margins = [ppi * settings.marginLeft, ppi * settings.marginTop, ppi * settings.marginRight, ppi * settings.marginBottom];
        this.setState({canSave: true, canAddObject: true});
        this.props.refreshLayout();
    }
    
    
    onSave() {
        let rc = {left: 200, top: 50, width: 450, height: 425};
        let mc = getModalContainer(rc);
        ReactDOM.render(<SaveReportPanel onOk={this.saveReport}/>, mc);
    }
    
    saveReport(params) {
        this.showWaitMessage('Saving report...');
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString }
        };
        axios.post(orm.url + '/report/save', this.getReportDocument(params), config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.props.setStatus('report saved', false);
                    curcomp.clearWaitMessage();
                    curcomp.props.reloadDocuments();
                } else {
                    curcomp.clearWaitMessage();
                    curcomp.props.setStatus(response.statusText, true);
                }
                
            })
            .catch((err) => {
                curcomp.props.setStatus('' + err, true);
                curcomp.clearWaitMessage();
            });     
    }

    preferences() {
        let rc = {left: 200, top: 75, width: 400, height: 375};
        let mc = getModalContainer(rc);
        ReactDOM.render(<PreferencesPanel onOk={this.savePreferences}/>, mc);
    }
    
    savePreferences(results) {
        localStorage.setItem('preferences', JSON.stringify(results));
    }
}

export {AppToolbar};
