import React from 'react';
import '../app/App.css';
import SplitPane from 'react-split-pane';
import {BaseDesignComponent} from './BaseDesignComponent';
import {HeaderPanel} from './HeaderPanel';
import {BodyPanel} from './BodyPanel';
import {FooterPanel} from './FooterPanel';
import {VerticalRule} from './VerticalRule';
import {HorizontalRule} from './HorizontalRule';

class DesignPanel extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.horizontalPositionChange = this.horizontalPositionChange.bind(this);
        this.verticalPositionChange = this.verticalPositionChange.bind(this);
        this.onHeaderSize = this.onHeaderSize.bind(this);
        this.onFooterSize = this.onFooterSize.bind(this);
        this.getSectionRect = this.getSectionRect.bind(this);
        this.header = '';
        this.body = '';
        this.footer = '';
        this.dw = '';
        
        this.state = {
            left: 0,
            top: 0,
            height: document.designData.currentReport.documentHeight,
            width: document.designData.currentReport.documentWidth,
            margins: document.designData.currentReport.margins
        };
        
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({left: nextProps.left, top: nextProps.top, margins: nextProps.margins});
    }

    render() {
        const {left, top, margins, height, width} = this.state;

        const designStyle = {
            left: left,
            top: top,
            height: (height + 'px'),
            width: (width + 'px')
        };
        
        return  <div className="designContainer"> 
            <HorizontalRule left={left} width={width} horizontalPositionChange={this.horizontalPositionChange}/>
            <div className="designPanel">
                <div ref={(dw) => {this.dw = dw}} className="documentWrapper" style={designStyle}>
                    <SplitPane 
                        split="horizontal" 
                        minSize={0} 
                        onDragFinished={this.onFooterSize}
                        defaultSize={height - document.designData.currentReport.footerHeight}>
                        <SplitPane 
                            split="horizontal" 
                            minSize={0} 
                            onDragFinished={this.onHeaderSize}
                            defaultSize={document.designData.currentReport.headerHeight}>
                            <HeaderPanel 
                                ref={(hp) => {this.header = hp}} 
                                margins={margins} 
                                width={width}
                                height={document.designData.currentReport.headerHeight}
                                setStatus={this.props.setStatus}/>
                            <BodyPanel 
                                ref={(bp) => {this.body = bp}} 
                                margins={margins} 
                                width={width}
                                height={height - (document.designData.currentReport.headerHeight + document.designData.currentReport.footerHeight)}
                                setStatus={this.props.setStatus}/>
                        </SplitPane> 
                        <FooterPanel 
                            ref={(fp) => {this.footer = fp}} 
                            margins={margins} 
                            width={width}
                            height={document.designData.currentReport.footerHeight}
                            setStatus={this.props.setStatus}/>
                    </SplitPane>
                </div>
            </div>
            <VerticalRule top={top} height={height} verticalPositionChange={this.verticalPositionChange} />
        </div>
    }
    
    onHeaderSize(sz) {
        if (sz && this.header) {
            const {height} = this.state;
            document.designData.currentReport.headerHeight = sz;
            this.header.setState({height: sz});
            this.body.setState({height: height - (document.designData.currentReport.headerHeight + document.designData.currentReport.footerHeight)});
        }
    }
    
    onFooterSize(sz) {
        if (sz) {
            const {height} = this.state;
            document.designData.currentReport.footerHeight = (height - sz);
            this.body.setState({height: height - (document.designData.currentReport.headerHeight + document.designData.currentReport.footerHeight)});
            this.footer.setState({height: document.designData.currentReport.footerHeight});
        }
    }

    horizontalPositionChange(value) {
        if (this.dw) {
            const {height} = this.state;
            this.setState({left: (-value) + 'px', top: this.dw.style.top});
            this.header.setState({height: height});
            this.body.setState({height: height - (document.designData.currentReport.headerHeight + document.designData.currentReport.footerHeight)});
            this.footer.setState({height: document.designData.currentReport.footerHeight});
        }
    }
  
    verticalPositionChange(value) {
        if (this.dw) {
            const {height} = this.state;
            this.setState({left: this.dw.style.left, top: (-value) + 'px'});
            this.header.setState({height: document.designData.currentReport.headerHeight});
            this.body.setState({height: height - (document.designData.currentReport.headerHeight + document.designData.currentReport.footerHeight)});
            this.footer.setState({height: document.designData.currentReport.footerHeight});
        }
    }
    
    refreshLayout() {
        let layout = {
            left: 0,
            top: 0, 
            height: document.designData.currentReport.documentHeight,
            width: document.designData.currentReport.documentWidth,
            margins: document.designData.currentReport.margins
        };
        
        this.setState(layout);
        this.props.setCurrentReport(document.designData.currentReport);

    }

    getSectionRect(section) {
        let retval = {};
        const {margins, width} = this.state;
        switch(section) {
            case 'header':
                retval.top = margins[1];
                retval.left = margins[0];
                retval.width = width-(margins[0] + margins[2]);
                retval.height = document.designData.currentReport.headerHeight - margins[1];
                break;
            case 'body':
                retval.top = 0;
                retval.left = margins[0];
                retval.width = width-(margins[0] + margins[2]);
                retval.height = document.designData.currentReport.headerHeight;
                break;
            case 'footer':
                retval.top = 0;
                retval.left = margins[0];
                retval.width = width-(margins[0] + margins[2]);
                retval.height = document.designData.currentReport.headerHeight - margins[3];
                break;
        }

        return retval;
    }
}

export {DesignPanel};

