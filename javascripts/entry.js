require( '../less/main.less' );

// const PDFDocument = require( 'pdfkit' );
// var React    = require('react');
// var ReactDOM = require('react-dom');

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

        // /Users/ericg/Desktop/reactd3v4.pdf
        // ../media/black_square_transparent_edge.pdf

        this.state = {
          file:     '/Users/ericg/Desktop/reactd3v4.pdf',
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

        myWindow.webContents.loadURL( this.state.pdfData );
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
