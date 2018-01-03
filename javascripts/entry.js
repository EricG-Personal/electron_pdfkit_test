require( '../less/main.less' );

// const PDFDocument = require( 'pdfkit' );
// var React    = require('react');
// var ReactDOM = require('react-dom');

import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import PDFDocument from 'pdfkit';
import { Document, Page, setOptions } from 'react-pdf';

import * as fs from 'fs';


class PDFTest extends Component 
{
    constructor( props ) 
    {
        super( props );

        this.state = {
          file:     '../media/black_square_transparent_edge.pdf',
          numPages: null,
      }

        var image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAIklEQVR4nGL4z4AfEpAmXgE2uVEF5CjADSlXAAAAAP//AwAlXf8BrF6/6QAAAABJRU5ErkJggg==";
        var doc   = new PDFDocument( { size: 'legal' } );

        console.log( process.env.HOME );

        doc.pipe( fs.createWriteStream( process.env.HOME + "/test.pdf" ) );
        doc.fontSize( 9 );
        doc.font( 'Times-Roman' );
        doc.text( "hello, world! I'm really here" );
        doc.rect( 10, 10, 100, 100 ).stroke();
        doc.image( image, 50, 50 );
        doc.end();

        console.log( doc );
    }



    onDocumentLoadSuccess( numPages )
    {
        console.log( "START onDocumentLoadSuccess" );
        console.log( numPages );
        console.log( "END onDocumentLoadSuccess" );

        this.setState({ numPages: numPages });
    }



    onLoadError( error )
    {
        console.log( "onLoadError" )
        console.log( error );
    }



    onSourceError( error )
    {
        console.log( "onSourceError" )
        console.log( error );
    }



    render() 
    {
      const { file, numPages } = this.state;

        return (
            <div>                                        
              hello, world!
            </div>
        );

    }
}

              // <Document file          = {file}
              //           onLoadSuccess = {this.onDocumentLoadSuccess.bind( this )}
              //           onLoadError   = {this.onLoadError.bind( this )}
              //           onSourceError = {this.onSourceError.bind( this )}>

              //     {
              //         Array.from(
              //         new Array(numPages),
              //         (el, index) => (
              //             <Page key        = {`page_${index + 1}`}
              //                   pageNumber = {index + 1} />
              //         ),
              //         )
              //     }
              // </Document>

ReactDOM.render(<PDFTest />, document.getElementById('content'));
