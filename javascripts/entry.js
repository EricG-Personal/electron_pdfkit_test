require( '../less/main.less' );

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { ipcRenderer, remote } from 'electron';

import PDFDocument from 'pdfkit';

const blobStream  = require( 'blob-stream');

import * as fs from 'fs';


class PDFTest extends Component 
{
    constructor( props ) 
    {
        super( props );
        
        this.state = {
          file:     '',
          numPages: null,
          pdfData:  null
        }

        var doc = new PDFDocument( { size: 'legal' } );

        this.stream = doc.pipe( blobStream() );

        doc.fontSize( 9 );
        doc.font( 'Times-Roman' );
        doc.text( "hello, world! I'm really here" );
        doc.rect( 10, 10, 100, 100 ).stroke();
        doc.end();

        this.stream.on( 'finish', function()
        {
            console.log( "Stream Finished" );

            this.setState( { pdfData: this.stream.toBlobURL( 'application/pdf' ) } );
        }.bind( this ) );

    }

    componentDidUpdate()
    {
        console.log( "componentDidUpdate" );

        var myWindow = remote.getCurrentWindow();

        myWindow.webContents.loadURL( pdfData );
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
