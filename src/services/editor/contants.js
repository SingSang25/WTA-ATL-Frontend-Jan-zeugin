import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import CodeTool from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Image from '@editorjs/image';
import Raw from '@editorjs/raw';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';
import NestedList from '@editorjs/nested-list';
import { readonly } from 'vue';
// import AttachesTool from '@editorjs/attaches';
// const AnyButton = require('editorjs-button');

export const EDITOR_JS_TOOLS = {
    holder: 'editorjs',
    data: {},
    tools: {
        embed: Embed,
        table: Table,
        marker: Marker,
        list: NestedList,
        warning: Warning,
        code: CodeTool,
        linkTool: LinkTool,
        image: Image,
        raw: Raw,
        header: {
            class: Header,
            config: {
                placeholder: 'Enter a header',
                levels: [1, 2, 3, 4, 5, 6],
                defaultLevel: 3,
            },
        },
        // AnyButton: {
        //     class: AnyButton,
        //     inlineToolbar: false,
        //     config: {
        //         css: {
        //             btnColor: 'btn--gray',
        //         },
        //     },
        // },
        // attaches: {
        //     class: AttachesTool,
        //     config: {
        //         //   endpoint: 'http://localhost:8008/uploadFile'
        //     },
        // },
        quote: Quote,
        checklist: CheckList,
        delimiter: Delimiter,
        inlineCode: InlineCode,
        simpleImage: SimpleImage,
    }
};
