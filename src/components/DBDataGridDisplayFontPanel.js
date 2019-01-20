import React from 'react';
import {BaseDesignComponent} from './BaseDesignComponent';
import {FontSelectPanel} from './FontSelectPanel';
import config from '../config/appconfig.json';
import "../app/App.css";

class DBDataGridDisplayFontPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.reportObject = this.props.reportObject;

        if (!this.reportObject.headerFontSettings) {
            this.reportObject.headerFontSettings = {
                font: 'Arial',
                fontSize: 12,
                fontColor: 'black',
                backgroundColor: 'white',
                fontWeight: 900
            };
        }

        if (!this.reportObject.dataFontSettings) {
            this.reportObject.dataFontSettings = {
                font: 'Arial',
                fontSize: 12,
                fontColor: 'black',
                backgroundColor: 'white',
                fontWeight: 100
            };
        }

        this.getDataFontSettings = this.getDataFontSettings.bind(this);
        this.getHeaderFontSettings = this.getHeaderFontSettings.bind(this);
        this.setDataFontSettings = this.setDataFontSettings.bind(this);
        this.setHeaderFontSettings = this.setHeaderFontSettings.bind(this);
    }


    render() {
        return <div className="tabContainer">
            <FontSelectPanel
                label={config.textmsg.headerfontlabel}
                getFontSettings={this.getHeaderFontSettings}
                setFontSettings={this.setHeaderFontSettings}/>
            <FontSelectPanel
                label={config.textmsg.datafontlabel}
                getFontSettings={this.getDataFontSettings}
                setFontSettings={this.setDataFontSettings}/></div>
    }

    getHeaderFontSettings() {
        return this.reportObject.headerFontSettings;
    }

    setHeaderFontSettings(name, value) {
        this.reportObject.headerFontSettings[name] = value;
    }

    getDataFontSettings() {
        return this.reportObject.dataFontSettings;
    }

    setDataFontSettings(name, value) {
        this.reportObject.dataFontSettings[name] = value;
    }
}

export {DBDataGridDisplayFontPanel};