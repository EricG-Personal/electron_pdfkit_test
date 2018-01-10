require( '../less/main.less' );

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { ipcRenderer, remote } from 'electron';

// import PDFDocument from 'pdfkit';
// const blobStream  = require( 'blob-stream');

import jsPDF from 'jsPDF';

import * as fs from 'fs';

import pdfjsLib from 'pdfjs-dist/webpack.js';
import { PDFJS as PDFJSViewer } from 'pdfjs-dist/web/pdf_viewer.js';



class PDFTest extends Component 
{
    constructor( props ) 
    {
        super( props );

        debugger;

        // 'file:///Users/ericg/Desktop/reactd3v4.pdf',
        this.state = {
          file:     '/Users/ericg/Desktop/reactd3v4.pdf',
          numPages: null,
          pdfData:  null
        }

        //
        // USE jsPDF
        //
        this.doc = new jsPDF({unit: 'pt', format: 'legal'});

        var someText = "hello, wo212rld!";
        var topCoordinate = 72;
        var leftCoordinate = 72;
        var padding = 8;

        this.doc.setFont( "helvetica" );
        this.doc.setFontSize( 24 );

        var lineHeight 		= this.doc.getLineHeight();
        var textWidth  		= this.doc.getTextWidth( someText );
        var rectHeight 		= ( lineHeight + ( padding * 2 ) );
        var halfRectHeight 	= rectHeight / 2;
        var halfLineHeight	= lineHeight / 2;
        var textYCoordinate = topCoordinate + halfRectHeight + halfLineHeight;

        this.doc.setDrawColor( 255, 0, 0 );
        this.doc.rect( leftCoordinate, topCoordinate, textWidth, rectHeight );
        this.doc.text( someText, leftCoordinate + padding, textYCoordinate );

        this.doc.setDrawColor( 0, 0, 0 );
        this.doc.rect( leftCoordinate, textYCoordinate - lineHeight, textWidth, lineHeight );

        //
        // USE pdfkit
        //
        // var doc = new PDFDocument( { size: 'legal' } );
        //
        // this.stream = doc.pipe( blobStream() );
        //
        // doc.fontSize( 9 );
        // doc.font( 'Times-Roman' );
        // doc.text( "hello, world! I'm really here" );
        // doc.rect( 10, 10, 100, 100 ).stroke();
        // doc.end();
        //
        // this.stream.on( 'finish', function()
        // {
        //     console.log( "Stream Finished" );
        //
        //     this.setState( { pdfData: this.stream.toBlobURL( 'application/pdf' ) } );
        // }.bind( this ) );
    }



    componentDidMount()
    {
        console.log( "componentDidMount" );

        //
        // USE a blob url
        //
        // this.bloburl = this.doc.output( 'bloburl' );
        // console.log( this.bloburl );
        // this.setState({pdfData: this.bloburl});

        //
        // USE an array buffer
        //
        this.bloburl = this.doc.output( 'arraybuffer' );
        console.log( this.bloburl );
        this.setState({pdfData: this.bloburl});
    }



    componentDidUpdate()
    {
        console.log( "componentDidUpdate" );

        var container = document.getElementById( 'viewerContainer' );

        // this.pdfLinkService = new PDFJS.PDFLinkService();

        this.pdfViewer = new PDFJS.PDFViewer({
            container:   container,
            // linkService: this.pdfLinkService,
        });

        // pdfLinkService.setViewer(pdfViewer);

        // PDFJS.getDocument( this.state.file ).then( function ( pdfDocument ) 
        PDFJS.getDocument( this.state.pdfData ).then( function ( pdfDocument ) 
        {
            // Document loaded, specifying document for the viewer and
            // the (optional) linkService.
            this.pdfViewer.setDocument( pdfDocument );          
            // pdfLinkService.setDocument( pdfDocument, null );
        }.bind( this ) );
    }



    handlePrint()
    {
        console.log( "handle print" );
    }



    render() 
    {
        return (
            <div>

                <button onClick={this.handlePrint.bind(this)}>Print</button>
                <br/>

                The PDF viewer should appear below...

                <div id="viewerContainer">
                    <div id="viewer" className="pdfViewer"></div>
                </div>

            </div>
        );
    }
}

ReactDOM.render(<PDFTest />, document.getElementById('content'));
