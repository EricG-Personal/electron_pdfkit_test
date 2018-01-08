require( '../less/main.less' );

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { ipcRenderer, remote } from 'electron';

// import PDFDocument from 'pdfkit';
// const blobStream  = require( 'blob-stream');

import jsPDF from 'jsPDF';

import * as fs from 'fs';


class PDFTest extends Component 
{
    constructor( props ) 
    {
        super( props );

        debugger;

        this.state = {
          file:     'file:///Users/ericg/Desktop/reactd3v4.pdf',
          numPages: null,
          pdfData:  null
        }

        var doc = new jsPDF({unit: 'pt', format: 'legal'});
        var someText = "hello, world!";
        var topCoordinate = 72;
        var leftCoordinate = 72;
        var padding = 8;

        doc.setFont( "helvetica" );
        doc.setFontSize( 24 );

        var lineHeight 		= doc.getLineHeight();
        var textWidth  		= doc.getTextWidth( someText );
        var rectHeight 		= ( lineHeight + ( padding * 2 ) );
        var halfRectHeight 	= rectHeight / 2;
        var halfLineHeight	= lineHeight / 2;
        var textYCoordinate = topCoordinate + halfRectHeight + halfLineHeight;

        doc.setDrawColor( 255, 0, 0 );
        doc.rect( leftCoordinate, topCoordinate, textWidth, rectHeight );
        doc.text( someText, leftCoordinate + padding, textYCoordinate );

        doc.setDrawColor( 0, 0, 0 );
        doc.rect( leftCoordinate, textYCoordinate - lineHeight, textWidth, lineHeight );

        var blob   = doc.output( 'bloburl' );
        var mythis = this;

        setTimeout( function()
        {
            console.log( "Setting State" );

            mythis.setState({pdfData: blob});
        }, 5000);


        // var doc = new PDFDocument( { size: 'legal' } );

        // this.stream = doc.pipe( blobStream() );

        // doc.fontSize( 9 );
        // doc.font( 'Times-Roman' );
        // doc.text( "hello, world! I'm really here" );
        // doc.rect( 10, 10, 100, 100 ).stroke();
        // doc.end();

        // this.stream.on( 'finish', function()
        // {
        //     console.log( "Stream Finished" );

        //     this.setState( { pdfData: this.stream.toBlobURL( 'application/pdf' ) } );
        // }.bind( this ) );

    }

    componentDidUpdate()
    {
        console.log( "componentDidUpdate" );

        var myWindow = remote.getCurrentWindow();

        // myWindow.webContents.loadURL( this.state.pdfData );
        myWindow.webContents.loadURL( this.state.file );

    }




    render() 
    {
        return (
            <div>                
            </div>
        );

    }
}

ReactDOM.render(<PDFTest />, document.getElementById('content'));
